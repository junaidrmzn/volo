import type { ParameterValidationResponse } from "@voloiq-typescript-api/fti-types";
import type { CypressParameter, InterceptorOptions, MockResponse } from "./MockResponse";
import { checkParamsMatches, getResponseValues } from "./MockResponse";
import { parameterRegex } from "./RegexTemplates";

export const anyValidation = (overwrites?: Partial<ParameterValidationResponse>): ParameterValidationResponse => ({
    valid: true,
    ...overwrites,
});

export const makePostInstrumentationValidateInterceptor = (
    expectedResponse?: MockResponse<ParameterValidationResponse>,
    expectedParams?: CypressParameter,
    options?: InterceptorOptions<ParameterValidationResponse>
) => {
    const { returnStatus, returnValue } = getResponseValues<ParameterValidationResponse>(
        anyValidation,
        201,
        expectedResponse
    );

    const postExportRegex = new RegExp(
        `${BACKEND_BASE_URL}/ftd/v1/instrumentation-parameters/validate${parameterRegex}`
    );
    return cy
        .intercept("POST", postExportRegex, (request) => {
            if (expectedParams && !checkParamsMatches(request.query, expectedParams)) {
                return request.destroy();
            }
            return request.reply({
                body: returnValue,
                statusCode: returnStatus,
                ...options,
            });
        })
        .as("postInstrumentationValidate");
};
