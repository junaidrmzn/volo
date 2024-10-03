import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { renderHook } from "@voloiq/testing";
import { vertiportManagementBaseUrl } from "../vertiportManagementBaseUrl";
import { anyPactEquipment } from "./anyPactEquipment";
import { useGetAllEquipments } from "./useGetAllEquipments";

const { eachLike } = Matchers;

const getAllEquipmentRequest = (vertiportId: string): RequestOptions => ({
    path: `${vertiportManagementBaseUrl}/vertiports/${vertiportId}/inventory`,
    query: "orderBy=validTo%3Adesc",
    method: "GET",
});

const getAllEquipmentResponse: ResponseOptions = {
    status: 200,
    headers: {
        "Content-Type": "application/json",
    },
    body: {
        data: eachLike(anyPactEquipment()),
    },
};

pactWith({ consumer: "voloiq.vertiport-management.ui", provider: "voloiq.vertiport-management.api" }, (provider) => {
    test.skip("fetch all equipments", async () => {
        const vertiportId = "ce118b6e-d8e1-11e7-9296-cec278b6b50a";
        await provider.addInteraction({
            state: `a vertiport with id ${vertiportId} exists`,
            uponReceiving: "request to fetch all equipments",
            withRequest: getAllEquipmentRequest(vertiportId),
            willRespondWith: getAllEquipmentResponse,
        });

        const { result, waitFor } = renderHook(
            () => useGetAllEquipments({ vertiportId, params: { orderBy: "validTo:desc" } }),
            {
                wrapper: (props: PropsWithChildren<{}>) => {
                    const { children } = props;
                    return (
                        <I18nProvider>
                            <LocalAuthenticationProvider>
                                <ServiceProvider baseUrl={provider.mockService.baseUrl}>{children}</ServiceProvider>
                            </LocalAuthenticationProvider>
                        </I18nProvider>
                    );
                },
            }
        );
        await waitFor(() => {
            expect(result.current.data.length).toBeGreaterThan(0);
        });
    });
});
