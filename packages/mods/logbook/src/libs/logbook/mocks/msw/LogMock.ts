import type { PathParams } from "msw";
import { rest } from "msw";
import type { Log, LogInsert, LogPatch, LogPatchRemarks } from "@voloiq/logbook-api/v6";
import { isError } from "@voloiq/service";
import { anyAircraft } from "./AircraftMock";
import { anyLocation } from "./LocationMock";
import { anyLogCrewMember, anyLogCrewMemberInsert } from "./LogCrewMemberMock";
import { anyLogbookFile } from "./LogbookFileMock";
import type { MockResponse, MockResponseArray } from "./MockResponse";
import { checkParamsMatches, getResponseValues, getResponseValuesArray } from "./MockResponse";

export const anyLog = (overwrites?: Partial<Log>): Log => ({
    id: "sdhrgedrhtrnrvewc",
    files: [anyLogbookFile()],
    date: new Date().toISOString(),
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

export const makeGetAllLogHandler = (expectedResponse?: MockResponseArray<Log>, expectedParams?: PathParams) => {
    const { returnStatus, returnValue } = getResponseValuesArray<Log>(anyLog, 200, expectedResponse);
    return rest.get(`${BACKEND_BASE_URL}/logs`, (request, response, context) => {
        if (expectedParams && !checkParamsMatches(request.url.searchParams, expectedParams)) {
            return response.networkError("Params not matching");
        }
        return response(context.status(returnStatus), context.json(returnValue));
    });
};

export const makeGetLogHandler = (expectedResponse?: MockResponse<Log>, expectedParams?: PathParams) => {
    const { returnStatus, returnValue } = getResponseValues<Log>(
        anyLog,
        isError(expectedResponse) ? 400 : 200,
        expectedResponse
    );
    return rest.get(`${BACKEND_BASE_URL}/logs/:logId`, (request, response, context) => {
        if (expectedParams && !checkParamsMatches(request.url.searchParams, expectedParams)) {
            return response.networkError("Params not matching");
        }
        return response(context.status(returnStatus), context.json(returnValue));
    });
};

export const makePostLogHandler = (expectedResponse?: MockResponse<Log>, expectedParams?: PathParams) => {
    const { returnStatus, returnValue } = getResponseValues<Log>(anyLog, 201, expectedResponse);
    return rest.post(`${BACKEND_BASE_URL}/logs`, (request, response, context) => {
        if (expectedParams && !checkParamsMatches(request.url.searchParams, expectedParams)) {
            return response.networkError("Params not matching");
        }
        return response(context.status(returnStatus), context.json(returnValue));
    });
};

export const makeDeleteLogHandler = (expectedParams?: PathParams) => {
    return rest.delete(`${BACKEND_BASE_URL}/logs/:logId`, (request, response, context) => {
        if (expectedParams && !checkParamsMatches(request.url.searchParams, expectedParams)) {
            return response.networkError("Params not matching");
        }
        return response(context.status(200));
    });
};

export const makePatchLogHandler = (expectedResponse?: MockResponse<Log>, expectedParams?: PathParams) => {
    const { returnStatus, returnValue } = getResponseValues<Log>(anyLog, 200, expectedResponse);
    return rest.patch(`${BACKEND_BASE_URL}/logs/:logId`, (request, response, context) => {
        if (expectedParams && !checkParamsMatches(request.url.searchParams, expectedParams)) {
            return response.networkError("Params not matching");
        }
        return response(context.status(returnStatus), context.json(returnValue));
    });
};

export const makePatchLogRemarksHandler = (expectedResponse?: MockResponse<Log>, expectedParams?: PathParams) => {
    const { returnStatus, returnValue } = getResponseValues<Log>(anyLog, 200, expectedResponse);
    return rest.patch(`${BACKEND_BASE_URL}/logs/:logId`, (request, response, context) => {
        if (expectedParams && !checkParamsMatches(request.url.searchParams, expectedParams)) {
            return response.networkError("Params not matching");
        }
        return response(context.status(returnStatus), context.json(returnValue));
    });
};
