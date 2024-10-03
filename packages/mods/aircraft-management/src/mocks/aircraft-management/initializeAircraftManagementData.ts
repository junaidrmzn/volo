import { aircraftDatabaseOperations, aircraftTypeDatabaseOperations } from "./AircraftManagementDatabase";
import { anyAircraftResourceWithId } from "./AircraftResource";
import { anyAircraftTypeResourceWithId } from "./AircraftTypeResource";

const aircraftTypes = [
    { id: "VD_100", name: "VD_100" },
    { id: "VD_150", name: "VD_150" },
];

const aircrafts = [
    {
        registration: "D-VOLO",
        msn: "42",
        homebase: "BRU-IA",
        aircraftTypeId: "VD_100",
    },
    {
        registration: "Alpha1",
        homebase: "Alpha",
        aircraftTypeId: "VD_100",
    },
    {
        registration: "XX-Legion",
        aircraftTypeId: "VD_150",
    },
];

export const initializeAircraftManagementData = () => {
    for (const aircraftType of aircraftTypes) {
        aircraftTypeDatabaseOperations.add(anyAircraftTypeResourceWithId(aircraftType));
    }

    for (const aircraft of aircrafts) {
        aircraftDatabaseOperations.add(anyAircraftResourceWithId(aircraft));
    }
};
