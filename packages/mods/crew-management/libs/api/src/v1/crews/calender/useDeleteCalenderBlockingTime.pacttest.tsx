import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { crewManagementBaseUrl } from "../../crewManagementBaseUrl";
import { useDeleteCrewMemberBlockingTime } from "./useDeleteCrewMemberBlockingTime";

const deleteCrewMemberBlockingTimeRequest = (crewMemberId: string, blockingTimeId: string): RequestOptions => ({
    path: `${crewManagementBaseUrl}/crew-management/${crewMemberId}/calendar/${blockingTimeId}`,
    method: "DELETE",
});

const deleteCrewMemberBlockingTimeResponse = (): ResponseOptions => ({
    status: 204,
});

pactWith({ consumer: "voloiq.crew-management.ui", provider: "voloiq.crew-management.api" }, (provider) => {
    it("will delete blocking time of crew member", async () => {
        const crewMemberId = "3679f481-1517-4df6-a8e9-debe126fb5a0";
        const blockingTimeId = "3679f481-1517-4df6-a8e9-debe126fb5a0";

        await provider.addInteraction({
            state: `there is a crew member with id ${crewMemberId} and blocking event with id ${blockingTimeId}`,
            uponReceiving: `request to delete a blocking time with id ${blockingTimeId} for a crew member with id ${crewMemberId}`,
            withRequest: deleteCrewMemberBlockingTimeRequest(crewMemberId, blockingTimeId),
            willRespondWith: deleteCrewMemberBlockingTimeResponse(),
        });

        const { result, waitForNextUpdate } = renderHook(
            () => useDeleteCrewMemberBlockingTime({ crewMemberId, blockingTimeId }),
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
            result.current.sendRequestDeleteCrewMemberBlockingTime();
        });

        await waitForNextUpdate();
    });
});
