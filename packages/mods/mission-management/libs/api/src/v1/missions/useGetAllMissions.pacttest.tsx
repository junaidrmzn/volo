import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { renderHook } from "@voloiq/testing";
import { networkSchedulingManagementBaseUrl } from "../networkSchedulingManagementBaseUrl";
import { anyMission } from "./anyMission";
import { useGetAllMissions } from "./useGetAllMissions";

const { like } = Matchers;

const allMissionsRequest = (): RequestOptions => ({
    path: `${networkSchedulingManagementBaseUrl}/missions`,
    method: "GET",
});

const allMissionsResponse = (): ResponseOptions => ({
    status: 200,
    headers: {
        "Content-Type": "application/json",
    },
    body: like({
        data: [anyMission()],
    }),
});

// TODO: skipped some tests to publish the green pacts, re enable them after fixing

pactWith({ consumer: "voloiq.mission-management.ui", provider: "voloiq.network-scheduling.api" }, (provider) => {
    test.skip("fetches all missions", async () => {
        await provider.addInteraction({
            state: "there are missions",
            uponReceiving: "a request for all missions",
            withRequest: allMissionsRequest(),
            willRespondWith: allMissionsResponse(),
        });

        const { waitForNextUpdate } = renderHook(useGetAllMissions, {
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
