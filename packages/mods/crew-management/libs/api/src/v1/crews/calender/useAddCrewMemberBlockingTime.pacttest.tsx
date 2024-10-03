import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { crewManagementBaseUrl } from "../../crewManagementBaseUrl";
import { anyCrewMemberCalenderBlockingTime } from "./anyCrewMemberCalenderBlockingTime";
import { useAddCrewMemberBlockingTime } from "./useAddCrewMemberBlockingTime";

const addCrewMemberBlockingTimeRequest = (crewMemberId: string): RequestOptions => ({
    path: `${crewManagementBaseUrl}/crew-management/${crewMemberId}/calendar/block`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
});

const addCrewMemberBlockingTimeResponse = (): ResponseOptions => ({
    status: 201,
});

pactWith({ consumer: "voloiq.crew-management.ui", provider: "voloiq.crew-management.api" }, (provider) => {
    it("will add a new blocking time for a crew member", async () => {
        const crewMemberId = "3679f481-1517-4df6-a8e9-debe126fb5a0";

        await provider.addInteraction({
            state: `there is a crew member with id ${crewMemberId}`,
            uponReceiving: `request to add a new blocking time for a crew member with id ${crewMemberId}`,
            withRequest: addCrewMemberBlockingTimeRequest(crewMemberId),
            willRespondWith: addCrewMemberBlockingTimeResponse(),
        });

        const { result, waitForNextUpdate } = renderHook(() => useAddCrewMemberBlockingTime({ crewMemberId }), {
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
            result.current.sendRequestAddCrewMemberBlockingTime({
                data: anyCrewMemberCalenderBlockingTime(),
            });
        });

        await waitForNextUpdate();
    });
});
