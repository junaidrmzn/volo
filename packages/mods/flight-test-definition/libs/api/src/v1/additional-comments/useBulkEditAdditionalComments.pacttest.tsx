import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { PACT_CONSUMER_FTD_UI, PACT_PROVIDER_FTD_API } from "../../../config/pactConfig";
import { useBulkEditAdditionalComments } from "./useBulkEditAdditionalComments";

const { like, term, eachLike } = Matchers;

const editAdditionalCommentRequest = (
    definitionId: string,
    procedureId: string,
    additionalCommentId: string
): RequestOptions => ({
    path: term({
        generate: `/ftd/v1/definitions/${definitionId}/procedures/${procedureId}/additional-comments`,
        matcher: "\\/ftd\\/v1\\/definitions\\/[\\da-fA-F\\-]+\\/procedures\\/[\\da-fA-F\\-]+\\/additional\\-comments",
    }),
    method: "PATCH",
    headers: {
        "Content-Type": "application/json",
    },
    body: eachLike({
        id: additionalCommentId,
        comment: like("Note"),
    }),
});
const editAdditionalCommentResponse: ResponseOptions = {
    status: 200,
};
pactWith({ consumer: PACT_CONSUMER_FTD_UI, provider: PACT_PROVIDER_FTD_API }, (provider) => {
    test("bulk-updates additional comments", async () => {
        const definitionId = "5bce990b-b76c-4241-95a1-674f9f2a62e3";
        const procedureId = "5bce990b-b76c-4241-95a1-674f9f2a62e3";
        const additionalCommentId = "5bce990b-b76c-4241-95a1-674f9f2a62e3";
        await provider.addInteraction({
            state: `an additional comment with id ${additionalCommentId} exists for a procedure with id ${procedureId} for definition with id ${definitionId}`,
            uponReceiving: "a request for bulk-updating additional comments",
            withRequest: editAdditionalCommentRequest(definitionId, procedureId, additionalCommentId),
            willRespondWith: editAdditionalCommentResponse,
        });

        const { result, waitForNextUpdate } = renderHook(
            () => useBulkEditAdditionalComments({ definitionId, procedureId }),
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
            result.current.bulkEditAdditionalComments({
                data: [
                    {
                        id: additionalCommentId,
                        comment: "Note",
                    },
                ],
                params: {
                    editSessionId: "ab90e187-0e88-4945-8ada-0d6dd8ffd2b3",
                },
            });
        });

        await waitForNextUpdate();
    });
});
