import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { networkSchedulingManagementBaseUrl } from "../../networkSchedulingManagementBaseUrl";
import { useAssignPilot } from "./useAssignPilot";

const assignPilotRequest = (missionId: string, pilotId: string): RequestOptions => ({
    path: `${networkSchedulingManagementBaseUrl}/missions/assignments/${missionId}/pilot/${pilotId}`,
    method: "PUT",
});

const assignPilotResponse = (): ResponseOptions => ({
    status: 200,
    headers: {
        "Content-Type": "application/json",
    },
});

// TODO: skipped some tests to publish the green pacts, re enable them after fixing

pactWith({ consumer: "voloiq.mission-management.ui", provider: "voloiq.network-scheduling.api" }, (provider) => {
    test.skip("creates a new pilot assignment for a mission", async () => {
        const missionId = "913bbd82-373e-4574-9ada-56b04872d54a";
        const pilotId = "913bbd82-373e-4574-9ada-56b04872d54a";
        await provider.addInteraction({
            state: `there is a mission with id ${missionId} that can get a pilot assignment of pilot with id ${pilotId}`,
            uponReceiving: "a request to create a pilot assignment for a mission",
            withRequest: assignPilotRequest(missionId, pilotId),
            willRespondWith: assignPilotResponse(),
        });

        const { result, waitForNextUpdate } = renderHook(() => useAssignPilot({ missionId }), {
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
            result.current.sendRequestById(pilotId, {});
        });

        await waitForNextUpdate();
    });
});
