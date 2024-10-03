import type { BulkStatusCreateResponse, CSVImportResponse, ParameterStatus } from "@voloiq-typescript-api/fti-types";
import { isParameterPatch } from "@voloiq-typescript-api/fti-types";
import { UUID } from "uuidjs";
import type { Error } from "@voloiq/service";
import { Parameter, ParameterPatch } from "../../apiModels";
import { anyAircrafts } from "./AircraftInterceptors";
import { anyAircraftZone } from "./AircraftZoneInterceptors";
import { anyAtaIspec } from "./AtaIspecInterceptor";
import type { CypressParameter, InterceptorOptions, MockResponse, MockResponseArray } from "./MockResponse";
import { checkParamsMatches, getResponseValues, getResponseValuesArray } from "./MockResponse";
import { anyParameterSource } from "./ParameterSourceInterceptors";
import { parameterRegex, uuidRegex } from "./RegexTemplates";
import { anySensorType } from "./SensorTypeInterceptor";
import { anyUnit } from "./UnitInterceptors";
import { anyWorkgroup } from "./WorkGroupInterceptors";

export const anyImportParameterResponse = (overwrites?: Partial<CSVImportResponse>): CSVImportResponse => ({
    parametersCreated: 10,
    ...overwrites,
});

export const anyParameter = (overwrites?: Partial<Parameter>): Parameter => ({
    id: UUID.generate(),
    aircrafts: anyAircrafts(),
    ataIspec: anyAtaIspec(),
    workgroup: anyWorkgroup(),
    parameterSource: anyParameterSource(),
    aircraftZone: anyAircraftZone(),
    sensorType: anySensorType(),
    shortDescription: "this is a short description",
    status: "DRAFT",
    description: "18 rotors baby!",
    unit: anyUnit(),
    minValue: 2,
    maxValue: 500,
    accuracy: 3,
    ftiCode: "123",
    minimumSamplingFrequency: 100,
    createTime: "2022-08-22T13:01:18.628Z",
    updateTime: "2022-08-22T13:01:18.628Z",
    requesterEmail: "john.doe@gmail.com",
    requesterName: "John Doe",
    inactive: false,
    validTo: "2022-08-22T13:01:18.628Z",
    ...overwrites,
});

export const anyParameterStatus = (overwrites?: Partial<ParameterStatus>): ParameterStatus => ({
    status: "REQUESTED",
    parameterId: "095d2699-3aff-4383-92e4-cd964e75e2bb",
    validTo: "2022-08-22T13:01:18.628Z",
    validFrom: "2022-08-22T13:01:18.628Z",
    ...overwrites,
});

export const anyBulkStatusCreateResponse = (
    overwrites?: Partial<BulkStatusCreateResponse>
): BulkStatusCreateResponse => ({
    statusCreated: 2,
    ...overwrites,
});

export const makeGetAllParameterInterceptor = (
    expectedResponse?: MockResponseArray<Parameter>,
    expectedParams?: CypressParameter,
    options?: InterceptorOptions<Parameter>
) => {
    const { returnStatus, returnValue } = getResponseValuesArray<Parameter>(anyParameter, 200, expectedResponse);
    const getAllParameterRegex = new RegExp(
        `^${BACKEND_BASE_URL}/ftd/v[0-9]/instrumentation-parameters${parameterRegex}$`,
        "m"
    );
    return cy
        .intercept("GET", getAllParameterRegex, (request) => {
            if (expectedParams && !checkParamsMatches(request.query, expectedParams)) {
                return request.destroy();
            }
            return request.reply({
                body: returnValue,
                statusCode: returnStatus,
                ...options,
            });
        })
        .as("getAllParameter");
};

export const makeGetParameterInterceptor = (
    expectedResponse?: MockResponse<Parameter>,
    expectedParams?: CypressParameter,
    options?: InterceptorOptions<Parameter>
) => {
    const { returnStatus, returnValue } = getResponseValues<Parameter>(anyParameter, 200, expectedResponse);
    const getParameterRegex = new RegExp(
        `^${BACKEND_BASE_URL}/ftd/v[0-9]/instrumentation-parameters/${uuidRegex}$`,
        "m"
    );
    return cy
        .intercept("GET", getParameterRegex, (request) => {
            if (expectedParams && !checkParamsMatches(request.query, expectedParams)) {
                return request.destroy();
            }
            return request.reply({
                body: returnValue,
                statusCode: returnStatus,
                ...options,
            });
        })
        .as("getParameter");
};

export const makePostParameterInterceptor = (
    expectedResponse?: MockResponseArray<Parameter>,
    expectedParams?: CypressParameter,
    options?: InterceptorOptions<Parameter>
) => {
    const { returnStatus, returnValue } = getResponseValuesArray<Parameter>(anyParameter, 201, expectedResponse);
    const postParameterRegex = new RegExp(
        `^${BACKEND_BASE_URL}/ftd/v[0-9]/instrumentation-parameters${parameterRegex}$`,
        "m"
    );
    return cy
        .intercept("POST", postParameterRegex, (request) => {
            if (expectedParams && !checkParamsMatches(request.query, expectedParams)) {
                return request.destroy();
            }
            return request.reply({
                body: returnValue,
                statusCode: returnStatus,
                ...options,
            });
        })
        .as("postParameter");
};

export const makePostParameterImportInterceptor = (
    expectedResponse?: MockResponseArray<Parameter>,
    expectedParams?: CypressParameter,
    options?: InterceptorOptions<Parameter>
) => {
    const { returnStatus, returnValue } = getResponseValuesArray<Parameter>(anyParameter, 201, expectedResponse);
    const postImportCSVParameterRegex = new RegExp(
        `^${BACKEND_BASE_URL}/ftd/v[0-9]/instrumentation-parameters/csv-upload`,
        "m"
    );
    return cy
        .intercept("POST", postImportCSVParameterRegex, (request) => {
            if (expectedParams && !checkParamsMatches(request.query, expectedParams)) {
                return request.destroy();
            }
            return request.reply({
                body: returnValue,
                statusCode: returnStatus,
                ...options,
            });
        })
        .as("postParameterImportCSV");
};

export const makePatchParameterInterceptor = (
    expectedResponse?: MockResponse<ParameterPatch>,
    expectedParams?: CypressParameter,
    options?: InterceptorOptions<Parameter>
) => {
    const { returnStatus, returnValue } = getResponseValues<Parameter>(anyParameter, 200, expectedResponse);
    const patchParameterRegex = new RegExp(
        `^${BACKEND_BASE_URL}/ftd/v[0-9]/instrumentation-parameters/${uuidRegex}$`,
        "m"
    );
    return cy
        .intercept("PATCH", patchParameterRegex, (request) => {
            if (expectedParams && !checkParamsMatches(request.query, expectedParams)) {
                return request.destroy();
            }
            if (!isParameterPatch(request.body)) {
                const errorObject: Error = {
                    status: "INVALID_ARGUMENT",
                    code: 400,
                    timestamp: new Date().toISOString(),
                    id: "errorId",
                    message: "not a patch parameter",
                };
                return request.reply(400, { error: errorObject });
            }
            return request.reply({
                body: returnValue,
                statusCode: returnStatus,
                ...options,
            });
        })
        .as("patchParameter");
};

export const makeImportParameterInterceptor = (
    expectedResponse?: MockResponse<CSVImportResponse>,
    expectedParams?: CypressParameter,
    options?: InterceptorOptions<Parameter>
) => {
    const { returnStatus, returnValue } = getResponseValues<CSVImportResponse>(
        anyImportParameterResponse,
        202,
        expectedResponse
    );
    const postImportParameterRegex = new RegExp(
        `^${BACKEND_BASE_URL}/ftd/v[0-9]/instrumentation-parameters/csv-upload${parameterRegex}$`,
        "m"
    );
    return cy
        .intercept("POST", postImportParameterRegex, (request) => {
            if (expectedParams && !checkParamsMatches(request.query, expectedParams)) {
                return request.destroy();
            }
            return request.reply({
                body: returnValue,
                statusCode: returnStatus,
                ...options,
            });
        })
        .as("postImportParameter");
};

export const makePostParameterStatusInterceptor = (
    expectedResponse?: MockResponse<ParameterStatus>,
    options?: InterceptorOptions<ParameterStatus>
) => {
    const { returnStatus, returnValue } = getResponseValues<ParameterStatus>(anyParameterStatus, 201, expectedResponse);
    const postParameterStatusRegex = new RegExp(
        `^${BACKEND_BASE_URL}/ftd/v[0-9]/instrumentation-parameters/${uuidRegex}/status$`,
        "m"
    );
    return cy
        .intercept("POST", postParameterStatusRegex, (request) => {
            return request.reply({
                body: returnValue,
                statusCode: returnStatus,
                ...options,
            });
        })
        .as("postParameterStatus");
};

export const makePatchParameterStatusInterceptor = (
    expectedResponse?: MockResponse<ParameterPatch>,
    expectedParams?: CypressParameter,
    options?: InterceptorOptions<Parameter>
) => {
    const { returnStatus, returnValue } = getResponseValues<Parameter>(anyParameter, 200, expectedResponse);
    const patchParameterRegex = new RegExp(
        `^${BACKEND_BASE_URL}/ftd/v[0-9]/instrumentation-parameters/${uuidRegex}/aircraft/${uuidRegex}$`,
        "m"
    );
    return cy
        .intercept("PATCH", patchParameterRegex, (request) => {
            return request.reply({
                body: returnValue,
                statusCode: returnStatus,
                ...options,
            });
        })
        .as("patchParameterStatus");
};

export const makePostParameterStatusBulkInterceptor = (
    expectedResponse?: MockResponse<BulkStatusCreateResponse>,
    options?: InterceptorOptions<BulkStatusCreateResponse>
) => {
    const { returnStatus, returnValue } = getResponseValues<BulkStatusCreateResponse>(
        anyBulkStatusCreateResponse,
        201,
        expectedResponse
    );
    const postParameterStatusBulkRegex = new RegExp(
        `^${BACKEND_BASE_URL}/ftd/v[0-9]/instrumentation-parameters/status$`,
        "m"
    );
    return cy
        .intercept("POST", postParameterStatusBulkRegex, (request) => {
            return request.reply({
                body: returnValue,
                statusCode: returnStatus,
                ...options,
            });
        })
        .as("postParameterStatusBulk");
};
