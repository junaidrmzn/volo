import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { PACT_CONSUMER_FTD_UI, PACT_PROVIDER_FTD_API } from "../../../config/pactConfig";
import { useBulkCreateTestHazardAssessments } from "./useBulkCreateTestHazardAssessments";

const { eachLike } = Matchers;

const addTestHazardAssessmentRequest = (): RequestOptions => ({
    path: "/ftd/v1/test-hazard-assessments",
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: eachLike({
        applicability: "MANNED",
        hazard: "EPU/ Rotor load/ Vibration limit exceedance (during EPU failure injection)",
        hazardGroup: "GENERIC_HAZARDS",
        preMitigationRiskLevel: "MEDIUM",
        residualRiskLevel: "VERY_HIGH",
    }),
});
const addTestHazardAssessmentResponse: ResponseOptions = {
    status: 201,
};

pactWith({ consumer: PACT_CONSUMER_FTD_UI, provider: PACT_PROVIDER_FTD_API }, (provider) => {
    test("creates a new test hazard assessment", async () => {
        await provider.addInteraction({
            state: "no test hazard assessments exist",
            uponReceiving: "a request for creating a new test hazard assessment",
            withRequest: addTestHazardAssessmentRequest(),
            willRespondWith: addTestHazardAssessmentResponse,
        });

        const { result, waitForNextUpdate } = renderHook(useBulkCreateTestHazardAssessments, {
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
            result.current.addTestHazardAssessment({
                data: [
                    {
                        applicability: "MANNED",
                        hazard: "EPU/ Rotor load/ Vibration limit exceedance (during EPU failure injection)",
                        hazardGroup: "GENERIC_HAZARDS",
                        preMitigationRiskLevel: "MEDIUM",
                        residualRiskLevel: "VERY_HIGH",
                    },
                ],
            });
        });

        await waitForNextUpdate();
    });
});
