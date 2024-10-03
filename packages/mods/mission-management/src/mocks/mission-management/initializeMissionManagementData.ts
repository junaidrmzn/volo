import { Service, StatusOfMission, TypeOfOperation } from "@voloiq-typescript-api/network-scheduling-types";
import { missionDatabaseOperations } from "./MissionManagementDatabase";
import { anyListItemMissionResource } from "./MissionResource";

const missions = [
    {
        id: "1",
        service: Service.TEST,
        flightNumber: "Mission_1",
        departureDateTime: new Date(Date.UTC(2022, 4, 1)).toString(),
        departureVertiportId: "BRU-IA_2",
        arrivalDateTime: new Date(Date.UTC(2022, 4, 1)).toString(),
        arrivalVertpiportId: "BRU-IA_2",
        typeOfOperation: TypeOfOperation.PILOTED,
        statusOfMission: StatusOfMission.PLANNED,
        clearance: true,
        validFrom: new Date(Date.UTC(2022, 4, 1)).toString(),
        validTo: new Date(Date.UTC(2022, 4, 10)).toString(),
    },
    {
        id: "2",
        service: Service.TEST,
        flightNumber: "Mission_2",
        departureDateTime: new Date(Date.UTC(2022, 4, 1)).toString(),
        departureVertiportId: "BRU-IA_2",
        arrivalDateTime: new Date(Date.UTC(2022, 4, 1)).toString(),
        arrivalVertpiportId: "BRU-IA_2",
        typeOfOperation: TypeOfOperation.PILOTED,
        statusOfMission: StatusOfMission.PLANNED,
        clearance: true,
        validFrom: new Date(Date.UTC(2022, 4, 1)).toString(),
        validTo: new Date(Date.UTC(2022, 4, 10)).toString(),
    },
    {
        id: "3",
        service: Service.TEST,
        flightNumber: "Mission_3",
        departureDateTime: new Date(Date.UTC(2022, 4, 1)).toString(),
        departureVertiportId: "BRU-IA_3",
        arrivalDateTime: new Date(Date.UTC(2022, 4, 1)).toString(),
        arrivalVertpiportId: "BRU-IA_3",
        typeOfOperation: TypeOfOperation.PILOTED,
        statusOfMission: StatusOfMission.PLANNED,
        clearance: true,
        validFrom: new Date(Date.UTC(2022, 4, 1)).toString(),
        validTo: new Date(Date.UTC(2022, 4, 10)).toString(),
    },
];

export const initializeMissionManagementData = () => {
    for (const mission of missions) {
        missionDatabaseOperations.add(anyListItemMissionResource(mission));
    }
};
