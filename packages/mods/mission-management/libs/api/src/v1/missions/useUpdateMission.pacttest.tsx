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
import { MissionEstimatedDateTimes } from "./apiModel";
import { useUpdateMission } from "./useUpdateMission";

const { like } = Matchers;

const updateMissionRequestBody: MissionEstimatedDateTimes = {
    estimatedDepartureDateTime: "2024-09-01T12:00:00.000Z",
    estimatedArrivalDateTime: "2024-09-01T12:00:00.000Z",
    delayCodes: ["01"],
    version: 1,
};

const updateMissionRequest = (missionId: string): RequestOptions => ({
    path: `${networkSchedulingManagementBaseUrl}/missions/${missionId}/delay`,
    method: "PATCH",
    headers: {
        "Content-Type": "application/json",
    },
    body: like(updateMissionRequestBody),
});

const updateMissionResponse = (): ResponseOptions => ({
    status: 200,
    headers: {
        "Content-Type": "application/json",
    },
    body: like({
        data: anyMission(),
    }),
});

pactWith({ consumer: "voloiq.mission-management.ui", provider: "voloiq.network-scheduling.api" }, (provider) => {
    test("a request to update a mission", async () => {
        const missionId = "913bbd82-373e-4574-9ada-56b04872d54a";

        await provider.addInteraction({
            state: `there is a mission with id ${missionId}`,
            uponReceiving: "a request to update a mission",
            withRequest: updateMissionRequest(missionId),
            willRespondWith: updateMissionResponse(),
        });

        const { result, waitForNextUpdate } = renderHook(() => useUpdateMission({ missionId }), {
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
            result.current.sendRequest({
                data: updateMissionRequestBody,
            });
        });

        await waitForNextUpdate();
    });
});
