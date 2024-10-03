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
import { useGetAllTestHazardAssessments } from "./useGetAllTestHazardAssessments";

const { eachLike } = Matchers;

const getAllTestHazardAssessmentseRequest = (): RequestOptions => ({
    path: `/ftd/v1/test-hazard-assessments`,
    method: "GET",
});

const getAllTestHazardAssessmentsResponse: ResponseOptions = {
    status: 200,
    headers: {
        "Content-Type": "application/json",
    },
    body: {
        data: eachLike(anyTestHazardAssessment()),
    },
};
pactWith({ consumer: PACT_CONSUMER_FTD_UI, provider: PACT_PROVIDER_FTD_API }, (provider) => {
    test("fetches all test hazards assessments", async () => {
        await provider.addInteraction({
            state: `there are test hazard assessments that exist`,
            uponReceiving: `a request for all test hazard assessments`,
            withRequest: getAllTestHazardAssessmentseRequest(),
            willRespondWith: getAllTestHazardAssessmentsResponse,
        });

        const { result, waitForNextUpdate } = renderHook(() => useGetAllTestHazardAssessments(), {
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
            result.current.getAllTestHazardAssessmentsWithParams({});
        });
        await waitForNextUpdate();
    });
});
