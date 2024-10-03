import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { renderHook } from "@voloiq/testing";
import { PACT_CONSUMER_FTD_UI, PACT_PROVIDER_FTD_API } from "../../../config/pactConfig";
import { anyParameterGroupInsert } from "./anyParameterGroup";
import { useCreateParameterGroup } from "./useCreateParameterGroup";

const { like, eachLike, boolean, uuid, iso8601DateTimeWithMillis } = Matchers;

const addParameterGroupRequest: RequestOptions = {
    path: "/ftd/v1/parameter-groups",
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: {
        name: like("Parameter Group 1"),
        parameterGroupMapping: eachLike({
            essential: boolean(true),
            parameterId: uuid(),
        }),
    },
};

const addParameterGroupResponse: ResponseOptions = {
    status: 201,
    headers: {
        "Content-Type": "application/json",
    },
    body: {
        data: {
            id: uuid(),
            createTime: iso8601DateTimeWithMillis(),
            updateTime: iso8601DateTimeWithMillis(),
            name: like("Parameter Group Name"),
            parameterGroupMapping: eachLike({
                essential: boolean(true),
                parameterId: uuid(),
            }),
        },
    },
};

// Skipped because FTI parameter groups are not yet managed by the provider.
pactWith.skip({ consumer: PACT_CONSUMER_FTD_UI, provider: PACT_PROVIDER_FTD_API }, (provider) => {
    test("creates a parameterGroup", async () => {
        await provider.addInteraction({
            state: "no parameter group exist",
            uponReceiving: "a request for creating a parameter group",
            withRequest: addParameterGroupRequest,
            willRespondWith: addParameterGroupResponse,
        });

        const { result } = renderHook(useCreateParameterGroup, {
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
        await result.current.createParameterGroup(anyParameterGroupInsert());
    });
});
