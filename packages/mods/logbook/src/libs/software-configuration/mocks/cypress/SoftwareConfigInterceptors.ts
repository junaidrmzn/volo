import { UUID } from "uuidjs";
import type { SoftwareConfig } from "@voloiq/logbook-api/v6";
import type {
    CypressParameter,
    InterceptorOptions,
    MockResponse,
    MockResponseArray,
} from "../../../logbook/mocks/cypress/MockResponse";
import { checkParamsMatches } from "../../../logbook/mocks/cypress/MockResponse";
import { parameterRegex, uuidRegex } from "../../../logbook/mocks/cypress/RegexTemplates";
import { getResponseValues, getResponseValuesArray } from "../msw/MockResponse";

export const anySoftwareConfig = (overwrites?: Partial<SoftwareConfig>): SoftwareConfig => ({
    id: UUID.generate(),
    configType: "FC",
    gitHash: "5b94647",
    createTime: new Date().toISOString(),
    updateTime: new Date().toISOString(),
    validTo: new Date().toISOString(),
    inactive: false,
    ...overwrites,
});

export const anySoftwareConfigFile = (): Blob => new Blob(["test blob"], { type: "application/octet-stream" });

export const makeGetAllSoftwareConfigInterceptor = (
    expectedResponse?: MockResponseArray<SoftwareConfig>,
    expectedParams?: CypressParameter,
    options?: InterceptorOptions<SoftwareConfig>
) => {
    const { returnStatus, returnValue } = getResponseValuesArray<SoftwareConfig>(
        anySoftwareConfig,
        200,
        expectedResponse
    );
    const getAllSoftwareConfigRegex = new RegExp(`^${BACKEND_BASE_URL}/software-configs${parameterRegex}$`, "m");

    return cy
        .intercept("GET", getAllSoftwareConfigRegex, (request) => {
            if (expectedParams && !checkParamsMatches(request.query, expectedParams)) {
                return request.destroy();
            }
            return request.reply({
                body: returnValue,
                statusCode: returnStatus,
                ...options,
            });
        })
        .as("getAllSoftwareConfig");
};

export const makeGetSoftwareConfigInterceptor = (
    expectedResponse?: MockResponse<SoftwareConfig>,
    expectedParams?: CypressParameter,
    options?: InterceptorOptions<SoftwareConfig>
) => {
    const { returnStatus, returnValue } = getResponseValues<SoftwareConfig>(anySoftwareConfig, 200, expectedResponse);
    const getSoftwareConfigRegex = new RegExp(`^${BACKEND_BASE_URL}/software-configs/${uuidRegex}$`, "m");
    return cy
        .intercept("GET", getSoftwareConfigRegex, (request) => {
            if (expectedParams && !checkParamsMatches(request.query, expectedParams)) {
                return request.destroy();
            }
            return request.reply({
                body: returnValue,
                statusCode: returnStatus,
                ...options,
            });
        })
        .as("getSoftwareConfig");
};

export const makePostSoftwareConfigInterceptor = (
    expectedResponse?: MockResponse<SoftwareConfig>,
    expectedParams?: CypressParameter,
    options?: InterceptorOptions<SoftwareConfig>
) => {
    const { returnStatus, returnValue } = getResponseValues<SoftwareConfig>(anySoftwareConfig, 201, expectedResponse);
    const postSoftwareConfigRegex = new RegExp(`^${BACKEND_BASE_URL}/software-configs$`, "m");

    return cy
        .intercept("POST", postSoftwareConfigRegex, (request) => {
            if (expectedParams && !checkParamsMatches(request.query, expectedParams)) {
                return request.destroy();
            }
            return request.reply({
                body: returnValue,
                statusCode: returnStatus,
                ...options,
            });
        })
        .as("postSoftwareConfig");
};

export const makeDeleteSoftwareConfigInterceptor = (
    expectedParams?: CypressParameter,
    options?: InterceptorOptions<null>
) => {
    const deleteSoftwareConfigRegex = new RegExp(`^${BACKEND_BASE_URL}/software-configs/${uuidRegex}$`, "m");
    return cy
        .intercept("DELETE", deleteSoftwareConfigRegex, (request) => {
            if (expectedParams && !checkParamsMatches(request.query, expectedParams)) {
                return request.destroy();
            }
            return request.reply({
                statusCode: 200,
                ...options,
            });
        })
        .as("deleteSoftwareConfig");
};

export const makeGetSoftwareConfigFileInterceptor = (
    expectedResponse?: MockResponse<Blob>,
    expectedParams?: CypressParameter,
    options?: InterceptorOptions<SoftwareConfig>
) => {
    const { returnStatus, returnValue } = getResponseValues<Blob>(anySoftwareConfigFile, 200, expectedResponse);
    const getSoftwareConfigFileRegex = new RegExp(`^${BACKEND_BASE_URL}/software-configs/${uuidRegex}/file$`, "m");
    return cy
        .intercept("GET", getSoftwareConfigFileRegex, (request) => {
            if (expectedParams && !checkParamsMatches(request.query, expectedParams)) {
                return request.destroy();
            }
            return request.reply({
                body: returnValue,
                statusCode: returnStatus,
                headers: {
                    "content-type": "application/octet-stream",
                    "content-disposition": 'inline; filename="fcvar_dfergeregr.h"',
                },
                ...options,
            });
        })
        .as("getSoftwareConfigFile");
};
