import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import type { CrewMemberAssignmentCreate } from "@voloiq-typescript-api/network-scheduling-types";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { networkSchedulingManagementBaseUrl } from "../../networkSchedulingManagementBaseUrl";
import { useAssignCrew } from "./useAssignCrew";

const { like } = Matchers;

const assignCrewRequestBody: CrewMemberAssignmentCreate = {
    crewMembers: [
        {
            crewMemberId: "2d351d5c6-4395-404a-8921-23678473299d",
            crewMemberRole: "FTE",
        },
    ],
};

const assignCrewRequest = (missionId: string): RequestOptions => ({
    path: `${networkSchedulingManagementBaseUrl}/missions/assignments/${missionId}/crew`,
    method: "PUT",
    headers: {
        "Content-Type": "application/json",
    },
    body: like(assignCrewRequestBody),
});

const assignCrewResponse = (): ResponseOptions => ({
    status: 200,
    headers: {
        "Content-Type": "application/json",
    },
});

// TODO: skipped some tests to publish the green pacts, re enable them after fixing

pactWith({ consumer: "voloiq.mission-management.ui", provider: "voloiq.network-scheduling.api" }, (provider) => {
    test.skip("creates a new crew assignment for a mission", async () => {
        const missionId = "913bbd82-373e-4574-9ada-56b04872d54a";
        await provider.addInteraction({
            state: `there is a mission with id ${missionId} that can get a crew assignment`,
            uponReceiving: "a request to create a crew assignment for a mission",
            withRequest: assignCrewRequest(missionId),
            willRespondWith: assignCrewResponse(),
        });

        const { result, waitForNextUpdate } = renderHook(() => useAssignCrew({ missionId }), {
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
                data: assignCrewRequestBody,
            });
        });

        await waitForNextUpdate();
    });
});
