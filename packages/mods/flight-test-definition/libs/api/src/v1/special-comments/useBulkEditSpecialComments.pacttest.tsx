import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { PACT_CONSUMER_FTD_UI, PACT_PROVIDER_FTD_API } from "../../../config/pactConfig";
import { useBulkEditSpecialComments } from "./useBulkEditSpecialComments";

const { like, term, eachLike } = Matchers;

const editSpecialCommentRequest = (definitionId: string, specialCommentId: string): RequestOptions => ({
    path: term({
        generate: `/ftd/v1/definitions/${definitionId}/special-comments`,
        matcher: "\\/ftd\\/v1\\/definitions\\/[\\da-fA-F\\-]+\\/special-comments",
    }),
    method: "PATCH",
    headers: {
        "Content-Type": "application/json",
    },
    body: [
        {
            id: specialCommentId,
            comment: like("Failure configurations"),
        },
    ],
});
const editSpecialCommentResponse: ResponseOptions = {
    status: 200,
    headers: {
        "Content-Type": "application/json",
    },
    body: {
        data: eachLike({
            id: "1a3afe6d-43dc-43e7-a69a-3efde5f612ef",
            comment: "Foo",
        }),
    },
};

pactWith({ consumer: PACT_CONSUMER_FTD_UI, provider: PACT_PROVIDER_FTD_API }, (provider) => {
    test("updates a special comment", async () => {
        const definitionId = "5bce990b-b76c-4241-95a1-674f9f2a62e3";
        const specialCommentId = "5bce990b-b76c-4241-95a1-674f9f2a62e3";
        const specialCommentIds = [specialCommentId];
        await provider.addInteraction({
            state: `some specialComments with ids [${specialCommentIds}] exist for definition with id ${definitionId}`,
            uponReceiving: "a request for updating a specialComment",
            withRequest: editSpecialCommentRequest(definitionId, specialCommentId),
            willRespondWith: editSpecialCommentResponse,
        });

        const { result, waitForNextUpdate } = renderHook(() => useBulkEditSpecialComments({ definitionId }), {
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
            result.current.onBulkEditSpecialComments(
                [
                    {
                        id: specialCommentId,
                        comment: "Failure configurations",
                    },
                ],
                "5bce990b-b76c-4241-95a1-674f9f2a62e3"
            );
        });

        await waitForNextUpdate();
    });
});
