import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { PACT_CONSUMER_FTD_UI, PACT_PROVIDER_FTD_API } from "../../../config/pactConfig";
import { useGetAssignedTestHazardAssessments } from "./useGetAssignedTestHazardAssessments";

const { like, eachLike, uuid } = Matchers;

const allTestHazardAssessmentsRequest = (definitionId: string): RequestOptions => ({
    path: `/ftd/v1/definitions/${definitionId}/test-hazard-assessments`,
    method: "GET",
});

const allTestHazardAssessmentsResponse: ResponseOptions = {
    status: 200,
    headers: {
        "Content-Type": "application/json",
    },
    body: {
        data: eachLike({
            id: uuid(),
            hazard: like("Loss of control (during EPU failure injection)"),
            residualRiskLevel: like("MEDIUM"),
            preMitigationRiskLevel: like("HIGH"),
        }),
        pagination: {
            totalElements: like(1),
        },
    },
};

// TODO: Unskip tests once the API is implemented
pactWith.skip({ consumer: PACT_CONSUMER_FTD_UI, provider: PACT_PROVIDER_FTD_API }, (provider) => {
    test("fetches all test hazard assessments of a definition", async () => {
        const definitionId = "5bce990b-b76c-4241-95a1-674f9f2a62e3";

        await provider.addInteraction({
            state: `there are test hazard assessments for definition with id ${definitionId}`,
            uponReceiving: `a request for all test hazard assessments of definition with id ${definitionId}`,
            withRequest: allTestHazardAssessmentsRequest(definitionId),
            willRespondWith: allTestHazardAssessmentsResponse,
        });

        const { result, waitForNextUpdate } = renderHook(() => useGetAssignedTestHazardAssessments({ definitionId }), {
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
            result.current.getAssignedTestHazardAssessments();
        });

        await waitForNextUpdate();
    });
});
