import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { PACT_CONSUMER_FTD_UI, PACT_PROVIDER_FTD_API } from "../../../config/pactConfig";
import { useBulkDeleteAdditionalComments } from "./useBulkDeleteAdditionalComments";

const { term, eachLike } = Matchers;

const deleteAdditionalCommentRequest = (
    definitionId: string,
    procedureId: string,
    additionalCommentId: string
): RequestOptions => ({
    path: term({
        generate: `/ftd/v1/definitions/${definitionId}/procedures/${procedureId}/additional-comments`,
        matcher: "\\/ftd\\/v1\\/definitions\\/[\\da-fA-F\\-]+\\/procedures\\/[\\da-fA-F\\-]+\\/additional\\-comments",
    }),
    method: "DELETE",
    body: eachLike(additionalCommentId),
});
const deleteAdditionalCommentResponse: ResponseOptions = {
    status: 204,
};
// Skipped because it's not possible to test DELETE requests with `body` via Pact in the back end.
pactWith.skip({ consumer: PACT_CONSUMER_FTD_UI, provider: PACT_PROVIDER_FTD_API }, (provider) => {
    test("bulk-deletes specific additional comments", async () => {
        const definitionId = "e7ad28d3-20c6-4447-8f07-d4071f53a538";
        const procedureId = "e7ad28d3-20c6-4447-8f07-d4071f53a538";
        const additionalCommentId = "e7ad28d3-20c6-4447-8f07-d4071f53a538";
        await provider.addInteraction({
            state: `an additional comment with id ${additionalCommentId} exists for a procedure with id ${procedureId} for definition with id ${definitionId}`,
            uponReceiving: `a request for bulk-deleting additional comments with id ${additionalCommentId}`,
            withRequest: deleteAdditionalCommentRequest(definitionId, procedureId, additionalCommentId),
            willRespondWith: deleteAdditionalCommentResponse,
        });

        const { result, waitForNextUpdate } = renderHook(
            () => useBulkDeleteAdditionalComments({ definitionId, procedureId }),
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
            result.current.bulkDeleteAdditionalComments({
                data: [additionalCommentId],
                params: {
                    editSessionId: "ab90e187-0e88-4945-8ada-0d6dd8ffd2b3",
                },
            });
        });

        await waitForNextUpdate();
    });
});
