import type { Unit } from "@voloiq-typescript-api/fti-types";
import { UUID } from "uuidjs";
import type { CypressParameter, InterceptorOptions, MockResponseArray } from "./MockResponse";
import { checkParamsMatches, getResponseValuesArray } from "./MockResponse";
import { parameterRegex } from "./RegexTemplates";

export const anyUnit = (overwrites?: Partial<Unit>): Unit => ({
    id: UUID.generate(),
    label: "m/s",
    createTime: new Date().toISOString(),
    updateTime: new Date().toISOString(),
    ...overwrites,
});

export const makeGetAllUnitsInterceptor = (
    expectedResponse?: MockResponseArray<Unit>,
    expectedParams?: CypressParameter,
    options?: InterceptorOptions<Unit>
) => {
    const { returnStatus, returnValue } = getResponseValuesArray<Unit>(anyUnit, 200, expectedResponse);
    const getAllUnitsRegex = new RegExp(`^${BACKEND_BASE_URL}/units${parameterRegex}$`, "m");
    return cy
        .intercept("GET", getAllUnitsRegex, (request) => {
            if (expectedParams && !checkParamsMatches(request.query, expectedParams)) {
                return request.destroy();
            }
            return request.reply({
                body: returnValue,
                statusCode: returnStatus,
                ...options,
            });
        })
        .as("getAllUnits");
};
