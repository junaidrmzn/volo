import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { PACT_CONSUMER_FTD_UI, PACT_PROVIDER_FTD_API } from "../../../config/pactConfig";
import { anyTestHazardAssessment } from "./anyTestHazardAssessment";
import { useGetTestHazardAssessment } from "./useGetTestHazardAssessment";

const { like } = Matchers;

const getTestHazardAssessmentRequest = (testHazardId: string): RequestOptions => ({
    path: `/ftd/v1/test-hazard-assessments/${testHazardId}`,
    method: "GET",
});

const getTestHazardAssessmentResponse = (testHazardId: string): ResponseOptions => ({
    status: 200,
    headers: {
        "Content-Type": "application/json",
    },
    body: {
        data: like(anyTestHazardAssessment({ id: testHazardId })),
    },
});
pactWith({ consumer: PACT_CONSUMER_FTD_UI, provider: PACT_PROVIDER_FTD_API }, (provider) => {
    test("fetches a single test hazard assessment", async () => {
        const testHazardId = "b4a76bfd-b709-4d3e-9791-aaa7e397a346";

        await provider.addInteraction({
            state: `there exists a test hazard assessment with id ${testHazardId}`,
            uponReceiving: `a request to get a test hazard assessment with id ${testHazardId}`,
            withRequest: getTestHazardAssessmentRequest(testHazardId),
            willRespondWith: getTestHazardAssessmentResponse(testHazardId),
        });

        const { result, waitForNextUpdate } = renderHook(() => useGetTestHazardAssessment(), {
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
            result.current.refetchDataWithResponseEnvelope({ url: `/ftd/v1/test-hazard-assessments/${testHazardId}` });
        });
        await waitForNextUpdate();
    });
});
