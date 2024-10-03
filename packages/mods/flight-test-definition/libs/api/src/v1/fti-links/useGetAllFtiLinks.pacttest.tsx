import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { PACT_CONSUMER_FTD_UI, PACT_PROVIDER_FTD_API } from "../../../config/pactConfig";
import { useGetAllFtiLinks } from "./useGetAllFtiLinks";

const { eachLike, uuid, like, term } = Matchers;

const allFtiLinksRequest = (definitionId: string): RequestOptions => ({
    path: term({
        generate: `/ftd/v1/definitions/${definitionId}/instrumentation-parameters`,
        matcher: "\\/ftd\\/v1\\/definitions\\/[\\da-fA-F\\-]+\\/instrumentation\\-parameters",
    }),
    method: "GET",
});

const allFtiLinksResponse: ResponseOptions = {
    status: 200,
    headers: {
        "Content-Type": "application/json",
    },
    body: {
        data: eachLike({
            id: uuid(),
            instrumentationId: uuid(),
            desirability: like("ESSENTIAL"),
        }),
    },
};
pactWith({ consumer: PACT_CONSUMER_FTD_UI, provider: PACT_PROVIDER_FTD_API }, (provider) => {
    test("fetches all fti links of a definition", async () => {
        const definitionId = "5bce990b-b76c-4241-95a1-674f9f2a62e3";

        await provider.addInteraction({
            state: `there are fti links for definition with id ${definitionId}`,
            uponReceiving: `a request for every fti link of the definition with id ${definitionId}`,
            withRequest: allFtiLinksRequest(definitionId),
            willRespondWith: allFtiLinksResponse,
        });

        const { result, waitForNextUpdate } = renderHook(() => useGetAllFtiLinks({ definitionId }), {
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
            result.current.getAllFtiLinks();
        });

        await waitForNextUpdate();
    });
});
