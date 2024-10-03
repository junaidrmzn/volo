import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { PACT_CONSUMER_FTD_UI, PACT_PROVIDER_FTD_API } from "../../../config/pactConfig";
import { anyChangeLogV2 } from "./anyChangeLogV2";
import { useGetAllChangeLogsV2 } from "./useGetAllChangeLogsV2";

const { eachLike } = Matchers;

const changeLogsV2Request = (definitionId: string): RequestOptions => ({
    path: `/ftd/v2/definitions/${definitionId}/changelogs`,
    method: "GET",
});

const changeLogsV2Response = (): ResponseOptions => ({
    status: 200,
    headers: {
        "Content-Type": "application/json",
    },
    body: {
        data: eachLike(anyChangeLogV2()),
    },
});

pactWith({ consumer: PACT_CONSUMER_FTD_UI, provider: PACT_PROVIDER_FTD_API }, (provider) => {
    test("fetches a list of changes for a specific definition with revision sorting", async () => {
        const definitionId = "5bce990b-b76c-4241-95a1-674f9f2a62e3";
        await provider.addInteraction({
            state: `a change log for a definition with id ${definitionId} exists`,
            uponReceiving: `a request for the changelog of a definition with id ${definitionId} in v2`,
            withRequest: changeLogsV2Request(definitionId),
            willRespondWith: changeLogsV2Response(),
        });

        const { result, waitForNextUpdate } = renderHook(() => useGetAllChangeLogsV2({ definitionId, manual: false }), {
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
            result.current.getChangeLogsV2();
        });

        await waitForNextUpdate();
    });
});
