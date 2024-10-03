import type { Workgroup } from "@voloiq-typescript-api/fti-types";
import { UUID } from "uuidjs";
import type { CypressParameter, InterceptorOptions, MockResponseArray } from "./MockResponse";
import { checkParamsMatches, getResponseValuesArray } from "./MockResponse";
import { parameterRegex } from "./RegexTemplates";

export const anyWorkgroup = (overwrites?: Partial<Workgroup>): Workgroup => ({
    id: UUID.generate(),
    label: "Core Avionics",
    createTime: new Date().toISOString(),
    updateTime: new Date().toISOString(),
    ...overwrites,
});

export const makeGetAllWorkgroupInterceptor = (
    expectedResponse?: MockResponseArray<Workgroup>,
    expectedParams?: CypressParameter,
    options?: InterceptorOptions<Workgroup>
) => {
    const { returnStatus, returnValue } = getResponseValuesArray<Workgroup>(anyWorkgroup, 200, expectedResponse);
    const getAllWorkgroupRegex = new RegExp(`^${BACKEND_BASE_URL}/workgroups${parameterRegex}$`, "m");
    return cy
        .intercept("GET", getAllWorkgroupRegex, (request) => {
            if (expectedParams && !checkParamsMatches(request.query, expectedParams)) {
                return request.destroy();
            }
            return request.reply({
                body: returnValue,
                statusCode: returnStatus,
                ...options,
            });
        })
        .as("getAllWorkgroup");
};
