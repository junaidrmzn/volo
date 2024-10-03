import { Matchers } from "@pact-foundation/pact";
import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { renderHook } from "@voloiq/testing";
import { CREW_MANAGEMENT } from "../../../../../src/api-hooks/serviceEndpoints";
import { anyFlightTimeLimitation } from "./anyFlightTimeLimitation";
import { useGetAllCrewFlightTimeLimitation } from "./useGetAllCrewFlightTimeLimitation";

const { like } = Matchers;

const fetchFtlRequest = (pilotId: string, estimatedDepartureDate: string): RequestOptions => ({
    path: `${CREW_MANAGEMENT}/crew-management/${pilotId}/ftl/${estimatedDepartureDate}`,
    method: "GET",
});

const fetchFtlResponse = (): ResponseOptions => ({
    status: 200,
    body: like({
        data: anyFlightTimeLimitation(),
    }),
});

pactWith({ consumer: "voloiq.mission-management.ui", provider: "voloiq.crew-management.api" }, (provider) => {
    test("will get flight time limitations of a pilot", async () => {
        const pilotId = "3679f481-1517-4df6-a8e9-debe126fb5a0";
        const estimatedDepartureDate = "2023-09-14T11:44:16.755Z";
        await provider.addInteraction({
            state: `there is a mission with a pilot assigned with id ${pilotId}`,
            uponReceiving: `a request to fetch flight time limitiations of a pilot with id ${pilotId}`,
            withRequest: fetchFtlRequest(pilotId, estimatedDepartureDate),
            willRespondWith: fetchFtlResponse(),
        });

        const { result, waitFor } = renderHook(
            () => useGetAllCrewFlightTimeLimitation(pilotId, estimatedDepartureDate),
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
            expect(result.current.data).toEqual(anyFlightTimeLimitation());
        });
    });
});
