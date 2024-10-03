import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { crewManagementBaseUrl } from "../../crewManagementBaseUrl";
import { anyCrewMemberCalenderBlockingTime } from "./anyCrewMemberCalenderBlockingTime";
import { useUpdateCrewMemberBlockingTime } from "./useUpdateCrewMemberBlockingTime";

const updateCrewMemberBlockingTimeRequest = (crewMemberId: string, blockingTimeId: string): RequestOptions => ({
    path: `${crewManagementBaseUrl}/crew-management/${crewMemberId}/calendar/${blockingTimeId}`,
    method: "PUT",
    headers: { "Content-Type": "application/json" },
});

const updateCrewMemberBlockingTimeResponse = (): ResponseOptions => ({
    status: 200,
});

pactWith({ consumer: "voloiq.crew-management.ui", provider: "voloiq.crew-management.api" }, (provider) => {
    it("will edit a blocking time of crew members", async () => {
        const crewMemberId = "3679f481-1517-4df6-a8e9-debe126fb5a0";
        const blockingTimeId = "3679f481-1517-4df6-a8e9-debe126fb5a0";

        await provider.addInteraction({
            state: `there is a crew member with id ${crewMemberId} and blocking event with id ${blockingTimeId}`,
            uponReceiving: `request to edit a blocking time with id ${blockingTimeId} for a crew member with id ${crewMemberId}`,
            withRequest: updateCrewMemberBlockingTimeRequest(crewMemberId, blockingTimeId),
            willRespondWith: updateCrewMemberBlockingTimeResponse(),
        });

        const { result, waitForNextUpdate } = renderHook(
            () => useUpdateCrewMemberBlockingTime({ crewMemberId, blockingTimeId }),
            {
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
            }
        );

        act(() => {
            result.current.sendRequestUpdateCrewMemberBlockingTime({
                data: anyCrewMemberCalenderBlockingTime(),
            });
        });

        await waitForNextUpdate();
    });
});
