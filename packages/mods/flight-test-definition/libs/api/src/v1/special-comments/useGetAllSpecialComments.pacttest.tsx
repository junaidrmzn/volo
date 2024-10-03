import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { renderHook, waitFor } from "@voloiq/testing";
import { PACT_CONSUMER_FTD_UI, PACT_PROVIDER_FTD_API } from "../../../config/pactConfig";
import { useGetAllSpecialComments } from "./useGetAllSpecialComments";

const allSpecialCommentsRequest = (definitionId: string): RequestOptions => ({
    path: `/ftd/v1/definitions/${definitionId}/special-comments`,
    method: "GET",
});

const allSpecialCommentsResponse: ResponseOptions = {
    status: 200,
    headers: {
        "Content-Type": "application/json",
    },
    body: {
        data: Matchers.eachLike({
            id: "1a3afe6d-43dc-43e7-a69a-3efde5f612ef",
            comment: "Foo",
        }),
        pagination: {
            totalElements: Matchers.like(1),
        },
    },
};

pactWith({ consumer: PACT_CONSUMER_FTD_UI, provider: PACT_PROVIDER_FTD_API }, (provider) => {
    test("fetches all special comments of a definition", async () => {
        const definitionId = "5bce990b-b76c-4241-95a1-674f9f2a62e3";

        await provider.addInteraction({
            state: `there are specialComments for definition with id ${definitionId}`,
            uponReceiving: `a request for all specialComments of definition with id ${definitionId}`,
            withRequest: allSpecialCommentsRequest(definitionId),
            willRespondWith: allSpecialCommentsResponse,
        });

        const { result } = renderHook(() => useGetAllSpecialComments({ definitionId }), {
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

        const responseSpecialComments = await waitFor(() => result.current?.getAllSpecialComments());
        expect(responseSpecialComments).toHaveLength(1);
    });
});
