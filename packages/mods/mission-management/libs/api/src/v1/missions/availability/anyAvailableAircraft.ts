import type { Aircraft } from "@voloiq-typescript-api/network-scheduling-types";
import { AircraftTechnicalStatus, ReservationBlockerType } from "@voloiq-typescript-api/network-scheduling-types";

export const anyAvailableAircraft = (overwrites?: Partial<Aircraft>): Required<Aircraft> => ({
    aircraftId: "647101a1-3b79-452a-868b-2d15073285a6",
    registration: "Test",
    msn: "1112",
    aircraftTypeId: "647101a1-3b79-452a-868b-2d15073285a6799",
    aircraftTypeName: "Test",
    technicalStatus: AircraftTechnicalStatus.SERVICEABLE,
    reservations: [
        {
            id: "834793458934-483593854",
            alternativeIdentifier: "VC-2044",
            startDateTime: "2023-05-04T09:30:00Z",
            endDateTime: "2023-05-04T09:50:00Z",
            reservationType: ReservationBlockerType.MISSION,
        },
    ],
    ...overwrites,
});
