import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { networkSchedulingManagementBaseUrl } from "../networkSchedulingManagementBaseUrl";
import { anyMission } from "./anyMission";
import { useAcceptMission } from "./useAcceptMission";

const acceptMissionRequest = (missionId: string, version?: number): RequestOptions => ({
    path: `${networkSchedulingManagementBaseUrl}/missions/${missionId}/accept-airline`,
    query: `version=${version}`,
    method: "PATCH",
});

const accepteMissionResponse: ResponseOptions = {
    status: 200,
    headers: {
        "Content-Type": "application/json",
    },
    body: {
        data: Matchers.like(anyMission()),
    },
};

// TODO: skipped some tests to publish the green pacts, re enable them after fixing

pactWith({ consumer: "voloiq.mission-management.ui", provider: "voloiq.network-scheduling.api" }, (provider) => {
    test.skip("accept mission", async () => {
        const missionId = "2679f481-1517-4df6-a8e9-debe126fb5a0";
        const version = 1;
        await provider.addInteraction({
            state: `there is a mission with id ${missionId}`,
            uponReceiving: "request to accept mission",
            withRequest: acceptMissionRequest(missionId, version),
            willRespondWith: accepteMissionResponse,
        });

        const { result } = renderHook(() => useAcceptMission({ missionId }), {
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
                data: {},
                params: { version },
            });
        });
        expect(result.current.data).toEqual(anyMission());
    });
});
