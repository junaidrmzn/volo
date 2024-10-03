import type {
    AircraftZone,
    AtaIspec,
    BulkStatusCreateResponse,
    CSVImportResponse,
    Parameter,
    ParameterInsert,
    ParameterPatch,
    ParameterSource,
    ParameterStatus,
    SensorType,
    Unit,
    Workgroup,
} from "@voloiq-typescript-api/fti-types";
import { isParameterInsert, isParameterPatch } from "@voloiq-typescript-api/fti-types";
import { UUID } from "uuidjs";
import type { Error } from "@voloiq/service";
import { anyAircraft } from "./AircraftInterceptors";
import type { CypressParameter, InterceptorOptions, MockResponse, MockResponseArray } from "./MockResponse";
import { checkParamsMatches, getResponseValues, getResponseValuesArray } from "./MockResponse";
import { parameterRegex, uuidRegex } from "./RegexTemplates";

export const anyImportParameterResponse = (overwrites?: Partial<CSVImportResponse>): CSVImportResponse => ({
    parametersCreated: 10,
    ...overwrites,
});

export const anyWorkgroup = (overwrites?: Partial<Workgroup>): Workgroup => ({
    id: UUID.generate(),
    label: "Core Avionics",
    createTime: new Date().toISOString(),
    updateTime: new Date().toISOString(),
    ...overwrites,
});

export const anyUnit = (overwrites?: Partial<Unit>): Unit => ({
    id: UUID.generate(),
    label: "m/s",
    createTime: new Date().toISOString(),
    updateTime: new Date().toISOString(),
    ...overwrites,
});

export const anySensorType = (overwrites?: Partial<SensorType>): SensorType => ({
    id: UUID.generate(),
    label: "Temperature",
    updateTime: new Date().toISOString(),
    createTime: new Date().toISOString(),
    ...overwrites,
});

export const anyAtaIspec = (overwrites?: Partial<AtaIspec>): AtaIspec => ({
    id: UUID.generate(),
    label: "spec",
    createTime: new Date().toISOString(),
    updateTime: new Date().toISOString(),
    ...overwrites,
});

export const anyAircraftZone = (overwrites?: Partial<AircraftZone>): AircraftZone => ({
    id: UUID.generate(),
    createTime: "2022-08-02T00:00:00.000Z",
    label: "EU",
    updateTime: new Date().toISOString(),
    ...overwrites,
});

export const anyParameterSource = (overwrites?: Partial<ParameterSource>): ParameterSource => ({
    id: UUID.generate(),
    createTime: "2022-08-02T00:00:00.000Z",
    label: "Source",
    updateTime: new Date().toISOString(),
    ...overwrites,
});

export const anyParameter = (overwrites?: Partial<Parameter>): Parameter => ({
    id: UUID.generate(),
    aircraft: anyAircraft(),
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

export const anyParameterPatch = (overwrites?: Partial<ParameterPatch>): ParameterPatch => ({
    aircraftId: anyAircraft().id,
    ataIspecId: anyAtaIspec().id,
    workgroupId: anyWorkgroup().id,
    parameterSourceId: anyParameterSource().id,
    aircraftZoneId: anyAircraftZone().id,
    sensorTypeId: anySensorType().id,
    shortDescription: "this is a short description",
    description: "18 rotors baby!",
    unitId: anyUnit().id,
    minValue: 2,
    maxValue: 500,
    accuracy: 3,
    minimumSamplingFrequency: 100,
    ...overwrites,
});

export const anyParameterInsert = (overwrites?: Partial<ParameterInsert>): ParameterInsert => ({
    aircraftId: anyAircraft().id,
    aircraftZoneId: anyAircraftZone().id,
    ataIspecId: anyAtaIspec().id,
    parameterSourceId: anyParameterSource().id,
    sensorTypeId: anySensorType().id,
    workgroupId: anyWorkgroup().id,
    shortDescription: "this is a short description",
    description: "18 rotors baby!",
    minValue: 2,
    maxValue: 500,
    accuracy: 3,
    unitId: anyUnit().id,
    minimumSamplingFrequency: 100,
    requesterEmail: "john.doe@gmail.com",
    requesterName: "John Doe",
    ...overwrites,
});

export const anyParameterStatus = (overwrites?: Partial<ParameterStatus>): ParameterStatus => ({
    status: "REQUESTED",
    parameterId: UUID.generate(),
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

export const makeGetAllInstrumentationParametersInterceptor = (
    expectedResponse?: MockResponseArray<Parameter>,
    expectedParams?: CypressParameter,
    options?: InterceptorOptions<Parameter>
) => {
    const { returnStatus, returnValue } = getResponseValuesArray<Parameter>(anyParameter, 200, expectedResponse);
    const getAllParameterRegex = new RegExp(
        `^${BACKEND_BASE_URL}/ftd/v1/instrumentation-parameters${parameterRegex}$`,
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
        .as("getAllInstrumentationParameters");
};

export const makeGetInstrumentationParameterInterceptor = (
    expectedResponse?: MockResponse<Parameter>,
    expectedParams?: CypressParameter,
    options?: InterceptorOptions<Parameter>
) => {
    const { returnStatus, returnValue } = getResponseValues<Parameter>(anyParameter, 200, expectedResponse);
    const getParameterRegex = new RegExp(`^${BACKEND_BASE_URL}/ftd/v1/instrumentation-parameters/${uuidRegex}$`, "m");
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
        .as("getInstrumentationParameter");
};

export const makePostInstrumentationParameterInterceptor = (
    expectedResponse?: MockResponseArray<Parameter>,
    expectedParams?: CypressParameter,
    options?: InterceptorOptions<Parameter>
) => {
    const { returnStatus, returnValue } = getResponseValuesArray<Parameter>(anyParameter, 201, expectedResponse);
    const postParameterRegex = new RegExp(
        `^${BACKEND_BASE_URL}/ftd/v1/instrumentation-parameters${parameterRegex}$`,
        "m"
    );
    return cy
        .intercept("POST", postParameterRegex, (request) => {
            if (expectedParams && !checkParamsMatches(request.query, expectedParams)) {
                return request.destroy();
            }
            if (
                !Array.isArray(request.body) ||
                request.body.some((insertParameter) => !isParameterInsert(insertParameter))
            ) {
                const errorObject: Error = {
                    status: "INVALID_ARGUMENT",
                    code: 400,
                    timestamp: new Date().toISOString(),
                    id: "errorId",
                    message: "not a insert parameter",
                };
                return request.reply(400, errorObject);
            }
            return request.reply({
                body: returnValue,
                statusCode: returnStatus,
                ...options,
            });
        })
        .as("postInstrumentationParameter");
};

export const makePatchInstrumentationParameterInterceptor = (
    expectedResponse?: MockResponse<ParameterPatch>,
    expectedParams?: CypressParameter,
    options?: InterceptorOptions<Parameter>
) => {
    const { returnStatus, returnValue } = getResponseValues<Parameter>(anyParameter, 200, expectedResponse);
    const patchParameterRegex = new RegExp(`^${BACKEND_BASE_URL}/ftd/v1/instrumentation-parameters/${uuidRegex}$`, "m");
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
        .as("patchInstrumentationParameter");
};

export const makeImportInstrumentationParameterInterceptor = (
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
        `^${BACKEND_BASE_URL}/ftd/v1/instrumentation-parameters/csv-upload${parameterRegex}$`,
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
        .as("postImportInstrumentationParameter");
};

export const makePostInstrumentationParameterStatusInterceptor = (
    expectedResponse?: MockResponse<ParameterStatus>,
    options?: InterceptorOptions<ParameterStatus>
) => {
    const { returnStatus, returnValue } = getResponseValues<ParameterStatus>(anyParameterStatus, 201, expectedResponse);
    const postParameterStatusRegex = new RegExp(
        `^${BACKEND_BASE_URL}/ftd/v1/instrumentation-parameters/${uuidRegex}/status$`,
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
        .as("postInstrumentationParameterStatus");
};

export const makePostInstrumentationParameterStatusBulkInterceptor = (
    expectedResponse?: MockResponse<BulkStatusCreateResponse>,
    options?: InterceptorOptions<BulkStatusCreateResponse>
) => {
    const { returnStatus, returnValue } = getResponseValues<BulkStatusCreateResponse>(
        anyBulkStatusCreateResponse,
        201,
        expectedResponse
    );
    const postParameterStatusBulkRegex = new RegExp(
        `^${BACKEND_BASE_URL}/ftd/v1/instrumentation-parameters/status$`,
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
        .as("postInstrumentationParameterStatusBulk");
};
