import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { PACT_CONSUMER_FTD_UI, PACT_PROVIDER_FTD_API } from "../../../config/pactConfig";
import { useBulkDeleteImportantNotes } from "./useBulkDeleteImportantNotes";

const { term } = Matchers;

const deleteImportantNoteRequest = (
    definitionId: string,
    procedureId: string,
    importantNoteId: string
): RequestOptions => ({
    path: term({
        generate: `/ftd/v1/definitions/${definitionId}/procedures/${procedureId}/important-notes`,
        matcher: "\\/ftd\\/v1\\/definitions\\/[\\da-fA-F\\-]+\\/procedures\\/[\\da-fA-F\\-]+\\/important\\-notes",
    }),
    method: "DELETE",
    body: [importantNoteId],
});
const deleteImportantNoteResponse: ResponseOptions = {
    status: 204,
};
// Skipped because it's not possible to test DELETE requests with `body` via Pact in the back end.
pactWith.skip({ consumer: PACT_CONSUMER_FTD_UI, provider: PACT_PROVIDER_FTD_API }, (provider) => {
    test("bulk-deletes specific important notes", async () => {
        const definitionId = "e7ad28d3-20c6-4447-8f07-d4071f53a538";
        const procedureId = "e7ad28d3-20c6-4447-8f07-d4071f53a538";
        const importantNoteId = "e7ad28d3-20c6-4447-8f07-d4071f53a538";
        await provider.addInteraction({
            state: `an important note with id ${importantNoteId} exists for a procedure with id ${procedureId} for definition with id ${definitionId}`,
            uponReceiving: `a request for bulk-deleting important notes with id ${importantNoteId}`,
            withRequest: deleteImportantNoteRequest(definitionId, procedureId, importantNoteId),
            willRespondWith: deleteImportantNoteResponse,
        });

        const { result, waitForNextUpdate } = renderHook(
            () => useBulkDeleteImportantNotes({ definitionId, procedureId }),
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
            result.current.bulkDeleteImportantNotes({
                data: [importantNoteId],
                params: {
                    editSessionId: "ab90e187-0e88-4945-8ada-0d6dd8ffd2b3",
                },
            });
        });

        await waitForNextUpdate();
    });
});
