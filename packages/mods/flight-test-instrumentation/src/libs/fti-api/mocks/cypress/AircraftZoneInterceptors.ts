import type { AircraftZone } from "@voloiq-typescript-api/fti-types";
import { UUID } from "uuidjs";
import type { CypressParameter, InterceptorOptions, MockResponseArray } from "./MockResponse";
import { checkParamsMatches, getResponseValuesArray } from "./MockResponse";
import { parameterRegex } from "./RegexTemplates";

export const anyAircraftZone = (overwrites?: Partial<AircraftZone>): AircraftZone => ({
    id: UUID.generate(),
    createTime: "2022-08-02T00:00:00.000Z",
    label: "EU",
    updateTime: new Date().toISOString(),
    ...overwrites,
});

export const makeGetAllAircraftZoneInterceptor = (
    expectedResponse?: MockResponseArray<AircraftZone>,
    expectedParams?: CypressParameter,
    options?: InterceptorOptions<AircraftZone>
) => {
    const { returnStatus, returnValue } = getResponseValuesArray<AircraftZone>(anyAircraftZone, 200, expectedResponse);
    const getAllAircraftZoneRegex = new RegExp(`^${BACKEND_BASE_URL}/aircraft-zones${parameterRegex}$`, "m");
    return cy
        .intercept("GET", getAllAircraftZoneRegex, (request) => {
            if (expectedParams && !checkParamsMatches(request.query, expectedParams)) {
                return request.destroy();
            }
            return request.reply({
                body: returnValue,
                statusCode: returnStatus,
                ...options,
            });
        })
        .as("getAllAircraftZone");
};
