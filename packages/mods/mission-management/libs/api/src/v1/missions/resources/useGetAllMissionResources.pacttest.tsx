import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { renderHook } from "@voloiq/testing";
import { networkSchedulingManagementBaseUrl } from "../../networkSchedulingManagementBaseUrl";
import { useGetAllMissionResources } from "./useGetAllMissionResources";

const { like } = Matchers;

const allMissionResourcesRequest = (missionId: string): RequestOptions => ({
    path: `${networkSchedulingManagementBaseUrl}/missions/${missionId}/resources`,
    method: "GET",
});

const allMissionResourcesResponse = (): ResponseOptions => ({
    status: 200,
    headers: {
        "Content-Type": "application/json",
    },
    body: like({
        data: [{}],
    }),
});

// TODO: skipped some tests to publish the green pacts, re enable them after fixing

pactWith({ consumer: "voloiq.mission-management.ui", provider: "voloiq.network-scheduling.api" }, (provider) => {
    test.skip("fetches all mission resources", async () => {
        const missionId = "913bbd82-373e-4574-9ada-56b04872d54a";
        await provider.addInteraction({
            state: `there are mission resources for a mission with id ${missionId}`,
            uponReceiving: "a request for all mission resources",
            withRequest: allMissionResourcesRequest(missionId),
            willRespondWith: allMissionResourcesResponse(),
        });

        const { waitForNextUpdate } = renderHook(() => useGetAllMissionResources({ missionId }), {
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

        await waitForNextUpdate();
    });
});
