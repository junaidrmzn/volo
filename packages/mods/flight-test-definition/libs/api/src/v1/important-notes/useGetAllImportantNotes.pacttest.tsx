import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { PACT_CONSUMER_FTD_UI, PACT_PROVIDER_FTD_API } from "../../../config/pactConfig";
import { useGetAllImportantNotes } from "./useGetAllImportantNotes";

const { eachLike, uuid, like } = Matchers;

const allImportantNotesRequest = (definitionId: string, procedureId: string): RequestOptions => ({
    path: `/ftd/v1/definitions/${definitionId}/procedures/${procedureId}/important-notes`,
    method: "GET",
});

const allImportantNotesResponse: ResponseOptions = {
    status: 200,
    headers: {
        "Content-Type": "application/json",
    },
    body: {
        data: eachLike({
            id: uuid(),
            title: like("Hover Turn"),
            note: like("Note"),
        }),
        pagination: {
            totalElements: Matchers.like(1),
        },
    },
};
pactWith({ consumer: PACT_CONSUMER_FTD_UI, provider: PACT_PROVIDER_FTD_API }, (provider) => {
    test("fetches all important notes of a procedure", async () => {
        const definitionId = "5bce990b-b76c-4241-95a1-674f9f2a62e3";
        const procedureId = "5bce990b-b76c-4241-95a1-674f9f2a62e3";

        await provider.addInteraction({
            state: `there are important notes for a procedure with id ${procedureId} for a definition with id ${definitionId}`,
            uponReceiving: `a request for every important note of procedure with id ${procedureId} of the definition with id ${definitionId}`,
            withRequest: allImportantNotesRequest(definitionId, procedureId),
            willRespondWith: allImportantNotesResponse,
        });

        const { result, waitForNextUpdate } = renderHook(() => useGetAllImportantNotes({ definitionId, procedureId }), {
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
            result.current.getAllImportantNotes();
        });

        await waitForNextUpdate();
    });
});
