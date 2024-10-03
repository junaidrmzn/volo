import { UUID } from "uuidjs";
import { AircraftWithStatus } from "../../apiModels";
import {
    CypressParameter,
    InterceptorOptions,
    MockResponseArray,
    checkParamsMatches,
    getResponseValuesArrayMultipleAircrafts,
} from "./MockResponse";
import { parameterRegex } from "./RegexTemplates";

export const anyAircrafts = (overwrites?: Partial<AircraftWithStatus[]>): AircraftWithStatus[] => [
    {
        id: UUID.generate(),
        productLine: "VC",
        aircraftType: "VC1-2",
        msn: "001",
        status: "FROZEN",
        ...overwrites,
    },
    {
        id: UUID.generate(),
        productLine: "VC",
        aircraftType: "VC1-2",
        msn: "003",
        status: "CANCELLED",
        ...overwrites,
    },
    {
        id: UUID.generate(),
        productLine: "VC",
        aircraftType: "VC1-2",
        msn: "004",
        status: "RELEASED",
        ...overwrites,
    },
    {
        id: UUID.generate(),
        productLine: "VC",
        aircraftType: "VC1-2",
        msn: "005",
        status: "DRAFT",
        ...overwrites,
    },
    {
        id: UUID.generate(),
        productLine: "VC",
        aircraftType: "VC1-2",
        msn: "006",
        status: "REQUESTED",
        ...overwrites,
    },
];

export const makeGetAllAircraftsInterceptor = (
    expectedResponse?: MockResponseArray<AircraftWithStatus[]>,
    expectedParams?: CypressParameter,
    options?: InterceptorOptions<AircraftWithStatus[]>
) => {
    const { returnStatus, returnValue } = getResponseValuesArrayMultipleAircrafts<AircraftWithStatus[]>(
        anyAircrafts,
        200,
        expectedResponse
    );
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
        .as("getAllAircrafts");
};
