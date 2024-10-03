import { UUID } from "uuidjs";
import type { Aircraft, AircraftInsert } from "@voloiq/logbook-api/v6";
import type { CypressParameter, InterceptorOptions, MockResponseArray } from "./MockResponse";
import { checkParamsMatches, getResponseValuesArray } from "./MockResponse";
import { parameterRegex } from "./RegexTemplates";

export const anyAircraft = (overwrites?: Partial<Aircraft>): Aircraft => ({
    id: UUID.generate(),
    productLine: "VC",
    aircraftType: "VC1-2",
    msn: "01",
    createTime: new Date().toISOString(),
    updateTime: new Date().toISOString(),
    ...overwrites,
});

export const anyAircraftInsert = (overwrites?: Partial<AircraftInsert>): AircraftInsert => ({
    productLine: "VC",
    aircraftType: "VC1-2",
    msn: "01",
    ...overwrites,
});

export const makeGetAllAircraftInterceptor = (
    expectedResponse?: MockResponseArray<Aircraft>,
    expectedParams?: CypressParameter,
    options?: InterceptorOptions<Aircraft>
) => {
    const { returnStatus, returnValue } = getResponseValuesArray<Aircraft>(anyAircraft, 200, expectedResponse);
    const getAllAircraftRegex = new RegExp(`^${BACKEND_BASE_URL}/aircraft${parameterRegex}$`, "m");
    return cy
        .intercept("GET", getAllAircraftRegex, (request) => {
            if (expectedParams && !checkParamsMatches(request.query, expectedParams)) {
                return request.destroy();
            }
            return request.reply({
                body: returnValue,
                statusCode: returnStatus,
                ...options,
            });
        })
        .as("getAllAircraft");
};
