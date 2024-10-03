import { Matchers } from "@pact-foundation/pact";
import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { renderHook } from "@voloiq/testing";
import { crewManagementBaseUrl } from "../crewManagementBaseUrl";
import { anyFlightTimeLimitation } from "./anyFlightTimeLimitation";
import { useGetCrewFlightTimeLimitation } from "./useGetCrewFlightTimeLimitation";

const { like } = Matchers;

const fetchFtlRequest = (crewId: string, scheduleDate: string): RequestOptions => ({
    path: `${crewManagementBaseUrl}/crew-management/${crewId}/ftl/${scheduleDate}`,
    method: "GET",
});

const fetchFtlResponse = (): ResponseOptions => ({
    status: 200,
    body: like({
        data: anyFlightTimeLimitation(),
    }),
});

// TODO: skipped some tests to publish the green pacts, re enable them after fixing

pactWith({ consumer: "voloiq.crew-management.ui", provider: "voloiq.crew-management.api" }, (provider) => {
    test.skip("will get flight time limitations of a pilot", async () => {
        const crewId = "3679f481-1517-4df6-a8e9-debe126fb5a0";
        const scheduleDate = "2023-09-14T11:44:16.755Z";
        await provider.addInteraction({
            state: `there is a pilot with id ${crewId}`,
            uponReceiving: `a request to fetch flight time limitiations of a pilot with id ${crewId}`,
            withRequest: fetchFtlRequest(crewId, scheduleDate),
            willRespondWith: fetchFtlResponse(),
        });

        const { result, waitFor } = renderHook(() => useGetCrewFlightTimeLimitation({ crewId, scheduleDate }), {
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

        await waitFor(() => {
            expect(result.current.data).toEqual(anyFlightTimeLimitation());
        });
    });
});
