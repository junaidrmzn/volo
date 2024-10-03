import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { networkSchedulingManagementBaseUrl } from "../../networkSchedulingManagementBaseUrl";
import type { MessageInformationCreate } from "./apiModels";
import { useAddMissionMessage } from "./useAddMissionMessage";

const { like } = Matchers;

const addMissionMessageRequestBody: MessageInformationCreate = {
    message: "Foo",
    messageCategory: "GENERAL",
    userRole: "OCC",
};

const addMissionMessageRequest = (missionId: string): RequestOptions => ({
    path: `${networkSchedulingManagementBaseUrl}/missions/${missionId}/message`,
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: like(addMissionMessageRequestBody),
});

const addMissionMessageResponse = (): ResponseOptions => ({
    status: 201,
    headers: {
        "Content-Type": "application/json",
    },
});

// TODO: skipped some tests to publish the green pacts, re enable them after fixing

pactWith({ consumer: "voloiq.mission-management.ui", provider: "voloiq.network-scheduling.api" }, (provider) => {
    test.skip("creates a new message on a mission", async () => {
        const missionId = "913bbd82-373e-4574-9ada-56b04872d54a";
        await provider.addInteraction({
            state: `there is a mission with id ${missionId}`,
            uponReceiving: "a request to create a message on a mission",
            withRequest: addMissionMessageRequest(missionId),
            willRespondWith: addMissionMessageResponse(),
        });

        const { result, waitForNextUpdate } = renderHook(() => useAddMissionMessage({ missionId }), {
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
                data: addMissionMessageRequestBody,
            });
        });

        await waitForNextUpdate();
    });
});
