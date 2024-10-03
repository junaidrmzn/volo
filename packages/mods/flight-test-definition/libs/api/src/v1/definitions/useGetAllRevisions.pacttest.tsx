import { Matchers } from "@pact-foundation/pact";
import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { PACT_CONSUMER_FTD_UI, PACT_PROVIDER_FTD_API } from "../../../config/pactConfig";
import { useGetAllRevisions } from "./useGetAllRevisions";

const { eachLike } = Matchers;

const revisionsRequest = (definitionId: string): RequestOptions => ({
    path: `/ftd/v1/definitions/${definitionId}/revisions`,
    method: "GET",
});
const revisionsResponse = (): ResponseOptions => ({
    status: 200,
    headers: {
        "Content-Type": "application/json",
    },
    body: {
        data: eachLike({ ftdId: "FTD-V21-05-236-A00", released: true, revision: "A00" }),
    },
});

pactWith({ consumer: PACT_CONSUMER_FTD_UI, provider: PACT_PROVIDER_FTD_API }, (provider) => {
    test("fetches all revisions for a specific definition", async () => {
        const definitionId = "5bce990b-b76c-4241-95a1-674f9f2a62e3";
        await provider.addInteraction({
            state: `there exists a definition with id ${definitionId} that has been released twice before`,
            uponReceiving: `a request for definition with id ${definitionId}`,
            withRequest: revisionsRequest(definitionId),
            willRespondWith: revisionsResponse(),
        });

        const { result, waitForNextUpdate } = renderHook(() => useGetAllRevisions({ definitionId, manual: false }), {
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
            result.current.sendRequest();
        });

        await waitForNextUpdate();
    });
});
