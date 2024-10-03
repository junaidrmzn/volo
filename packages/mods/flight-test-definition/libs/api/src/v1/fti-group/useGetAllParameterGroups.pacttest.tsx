import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { PACT_CONSUMER_FTD_UI, PACT_PROVIDER_FTD_API } from "../../../config/pactConfig";
import { useGetAllParameterGroups } from "./useGetAllParameterGroups";

const { like, eachLike, boolean, uuid, iso8601DateTimeWithMillis } = Matchers;

const getAllParameterGroupsRequest: RequestOptions = {
    path: "/ftd/v1/parameter-groups",
    method: "GET",
};

const getAllParameterGroupsResponse: ResponseOptions = {
    status: 200,
    headers: {
        "Content-Type": "application/json",
    },
    body: {
        data: eachLike({
            id: uuid(),
            createTime: iso8601DateTimeWithMillis(),
            updateTime: iso8601DateTimeWithMillis(),
            name: like("Parameter Group Name"),
            parameterGroupMapping: eachLike({
                essential: boolean(true),
                parameterId: uuid(),
            }),
        }),
    },
};

// Skipped because FTI parameter groups are not yet managed by the provider.
pactWith.skip({ consumer: PACT_CONSUMER_FTD_UI, provider: PACT_PROVIDER_FTD_API }, (provider) => {
    test("get all parameterGroups", async () => {
        await provider.addInteraction({
            state: "there are multiple parameter groups",
            uponReceiving: "a request for receiving all parameter groups",
            withRequest: getAllParameterGroupsRequest,
            willRespondWith: getAllParameterGroupsResponse,
        });

        const { result, waitForNextUpdate } = renderHook(
            () => useGetAllParameterGroups({ options: { manual: true } }),
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
            result.current.getAllParameterGroupsWithResponseEnvelope();
        });

        await waitForNextUpdate();
    });
});
