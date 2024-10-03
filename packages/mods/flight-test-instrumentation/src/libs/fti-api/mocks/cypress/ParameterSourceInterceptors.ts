import type { ParameterSource } from "@voloiq-typescript-api/fti-types";
import { UUID } from "uuidjs";
import type { CypressParameter, InterceptorOptions, MockResponseArray } from "./MockResponse";
import { checkParamsMatches, getResponseValuesArray } from "./MockResponse";
import { parameterRegex } from "./RegexTemplates";

export const anyParameterSource = (overwrites?: Partial<ParameterSource>): ParameterSource => ({
    id: UUID.generate(),
    createTime: "2022-08-02T00:00:00.000Z",
    label: "Source",
    updateTime: new Date().toISOString(),
    ...overwrites,
});

export const makeGetAllParameterSourceInterceptor = (
    expectedResponse?: MockResponseArray<ParameterSource>,
    expectedParams?: CypressParameter,
    options?: InterceptorOptions<ParameterSource>
) => {
    const { returnStatus, returnValue } = getResponseValuesArray<ParameterSource>(
        anyParameterSource,
        200,
        expectedResponse
    );
    const getAllParameterSourceRegex = new RegExp(
        `^${BACKEND_BASE_URL}/instrumentation-parameter-sources${parameterRegex}$`,
        "m"
    );
    return cy
        .intercept("GET", getAllParameterSourceRegex, (request) => {
            if (expectedParams && !checkParamsMatches(request.query, expectedParams)) {
                return request.destroy();
            }
            return request.reply({
                body: returnValue,
                statusCode: returnStatus,
                ...options,
            });
        })
        .as("getAllParameterSource");
};
