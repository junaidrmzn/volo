import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { renderHook } from "@voloiq/testing";
import { PACT_CONSUMER_FTD_UI, PACT_PROVIDER_FTD_API } from "../../../config/pactConfig";
import { useDeleteParameterGroup } from "./useDeleteParameterGroup";

const { term } = Matchers;

const deleteParameterGroupRequest = (groupId: string): RequestOptions => ({
    path: term({
        generate: `/ftd/v1/parameter-groups/${groupId}`,
        matcher: "\\/ftd\\/v1\\/parameter-groups\\/[\\da-fA-F\\-]+",
    }),
    method: "DELETE",
});

const deleteParameterGroupResponse: ResponseOptions = {
    status: 204,
};

// Skipped because FTI parameter groups are not yet managed by the provider.
pactWith.skip({ consumer: PACT_CONSUMER_FTD_UI, provider: PACT_PROVIDER_FTD_API }, (provider) => {
    test("delete a parameterGroup", async () => {
        const groupId = "ce118b6e-d8e1-11e7-9296-cec278b6b50b";
        await provider.addInteraction({
            state: `a parameter group with id ${groupId} exists`,
            uponReceiving: `a request for deleting parameter group with id ${groupId}`,
            withRequest: deleteParameterGroupRequest(groupId),
            willRespondWith: deleteParameterGroupResponse,
        });

        const { result } = renderHook(useDeleteParameterGroup, {
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
        await result.current.deleteParameterGroup(groupId);
    });
});
