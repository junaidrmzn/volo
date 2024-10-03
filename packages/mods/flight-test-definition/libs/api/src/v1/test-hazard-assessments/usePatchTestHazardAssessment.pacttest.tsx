import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { PACT_CONSUMER_FTD_UI, PACT_PROVIDER_FTD_API } from "../../../config/pactConfig";
import { usePatchTestHazardAssessment } from "./usePatchTestHazardAssessment";

const { like } = Matchers;

const patchTestHazardAssessmentRequest = (testHazardAssessmentId: string): RequestOptions => ({
    path: `/ftd/v1/test-hazard-assessments/${testHazardAssessmentId}`,
    method: "PATCH",
    headers: {
        "Content-Type": "application/json",
    },
    body: {
        applicability: like("UNMANNED"),
    },
});
const patchTestHazardAssessmentResponse: ResponseOptions = {
    status: 200,
};

pactWith({ consumer: PACT_CONSUMER_FTD_UI, provider: PACT_PROVIDER_FTD_API }, (provider) => {
    const testHazardAssessmentId = "b4a76bfd-b709-4d3e-9791-aaa7e397a346";

    test("updates an existing test hazard assessment", async () => {
        await provider.addInteraction({
            state: `there exists a test hazard assessment with id ${testHazardAssessmentId}`,
            uponReceiving: `a request for updating a test hazard assessment with id ${testHazardAssessmentId}`,
            withRequest: patchTestHazardAssessmentRequest(testHazardAssessmentId),
            willRespondWith: patchTestHazardAssessmentResponse,
        });

        const { result, waitForNextUpdate } = renderHook(() => usePatchTestHazardAssessment(testHazardAssessmentId), {
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
            result.current.sendRequest({
                data: {
                    applicability: "UNMANNED",
                },
            });
        });

        await waitForNextUpdate();
    });
});
