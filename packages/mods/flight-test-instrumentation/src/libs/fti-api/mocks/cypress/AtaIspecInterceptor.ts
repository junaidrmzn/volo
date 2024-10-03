import type { AtaIspec } from "@voloiq-typescript-api/fti-types";
import { UUID } from "uuidjs";
import type { CypressParameter, InterceptorOptions, MockResponseArray } from "./MockResponse";
import { checkParamsMatches, getResponseValuesArray } from "./MockResponse";
import { parameterRegex } from "./RegexTemplates";

export const anyAtaIspec = (overwrites?: Partial<AtaIspec>): AtaIspec => ({
    id: UUID.generate(),
    label: "spec",
    createTime: new Date().toISOString(),
    updateTime: new Date().toISOString(),
    ...overwrites,
});

export const makeGetAllAtaIspecsInterceptor = (
    expectedResponse?: MockResponseArray<AtaIspec>,
    expectedParams?: CypressParameter,
    options?: InterceptorOptions<AtaIspec>
) => {
    const { returnStatus, returnValue } = getResponseValuesArray<AtaIspec>(anyAtaIspec, 200, expectedResponse);
    const getAllAtaIspecsRegex = new RegExp(`^${BACKEND_BASE_URL}/ata-ispecs${parameterRegex}$`, "m");
    return cy
        .intercept("GET", getAllAtaIspecsRegex, (request) => {
            if (expectedParams && !checkParamsMatches(request.query, expectedParams)) {
                return request.destroy();
            }
            return request.reply({
                body: returnValue,
                statusCode: returnStatus,
                ...options,
            });
        })
        .as("getAllAtaIspecs");
};
