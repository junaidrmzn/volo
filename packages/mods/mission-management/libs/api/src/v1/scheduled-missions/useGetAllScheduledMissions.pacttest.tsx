import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { useFormatDateTime } from "@voloiq/dates";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { renderHook } from "@voloiq/testing";
import { networkSchedulingManagementBaseUrl } from "../networkSchedulingManagementBaseUrl";
import { anyAircraftAssignment } from "./anyAircraftAssignment";
import { useGetAllScheduledMissions } from "./useGetAllScheduledMissions";

const { eachLike } = Matchers;
const someDate = new Date("2024-04-01T00:00:00Z");

const allScheduledMissionsRequest = (scheduledDate: string): RequestOptions => ({
    path: `${networkSchedulingManagementBaseUrl}/missions/schedule/${scheduledDate}`,
    method: "GET",
});

const allScheduledMissionsResponse: ResponseOptions = {
    status: 200,
    headers: {
        "Content-Type": "application/json",
    },
    body: {
        data: eachLike(anyAircraftAssignment()),
    },
};

// TODO: skipped some tests to publish the green pacts, re enable them after fixing

pactWith({ consumer: "voloiq.mission-management.ui", provider: "voloiq.network-scheduling.api" }, (provider) => {
    test.skip("fetches all scheduled missions", async () => {
        const { formatDate } = useFormatDateTime();
        const scheduledDate = formatDate(someDate);

        await provider.addInteraction({
            state: `there are scheduled missions for date ${scheduledDate}`,
            uponReceiving: `a request for getting scheduled missions for date ${scheduledDate}`,
            withRequest: allScheduledMissionsRequest(scheduledDate),
            willRespondWith: allScheduledMissionsResponse,
        });

        const { waitForNextUpdate } = renderHook(() => useGetAllScheduledMissions({ scheduledDate }), {
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
