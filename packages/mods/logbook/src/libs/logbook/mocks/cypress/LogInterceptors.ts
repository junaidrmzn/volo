import { UUID } from "uuidjs";
import type { Log, LogInsert, LogPatch, LogPatchRemarks } from "@voloiq/logbook-api/v6";
import { isError } from "@voloiq/service";
import { anyAircraft } from "./AircraftInterceptors";
import { anyLocation } from "./LocationInterceptors";
import { anyLogCrewMember, anyLogCrewMemberInsert } from "./LogCrewMemberInterceptors";
import { anyLogbookFile } from "./LogbookFileInterceptors";
import type { CypressParameter, InterceptorOptions, MockResponse, MockResponseArray } from "./MockResponse";
import { checkParamsMatches, getResponseValues, getResponseValuesArray } from "./MockResponse";
import { parameterRegex, uuidRegex } from "./RegexTemplates";

export const anyLog = (overwrites?: Partial<Log>): Log => ({
    id: UUID.generate(),
    files: [anyLogbookFile()],
    date: new Date().toISOString(),
    validTo: new Date().toISOString(),
    endDate: new Date().toISOString(),
    location: anyLocation(),
    fcSoftware: "ervetbe3454gf34",
    aircraft: anyAircraft(),
    crew: [anyLogCrewMember()],
    remarks: "no remarks",
    createTime: new Date().toISOString(),
    updateTime: new Date().toISOString(),
    statistics: {
        totalFlightDuration: 372,
        maxAltitude: 26,
        maxVelocity: 8.14,
    },
    inactive: false,
    flightTestOrder: "123",
    dataState: "NO_DATA",
    ...overwrites,
});

export const anyLogInsert = (overwrites?: Partial<LogInsert>): LogInsert => ({
    date: new Date().toISOString(),
    locationId: anyLocation().id,
    aircraftId: anyAircraft().id,
    crew: [anyLogCrewMemberInsert()],
    remarks: "no remarks",
    ...overwrites,
});

export const anyLogPatch = (overwrites?: Partial<LogPatch>): LogPatch => ({
    fcSoftware: "wefsgrdhtz",
    ...overwrites,
});

export const anyLogPatchRemarks = (overwrites?: Partial<LogPatchRemarks>): LogPatchRemarks => ({
    remarks: "Hey",
    ...overwrites,
});

export const makeGetAllLogInterceptor = (
    expectedResponse?: MockResponseArray<Log>,
    expectedParams?: CypressParameter,
    options?: InterceptorOptions<Log>
) => {
    const { returnStatus, returnValue } = getResponseValuesArray<Log>(anyLog, 200, expectedResponse);
    const getAllLogRegex = new RegExp(`^${BACKEND_BASE_URL}/logs${parameterRegex}$`, "m");

    return cy
        .intercept("GET", getAllLogRegex, (request) => {
            if (expectedParams && !checkParamsMatches(request.query, expectedParams)) {
                return request.destroy();
            }
            return request.reply({
                body: returnValue,
                statusCode: returnStatus,
                ...options,
            });
        })
        .as("getAllLog");
};

export const makeGetLogInterceptor = (
    expectedResponse?: MockResponse<Log>,
    expectedParams?: CypressParameter,
    options?: InterceptorOptions<Log>
) => {
    const { returnStatus, returnValue } = getResponseValues<Log>(
        anyLog,
        isError(expectedResponse) ? 400 : 200,
        expectedResponse
    );
    const getLogRegex = new RegExp(`^${BACKEND_BASE_URL}/logs/${uuidRegex}$`, "m");
    return cy
        .intercept("GET", getLogRegex, (request) => {
            if (expectedParams && !checkParamsMatches(request.query, expectedParams)) {
                return request.destroy();
            }
            return request.reply({
                body: returnValue,
                statusCode: returnStatus,
                ...options,
            });
        })
        .as("getLog");
};

export const makePostLogInterceptor = (
    expectedResponse?: MockResponse<Log>,
    expectedParams?: CypressParameter,
    options?: InterceptorOptions<Log>
) => {
    const { returnStatus, returnValue } = getResponseValues<Log>(anyLog, 201, expectedResponse);
    const postLogRegex = new RegExp(`^${BACKEND_BASE_URL}/logs$`, "m");

    return cy
        .intercept("POST", postLogRegex, (request) => {
            if (expectedParams && !checkParamsMatches(request.query, expectedParams)) {
                return request.destroy();
            }
            return request.reply({
                body: returnValue,
                statusCode: returnStatus,
                ...options,
            });
        })
        .as("postLog");
};

export const makeDeleteLogInterceptor = (expectedParams?: CypressParameter, options?: InterceptorOptions<null>) => {
    const deleteLogRegex = new RegExp(`^${BACKEND_BASE_URL}/logs/${uuidRegex}$`, "m");
    return cy
        .intercept("DELETE", deleteLogRegex, (request) => {
            if (expectedParams && !checkParamsMatches(request.query, expectedParams)) {
                return request.destroy();
            }
            return request.reply({
                statusCode: 200,
                ...options,
            });
        })
        .as("deleteLog");
};

export const makePatchLogInterceptor = (
    expectedResponse?: MockResponse<Log>,
    expectedParams?: CypressParameter,
    options?: InterceptorOptions<Log>
) => {
    const { returnStatus, returnValue } = getResponseValues<Log>(anyLog, 200, expectedResponse);
    const patchLogRegex = new RegExp(`^${BACKEND_BASE_URL}/logs/${uuidRegex}$`, "m");
    return cy
        .intercept("PATCH", patchLogRegex, (request) => {
            if (expectedParams && !checkParamsMatches(request.query, expectedParams)) {
                return request.destroy();
            }
            return request.reply({
                body: returnValue,
                statusCode: returnStatus,
                ...options,
            });
        })
        .as("patchLog");
};
