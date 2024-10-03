import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { PACT_CONSUMER_FTD_UI, PACT_PROVIDER_FTD_API } from "../../../config/pactConfig";
import { useUnassignTestHazardAssessments } from "./useUnassignTestHazardAssessments";

const { eachLike, term, uuid } = Matchers;

const deleteTestHazardAssessmentRequest = (definitionId: string): RequestOptions => ({
    path: term({
        generate: `/ftd/v1/definitions/${definitionId}/test-hazard-assessments`,
        matcher: "\\/ftd\\/v1\\/definitions\\/[\\da-fA-F\\-]+\\/test\\-hazard\\-assessments",
    }),
    method: "DELETE",
    body: eachLike(uuid()),
});

const deleteTestHazardAssessmentResponse: ResponseOptions = {
    status: 204,
};

// Skipped because it's not possible to test DELETE requests with `body` via Pact in the back end.
pactWith.skip({ consumer: PACT_CONSUMER_FTD_UI, provider: PACT_PROVIDER_FTD_API }, (provider) => {
    test("unassigns a number of test hazard assessments from a definition", async () => {
        const definitionId = "5bce990b-b76c-4241-95a1-674f9f2a62e3";
        const testHazardAssessmentId = "e7ad28d3-20c6-4447-8f07-d4071f53a538";

        await provider.addInteraction({
            state: `a definition with id ${definitionId} and test hazard assessments with ids [${testHazardAssessmentId}] exist`,
            uponReceiving: "a request for unassigning a number of test hazard assessments from a definition",
            withRequest: deleteTestHazardAssessmentRequest(definitionId),
            willRespondWith: deleteTestHazardAssessmentResponse,
        });

        const { result } = renderHook(() => useUnassignTestHazardAssessments({ definitionId }), {
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
            await result.current.unassignTestHazardAssessments({
                data: [testHazardAssessmentId],
                params: { editSessionId: "5bce990b-b76c-4241-95a1-674f9f2a62e3" },
            });
        });
    });
});
