import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { PACT_CONSUMER_FTD_UI, PACT_PROVIDER_FTD_API } from "../../../config/pactConfig";
import { useBulkAddImportantNotes } from "./useBulkAddImportantNotes";

const { like, eachLike, term } = Matchers;

const addImportantNoteRequest = (definitionId: string, procedureId: string): RequestOptions => ({
    path: term({
        generate: `/ftd/v1/definitions/${definitionId}/procedures/${procedureId}/important-notes`,
        matcher: "\\/ftd\\/v1\\/definitions\\/[\\da-fA-F\\-]+\\/procedures\\/[\\da-fA-F\\-]+\\/important\\-notes",
    }),
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: eachLike({
        title: like("Title"),
        note: like("Description"),
    }),
});
const addImportantNoteResponse: ResponseOptions = {
    status: 201,
};
pactWith({ consumer: PACT_CONSUMER_FTD_UI, provider: PACT_PROVIDER_FTD_API }, (provider) => {
    test("bulk-creates important notes", async () => {
        const definitionId = "5bce990b-b76c-4241-95a1-674f9f2a62e3";
        const procedureId = "5bce990b-b76c-4241-95a1-674f9f2a62e3";
        await provider.addInteraction({
            state: `a definition with id ${definitionId} exists and a procedure with id ${procedureId} exists`,
            uponReceiving: "a request for bulk-creating important notes",
            withRequest: addImportantNoteRequest(definitionId, procedureId),
            willRespondWith: addImportantNoteResponse,
        });

        const { result, waitForNextUpdate } = renderHook(
            () => useBulkAddImportantNotes({ definitionId, procedureId }),
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
            result.current.bulkAddImportantNotes({
                data: [
                    {
                        title: "Title",
                        note: "Description",
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
