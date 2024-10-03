import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { networkSchedulingManagementBaseUrl } from "../../networkSchedulingManagementBaseUrl";
import { anyMission } from "../anyMission";
import { useCancelMission } from "./useCancelMission";

const cancelMissionRequest = (missionId: string): RequestOptions => ({
    path: `${networkSchedulingManagementBaseUrl}/missions/${missionId}/cancel`,
    method: "PATCH",
});

const cancleMissionResponse: ResponseOptions = {
    status: 200,
    headers: {
        "Content-Type": "application/json",
    },
    body: {
        data: Matchers.like(anyMission()),
    },
};

pactWith({ consumer: "voloiq.mission-management.ui", provider: "voloiq.network-scheduling.api" }, (provider) => {
    test("cancel mission with cancellation code and reason", async () => {
        const missionId = "2679f481-1517-4df6-a8e9-debe126fb5a0";

        await provider.addInteraction({
            state: `mission with id ${missionId} exists`,
            uponReceiving: "request to cancel mission with cancellation code and reason",
            withRequest: cancelMissionRequest(missionId),
            willRespondWith: cancleMissionResponse,
        });

        const { result } = renderHook(() => useCancelMission({ missionId }), {
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
            await result.current.sendRequest({
                data: {
                    cancellationCode: "CREW",
                    cancellationDescription: "Crew is not available",
                    version: 1,
                },
            });
        });
        expect(result.current.data).toEqual(anyMission());
    });
});
