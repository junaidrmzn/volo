import { pactWith } from "jest-pact";
import { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { networkSchedulingManagementBaseUrl } from "../../networkSchedulingManagementBaseUrl";
import { useUnassignAircraft } from "./useUnassignAircraft";

pactWith({ consumer: "voloiq-mission-management-ui", provider: "voloiq-network-scheduling-mgmt-api" }, (provider) => {
    test("unassign aircraft from a mission", async () => {
        const missionId = "913bbd82-373e-4574-9ada-56b04872d54a";
        const aircraftId = "913bbd82-373e-4574-9ada-56b04872d54a";
        await provider.addInteraction({
            state: `there is a mission with id ${missionId} that has an aircraft assignment of aircraft with id ${aircraftId}`,
            uponReceiving: "a request to unassign an aircraft for a mission",
            withRequest: {
                path: `${networkSchedulingManagementBaseUrl}/missions/assignments/${missionId}/aircraft/unassign`,
                method: "PUT",
            },
            willRespondWith: {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                },
            },
        });

        const { result, waitForNextUpdate } = renderHook(() => useUnassignAircraft({ missionId }), {
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

        act(() => {
            result.current.sendRequest();
        });

        await waitForNextUpdate();
    });
});
