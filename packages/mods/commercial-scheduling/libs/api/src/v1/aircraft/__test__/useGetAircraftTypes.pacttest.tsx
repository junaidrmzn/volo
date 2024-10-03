import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { renderHook } from "@voloiq/testing";
import { CONSUMER_VOLOIQ_UI, PROVIDER_VERTIPORT_MANAGEMENT_API } from "../../../pactConstants";
import { pactify } from "../../../pactify";
import { AIRCRAFT_TYPE_BASE_URL } from "../../../serviceEndpoints";
import { anyAircraftType } from "../anyAircraftType";
import { useGetAircraftTypes } from "../useGetAircraftTypes";

const { eachLike, like } = Matchers;

pactWith.skip({ consumer: CONSUMER_VOLOIQ_UI, provider: PROVIDER_VERTIPORT_MANAGEMENT_API }, (provider) => {
    test("will fetch a list of commercial plans", async () => {
        await provider.addInteraction({
            state: "a list of commercial plans",
            uponReceiving: "request to fetch a list of commercial plans",
            withRequest: {
                path: AIRCRAFT_TYPE_BASE_URL,
                method: "GET",
                query: { size: "100", page: "1", vt912: "true" },
            },
            willRespondWith: {
                status: 200,
                body: {
                    data: eachLike(pactify(anyAircraftType)()),
                    error: null,
                    pagination: { page: like(1), size: like(100), totalPages: like(1), totalElements: like(1) },
                    meta: null,
                },
            },
        });

        const { waitForNextUpdate } = renderHook(useGetAircraftTypes, {
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
        });

        await waitForNextUpdate();
    });
});
