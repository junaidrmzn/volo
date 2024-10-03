import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { networkSchedulingManagementBaseUrl } from "../../networkSchedulingManagementBaseUrl";
import { useUpdateWeather } from "./useUpdateWeather";

const updateWeatherRequest = (missionId: string): RequestOptions => ({
    path: `${networkSchedulingManagementBaseUrl}/missions/${missionId}/update-weather`,
    method: "POST",
});

const updateWeatherResponse: ResponseOptions = {
    status: 202,
    body: {},
};

pactWith({ consumer: "voloiq.mission-management.ui", provider: "voloiq.network-scheduling.api" }, (provider) => {
    test("refetch weather forecast for a mission", async () => {
        const missionId = "2679f481-1517-4df6-a8e9-debe126fb5a0";

        await provider.addInteraction({
            state: `mission with id ${missionId} exists`,
            uponReceiving: "request to refetch weather forecast for a mission",
            withRequest: updateWeatherRequest(missionId),
            willRespondWith: updateWeatherResponse,
        });

        const { result } = renderHook(() => useUpdateWeather({ missionId }), {
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

        await act(async () => {
            await result.current.sendRequest();
        });

        expect(result.current.statusCode).toBe(202);
    });
});
