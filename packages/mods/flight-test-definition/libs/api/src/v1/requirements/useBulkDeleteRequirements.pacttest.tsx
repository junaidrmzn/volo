import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { PACT_CONSUMER_FTD_UI, PACT_PROVIDER_FTD_API } from "../../../config/pactConfig";
import { useBulkDeleteRequirements } from "./useBulkDeleteRequirements";

const { term } = Matchers;

const deleteRequirementRequest = (definitionId: string, requirementId: string): RequestOptions => ({
    path: term({
        generate: `/ftd/v1/definitions/${definitionId}/requirements`,
        matcher: "\\/ftd\\/v1\\/definitions\\/[\\da-fA-F\\-]+\\/requirements",
    }),
    method: "DELETE",
    body: [requirementId],
});
const deleteRequirementResponse: ResponseOptions = {
    status: 204,
};
// Skipped because it's not possible to test DELETE requests with `body` via Pact in the back end.
pactWith.skip({ consumer: PACT_CONSUMER_FTD_UI, provider: PACT_PROVIDER_FTD_API }, (provider) => {
    test("deletes one or more specific requirements", async () => {
        const definitionId = "e7ad28d3-20c6-4447-8f07-d4071f53a538";
        const requirementId = "e7ad28d3-20c6-4447-8f07-d4071f53a538";
        await provider.addInteraction({
            state: `some requirements with ids [${requirementId}] exist for definition with id ${definitionId}`,
            uponReceiving: `a request for deleting requirements with ids [${requirementId}]`,
            withRequest: deleteRequirementRequest(definitionId, requirementId),
            willRespondWith: deleteRequirementResponse,
        });

        const { result } = renderHook(() => useBulkDeleteRequirements({ definitionId }), {
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

        await act(async () => {
            await result.current.bulkDeleteRequirements({
                data: [requirementId],
                params: { editSessionId: "5bce990b-b76c-4241-95a1-674f9f2a62e3" },
            });
        });
    });
});
