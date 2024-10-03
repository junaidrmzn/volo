import type {
    BulkStatusCreateResponse,
    CSVImportResponse,
    Parameter,
    ParameterInsert,
    ParameterPatch,
    ParameterStatus,
    ParameterStatusInsert,
} from "@voloiq-typescript-api/fti-types";
import { isParameterInsert, isParameterPatch } from "@voloiq-typescript-api/fti-types";
import type { PathParams } from "msw";
import { rest } from "msw";
import { anyAircraft } from "./AircraftMock";
import { anyAircraftZone } from "./AircraftZoneMock";
import { anyAtaIspec } from "./AtaIspecMock";
import type { MockResponse, MockResponseArray } from "./MockResponse";
import { checkParamsMatches, getResponseValues, getResponseValuesArray } from "./MockResponse";
import { anyParameterSource } from "./ParameterSourceMock";
import { anySensorType } from "./SensorTypeMock";
import { anyUnit } from "./UnitMock";
import { anyWorkgroup } from "./WorkgroupMock";

export const anyImportParameterResponse = (overwrites?: Partial<CSVImportResponse>): CSVImportResponse => ({
    parametersCreated: 10,
    ...overwrites,
});

export const anyParameter = (overwrites?: Partial<Parameter>): Parameter => ({
    id: "d7d89c68-6590-4aed-8e10-efd2630dcd17",
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

export const makeGetAllParameterHandler = (
    expectedResponse?: MockResponseArray<Parameter>,
    expectedParams?: PathParams
) => {
    const { returnStatus, returnValue } = getResponseValuesArray<Parameter>(anyParameter, 200, expectedResponse);
    return rest.get(`${BACKEND_BASE_URL}/parameters`, (request, response, context) => {
        if (expectedParams && !checkParamsMatches(request.url.searchParams, expectedParams)) {
            return response.networkError("Params not matching");
        }
        return response(context.status(returnStatus), context.json(returnValue));
    });
};

export const makeGetParameterHandler = (expectedResponse?: MockResponse<Parameter>, expectedParams?: PathParams) => {
    const { returnStatus, returnValue } = getResponseValues<Parameter>(anyParameter, 200, expectedResponse);
    return rest.get(`${BACKEND_BASE_URL}/instrumentation-parameters/:parameterId`, (request, response, context) => {
        if (expectedParams && !checkParamsMatches(request.url.searchParams, expectedParams)) {
            return response.networkError("Params not matching");
        }
        return response(context.status(returnStatus), context.json(returnValue));
    });
};

export const makePostParameterHandler = (
    expectedResponse?: MockResponseArray<Parameter>,
    expectedParams?: PathParams
) => {
    const { returnStatus, returnValue } = getResponseValuesArray<Parameter>(anyParameter, 201, expectedResponse);
    return rest.post<ParameterInsert[]>(`${BACKEND_BASE_URL}/parameters`, (request, response, context) => {
        if (expectedParams && !checkParamsMatches(request.url.searchParams, expectedParams)) {
            return response.networkError("Params not matching");
        }
        if (
            !Array.isArray(request.body) ||
            request.body.some((insertParameter) => !isParameterInsert(insertParameter))
        ) {
            return response(context.status(400), context.json({}));
        }
        return response(context.status(returnStatus), context.json(returnValue));
    });
};

export const makePatchParameterHandler = (
    expectedResponse?: MockResponse<ParameterPatch>,
    expectedParams?: PathParams
) => {
    const { returnStatus, returnValue } = getResponseValues<Parameter>(anyParameter, 200, expectedResponse);
    return rest.patch<ParameterPatch>(
        `${BACKEND_BASE_URL}/instrumentation-parameters/:parameterId`,
        (request, response, context) => {
            if (expectedParams && !checkParamsMatches(request.url.searchParams, expectedParams)) {
                return response.networkError("Params not matching");
            }
            if (!isParameterPatch(request.body)) {
                return response(context.status(400), context.json({}));
            }
            return response(context.status(returnStatus), context.json(returnValue));
        }
    );
};

export const makeImportParameterHandler = (
    expectedResponse?: MockResponse<CSVImportResponse>,
    expectedParams?: PathParams
) => {
    const { returnStatus, returnValue } = getResponseValues<CSVImportResponse>(
        anyImportParameterResponse,
        202,
        expectedResponse
    );
    return rest.post<CSVImportResponse>(
        `${BACKEND_BASE_URL}/ftd/v2/instrumentation-parameters/csv-upload`,
        (request, response, context) => {
            if (expectedParams && !checkParamsMatches(request.url.searchParams, expectedParams)) {
                return response.networkError("Params not matching");
            }
            return response(context.status(returnStatus), context.json(returnValue));
        }
    );
};

export const makePostParameterStatusHandler = (expectedResponse?: MockResponse<ParameterStatus>) => {
    const { returnStatus, returnValue } = getResponseValues<ParameterStatus>(anyParameterStatus, 201, expectedResponse);
    return rest.post<ParameterStatusInsert>(
        `${BACKEND_BASE_URL}/instrumentation-parameters/A/status`,
        (_, response, context) => {
            return response(context.status(returnStatus), context.json(returnValue));
        }
    );
};

export const makePostParameterStatusBulkHandler = (expectedResponse?: MockResponse<BulkStatusCreateResponse>) => {
    const { returnStatus, returnValue } = getResponseValues<BulkStatusCreateResponse>(
        anyBulkStatusCreateResponse,
        201,
        expectedResponse
    );
    return rest.post<ParameterStatusInsert>(
        `${BACKEND_BASE_URL}/instrumentation-parameters/status`,
        (_, response, context) => {
            return response(context.status(returnStatus), context.json(returnValue));
        }
    );
};
