import { AircraftType, Aircraft as _Aircraft } from "@voloiq-typescript-api/aircraft-management-types";
import type {
    Aircraft,
    MissionAssignment,
    MissionDivert,
    MissionResource,
} from "@voloiq-typescript-api/network-scheduling-types";
import type { Region, Vertiport } from "@voloiq-typescript-api/vertiport-management-types";
import type {
    CancellationCode,
    DelayCode,
    FlightTimeLimitation,
    GroundEvent,
    Mission,
} from "@voloiq/network-schedule-management-api/v1";
import { anyAircraft } from "../../lib/test-fixtures/anyAircraft";
import { anyMission } from "../../lib/test-fixtures/anyMission";
import { anyMissionAssignment } from "../../lib/test-fixtures/anyMissionAssignment";
import { anyMissionResource } from "../../lib/test-fixtures/anyMissionResources";
import { anyVertiport } from "../../lib/test-fixtures/anyVertiport";
import { BASE_URL, PARAMETER_REGEX, UUID_REGEX } from "./regex";

export const missionsListWithEntriesInterceptor = (missions: Mission[]) =>
    cy
        .intercept("GET", new RegExp(`${BASE_URL}/v1/network-scheduling-management/missions${PARAMETER_REGEX}$`), {
            statusCode: 200,
            body: {
                data: missions,
            },
        })
        .as("missionsListWithEntriesInterceptor");

export const getMissionInterceptor = (mission: Mission = anyMission()) =>
    cy
        .intercept("GET", new RegExp(`${BASE_URL}/v1/network-scheduling-management/missions/${UUID_REGEX}$`), {
            statusCode: 200,
            body: {
                data: mission,
            },
        })
        .as("getMissionInterceptor");

export const createMessageInterceptor = () =>
    cy.intercept("POST", new RegExp(`${BASE_URL}/v1/network-scheduling-management/missions/${UUID_REGEX}/message$`), {
        statusCode: 200,
    });

export const availableAircraftsListInterceptor = (aircrafts: Aircraft[]) =>
    cy.intercept(
        "GET",
        new RegExp(
            `${BASE_URL}/v1/network-scheduling-management/missions/${UUID_REGEX}/availability/aircraft${PARAMETER_REGEX}$`
        ),
        {
            statusCode: 200,
            body: {
                data: aircrafts,
            },
        }
    );

export const aircraftAssignmentInterceptor = (assignments?: MissionAssignment) =>
    cy.intercept(
        "PUT",
        new RegExp(
            `${BASE_URL}/v1/network-scheduling-management/missions/assignments/${UUID_REGEX}/aircraft/${UUID_REGEX}${PARAMETER_REGEX}$`
        ),
        {
            statusCode: 200,
            body: {
                data: assignments,
            },
        }
    );

export const getAircraftAssignmentsInterceptor = (assignments: MissionAssignment[]) =>
    cy.intercept(
        "GET",
        new RegExp(
            `${BASE_URL}/v1/network-scheduling-management/missions/assignments/${UUID_REGEX}/aircraft/${UUID_REGEX}${PARAMETER_REGEX}$`
        ),
        {
            statusCode: 200,
            body: {
                data: assignments,
            },
        }
    );

export const pilotAssignmentInterceptor = (assignments: MissionAssignment = anyMissionAssignment()) =>
    cy.intercept(
        "PUT",
        new RegExp(
            `${BASE_URL}/v1/network-scheduling-management/missions/assignments/${UUID_REGEX}/pilot/${UUID_REGEX}${PARAMETER_REGEX}$`
        ),
        {
            statusCode: 200,
            body: {
                data: assignments,
            },
        }
    );

export const crewMemberAssignmentInterceptor = () =>
    cy.intercept(
        "PUT",
        new RegExp(
            `${BASE_URL}/v1/network-scheduling-management/missions/assignments/${UUID_REGEX}/crew${PARAMETER_REGEX}$`
        ),
        {
            statusCode: 200,
        }
    );

export const missionUpdateInterceptor = () =>
    cy.intercept("PATCH", new RegExp(`${BASE_URL}/v1/network-scheduling-management/missions/${UUID_REGEX}$`), {
        statusCode: 200,
    });

export const getAllVertiportsInterceptor = (vertiports: Vertiport[]) =>
    cy
        .intercept("GET", new RegExp(`${BASE_URL}/v1/network-scheduling-management/vertiports${PARAMETER_REGEX}$`), {
            statusCode: 200,
            body: {
                data: vertiports,
            },
        })
        .as("getAllVertiportInterceptor");

export const getVertiportInterceptor = (vertiport: Vertiport = anyVertiport()) =>
    cy
        .intercept("GET", new RegExp(`${BASE_URL}/v1/network-scheduling-management/vertiports/${UUID_REGEX}$`), {
            statusCode: 200,
            body: {
                data: vertiport,
            },
        })
        .as("getVertiportInterceptor");

export const addMissionInterceptor = (mission: Mission) =>
    cy
        .intercept("POST", new RegExp(`${BASE_URL}/v1/network-scheduling-management/missions$`), {
            statusCode: 201,
            body: {
                data: mission,
            },
        })
        .as("addMissionInterceptor");

export const cancelMissionInterceptor = (mission: Mission) =>
    cy
        .intercept("PUT", new RegExp(`${BASE_URL}/v1/network-scheduling-management/missions/${UUID_REGEX}/cancel$`), {
            statusCode: 200,
            body: {
                data: mission,
            },
        })
        .as("cancelMissionInterceptor");

export const acceptMissionInterceptor = (mission: Mission = anyMission()) =>
    cy
        .intercept(
            "PATCH",
            new RegExp(
                `${BASE_URL}/v1/network-scheduling-management/missions/${UUID_REGEX}/accept-airline${PARAMETER_REGEX}$`
            ),
            {
                statusCode: 200,
                body: {
                    data: mission,
                },
            }
        )
        .as("acceptMissionInterceptor");

export const closeMissionInterceptor = (mission: Mission) =>
    cy
        .intercept("PUT", new RegExp(`${BASE_URL}/v1/network-scheduling-management/missions/${UUID_REGEX}/close$`), {
            statusCode: 200,
            body: {
                data: mission,
            },
        })
        .as("closeMissionInterceptor");

export const getMissionResourcesInterceptor = (missionResource: MissionResource = anyMissionResource()) =>
    cy
        .intercept(
            "GET",
            new RegExp(
                `${BASE_URL}/v1/network-scheduling-management/missions/${UUID_REGEX}/resources${PARAMETER_REGEX}$`
            ),
            {
                statusCode: 200,
                body: {
                    data: missionResource,
                },
            }
        )
        .as("missionResourcesInterceptor");

export const divertMissionInterceptor = (divertMission: MissionDivert) =>
    cy.intercept(
        "PATCH",
        new RegExp(`${BASE_URL}/v1/network-scheduling-management/missions/${UUID_REGEX}/divert${PARAMETER_REGEX}$`),
        {
            statusCode: 200,
            body: {
                data: divertMission,
            },
        }
    );

export const missionFlightTimeLimitationInterceptor = (
    flightTimeLimitation: FlightTimeLimitation,
    estimatedDepartureDate: string
) =>
    cy
        .intercept(
            "GET",
            new RegExp(`${BASE_URL}/crew-management/v1/crew-management/${UUID_REGEX}/ftl/${estimatedDepartureDate}$`),
            {
                statusCode: 200,
                body: {
                    data: flightTimeLimitation,
                },
            }
        )
        .as("missionFlightTimeLimitationInterceptor");

export const padsAssignmentInterceptor = () =>
    cy.intercept(
        "PUT",
        new RegExp(
            `${BASE_URL}/v1/network-scheduling-management/missions/assignments/${UUID_REGEX}/vertiport/${UUID_REGEX}${PARAMETER_REGEX}$`
        ),
        {
            statusCode: 200,
        }
    );

export const getAllAircraftsInterceptor = (aircrafts: _Aircraft[]) =>
    cy.intercept("GET", new RegExp(`${BASE_URL}/v1/network-scheduling-management/aircraft${PARAMETER_REGEX}$`), {
        statusCode: 200,
        body: {
            data: aircrafts,
        },
    });

export const getAllAircraftTypesInterceptor = (aircraftTypes: AircraftType[]) =>
    cy.intercept("GET", new RegExp(`${BASE_URL}/v1/network-scheduling-management/aircraft-types${PARAMETER_REGEX}$`), {
        statusCode: 200,
        body: {
            data: aircraftTypes,
        },
    });

export const getAllRegionsInterceptor = (regions: Region[]) =>
    cy.intercept("GET", new RegExp(`${BASE_URL}/v1/network-scheduling-management/regions${PARAMETER_REGEX}$`), {
        statusCode: 200,
        body: {
            data: regions,
        },
    });

export const getAllGroundEventsInterceptor = (groundEvents: GroundEvent[]) =>
    cy
        .intercept(
            "GET",
            new RegExp(
                `${BASE_URL}/v1/network-scheduling-management/missions/${UUID_REGEX}/ground-events${PARAMETER_REGEX}$`
            ),
            {
                statusCode: 200,
                body: {
                    data: groundEvents,
                },
            }
        )
        .as("getAllGroundEvents");

export const getAircraftInterceptor = (aircraft: _Aircraft = anyAircraft()) =>
    cy.intercept("GET", new RegExp(`${BASE_URL}/v1/network-scheduling-management/aircraft/${UUID_REGEX}$`), {
        statusCode: 200,
        body: {
            data: aircraft,
        },
    });

export const updateDelayInterceptor = () =>
    cy
        .intercept("PATCH", new RegExp(`${BASE_URL}/v1/network-scheduling-management/missions/${UUID_REGEX}/delay$`), {
            statusCode: 200,
        })
        .as("updateDelay");

export const getAllDelayCodesInterceptor = (delayCodes: DelayCode[]) =>
    cy
        .intercept("GET", new RegExp(`${BASE_URL}/v1/network-scheduling-management/delay-codes${PARAMETER_REGEX}$`), {
            statusCode: 200,
            body: {
                data: delayCodes,
            },
        })
        .as("getAllDelayCodes");

export const getAllCancellationCodesInterceptor = (cancellationCodes: CancellationCode[]) =>
    cy.intercept(
        "GET",
        new RegExp(`${BASE_URL}/v1/network-scheduling-management/cancellation-codes${PARAMETER_REGEX}$`),
        {
            statusCode: 200,
            body: {
                data: cancellationCodes,
            },
        }
    );
