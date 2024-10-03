import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { renderHook } from "@voloiq/testing";
import { vertiportManagementBaseUrl } from "../../vertiportManagementBaseUrl";
import { anyAvailablePad } from "./anyAvailablePad";
import { useGetAllAvailablePads } from "./useGetAllAvailablePads";

const { like } = Matchers;

const allAvailablePadsRequest = (vertiportId: string, startDate: string, endDate: string): RequestOptions => ({
    path: `${vertiportManagementBaseUrl}/vertiport/${vertiportId}/pads/availability`,
    method: "GET",
    query: {
        startDate,
        endDate,
    },
});

const allAvailablePadsResponse = (): ResponseOptions => ({
    status: 200,
    headers: {
        "Content-Type": "application/json",
    },
    body: like({
        data: [anyAvailablePad()],
    }),
});

pactWith({ consumer: "voloiq.mission-management.ui", provider: "voloiq.vertiport-management.api" }, (provider) => {
    test("fetches all available pads", async () => {
        const vertiportId = "913bbd82-373e-4574-9ada-56b04872d54a";
        const startDate = "2024-04-17T09:00:00.000Z";
        const endDate = "2024-04-17T11:00:00.000Z";

        await provider.addInteraction({
            state: `there are available pads for a vertiport with id ${vertiportId}`,
            uponReceiving: "a request for all available pads",
            withRequest: allAvailablePadsRequest(vertiportId, startDate, endDate),
            willRespondWith: allAvailablePadsResponse(),
        });

        const { waitForNextUpdate } = renderHook(
            () =>
                useGetAllAvailablePads({
                    vertiportId,
                    params: { startDate, endDate },
                }),
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

        await waitForNextUpdate();
    });
});
