import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { PACT_CONSUMER_FTD_UI, PACT_PROVIDER_FTD_API } from "../../../config/pactConfig";
import { useBulkEditProcedures } from "./useBulkEditProcedures";

const { like, term, eachLike } = Matchers;

const editProcedureRequest = (
    definitionId: string,
    procedureId: string,
    testPointParameterId: string
): RequestOptions => ({
    path: term({
        generate: `/ftd/v2/definitions/${definitionId}/procedures`,
        matcher: "\\/ftd\\/v2\\/definitions\\/[\\da-fA-F\\-]+\\/procedures",
    }),
    method: "PATCH",
    headers: {
        "Content-Type": "application/json",
    },
    body: eachLike({
        id: procedureId,
        title: like("Hover Turn"),
        testPointParameters: eachLike(testPointParameterId),
    }),
});
const editProcedureResponse: ResponseOptions = {
    status: 200,
};
pactWith({ consumer: PACT_CONSUMER_FTD_UI, provider: PACT_PROVIDER_FTD_API }, (provider) => {
    test("bulk-updates procedures", async () => {
        const definitionId = "5bce990b-b76c-4241-95a1-674f9f2a62e3";
        const procedureId = "5bce990b-b76c-4241-95a1-674f9f2a62e3";
        const testPointParameterId = "5bce990b-b76c-4241-95a1-674f9f2a62e3";
        await provider.addInteraction({
            state: `a procedure with id ${procedureId} exists for definition with id ${definitionId} and a test point parameter with id ${testPointParameterId} exists`,
            uponReceiving: "a request for bulk-updating procedures in the v2 endpoint",
            withRequest: editProcedureRequest(definitionId, procedureId, testPointParameterId),
            willRespondWith: editProcedureResponse,
        });

        const { result, waitForNextUpdate } = renderHook(() => useBulkEditProcedures({ definitionId }), {
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
            result.current.bulkEditProcedures({
                data: [
                    {
                        id: procedureId,
                        title: "Hover Turn",
                        testPointParameters: [testPointParameterId],
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
