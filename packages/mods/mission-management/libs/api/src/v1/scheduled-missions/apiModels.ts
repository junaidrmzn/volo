import { AircraftTechnicalStatus, CheckList, Service, StatusOfMission } from "../missions/apiModel";
import { GroundEvent } from "../missions/ground-events/apiModels";

export type AircraftAssignment = {
    aircraftId: string;
    aircraftMSN?: string;
    aircraftRegistration?: string;
    aircraftTypeName?: string;
    aircraftTechnicalStatus?: AircraftTechnicalStatus;
    missionsList: ShortInfoMission[];
    groundEventList?: GroundEvent[] | null;
};

export type ShortInfoMission = {
    missionId: string;
    flightNumber?: string;
    statusOfMission: StatusOfMission;
    departureVertiportCode?: string;
    actualDepartureDateTime?: string;
    estimatedDepartureDateTime?: string;
    arrivalVertiportCode?: string;
    actualArrivalDateTime?: string;
    estimatedArrivalDateTime?: string;
    departureDateTime?: string;
    arrivalDateTime?: string;
    checkLists: CheckList[];
    isInConflict: boolean;
    service: Service;
};
