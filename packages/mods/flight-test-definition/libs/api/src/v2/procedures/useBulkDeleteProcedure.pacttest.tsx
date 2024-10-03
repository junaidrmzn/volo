import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { PACT_CONSUMER_FTD_UI, PACT_PROVIDER_FTD_API } from "../../../config/pactConfig";
import { useBulkDeleteProcedures } from "./useBulkDeleteProcedures";

const { term } = Matchers;

const deleteProcedureRequest = (definitionId: string, procedureId: string): RequestOptions => ({
    path: term({
        generate: `/ftd/v2/definitions/${definitionId}/procedures`,
        matcher: "\\/ftd\\/v2\\/definitions\\/[\\da-fA-F\\-]+\\/procedures",
    }),
    method: "DELETE",
    body: [procedureId],
});
const deleteProcedureResponse: ResponseOptions = {
    status: 204,
};
// Skipped because it's not possible to test DELETE requests with `body` via Pact in the back end.
pactWith.skip({ consumer: PACT_CONSUMER_FTD_UI, provider: PACT_PROVIDER_FTD_API }, (provider) => {
    test("bulk-deletes specific procedures", async () => {
        const definitionId = "e7ad28d3-20c6-4447-8f07-d4071f53a538";
        const procedureId = "e7ad28d3-20c6-4447-8f07-d4071f53a538";
        await provider.addInteraction({
            state: `a procedure with id ${procedureId} exists for definition with id ${definitionId}`,
            uponReceiving: `a request for bulk-deleting a procedure with id ${procedureId} in the v2 endpoint`,
            withRequest: deleteProcedureRequest(definitionId, procedureId),
            willRespondWith: deleteProcedureResponse,
        });

        const { result, waitForNextUpdate } = renderHook(() => useBulkDeleteProcedures({ definitionId }), {
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
            result.current.bulkDeleteProcedures({
                data: [procedureId],
                params: {
                    editSessionId: "ab90e187-0e88-4945-8ada-0d6dd8ffd2b3",
                },
            });
        });

        await waitForNextUpdate();
    });
});
