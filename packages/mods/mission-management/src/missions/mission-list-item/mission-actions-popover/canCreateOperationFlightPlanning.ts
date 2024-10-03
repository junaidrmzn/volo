import { Service, StatusOfMission } from "@voloiq-typescript-api/network-scheduling-types";
import { Mission } from "@voloiq/network-schedule-management-api/v1";

export const canCreateOperationFlightPlanning = (mission: Mission): boolean =>
    mission.service !== Service.TEST &&
    mission.statusOfMission === (StatusOfMission.PLANNED || StatusOfMission.BOARDING) &&
    !!mission.missionAssignmentConfirmed;
