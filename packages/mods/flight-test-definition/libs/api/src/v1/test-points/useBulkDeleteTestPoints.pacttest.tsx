import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { PACT_CONSUMER_FTD_UI, PACT_PROVIDER_FTD_API } from "../../../config/pactConfig";
import { useBulkDeleteTestPoints } from "./useBulkDeleteTestPoints";

const { term } = Matchers;

const deleteTestPointRequest = (definitionId: string, procedureId: string, testPointId: string): RequestOptions => ({
    path: term({
        generate: `/ftd/v1/definitions/${definitionId}/procedures/${procedureId}/test-points`,
        matcher: "\\/ftd\\/v1\\/definitions\\/[\\da-fA-F\\-]+\\/procedures\\/[\\da-fA-F\\-]+\\/test\\-points",
    }),
    method: "DELETE",
    body: [testPointId],
});
const deleteTestPointResponse: ResponseOptions = {
    status: 204,
};
// Skipped because it's not possible to test DELETE requests with `body` via Pact in the back end.
pactWith.skip({ consumer: PACT_CONSUMER_FTD_UI, provider: PACT_PROVIDER_FTD_API }, (provider) => {
    test("bulk-deletes specific test points", async () => {
        const definitionId = "e7ad28d3-20c6-4447-8f07-d4071f53a538";
        const procedureId = "e7ad28d3-20c6-4447-8f07-d4071f53a538";
        const testPointId = "e7ad28d3-20c6-4447-8f07-d4071f53a538";
        await provider.addInteraction({
            state: `a test point with id ${testPointId} exists for a procedure with id ${procedureId} for definition with id ${definitionId}`,
            uponReceiving: `a request for bulk-deleting test points with id ${procedureId}`,
            withRequest: deleteTestPointRequest(definitionId, procedureId, testPointId),
            willRespondWith: deleteTestPointResponse,
        });

        const { result, waitForNextUpdate } = renderHook(() => useBulkDeleteTestPoints({ definitionId, procedureId }), {
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
            result.current.bulkDeleteTestPoints({
                data: [testPointId],
                params: { editSessionId: "5bce990b-b76c-4241-95a1-674f9f2a62e3" },
            });
        });

        await waitForNextUpdate();
    });
});
