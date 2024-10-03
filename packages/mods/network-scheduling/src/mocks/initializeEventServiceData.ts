import { anyEventResource } from "./EventResource";
import { eventServiceDatabaseOperations } from "./EventServiceMock";

const events = [
    { isBlockedForMission: false },
    { isBlockedForMission: true },
    { isBlockedForMission: false },
    { isBlockedForMission: true },
];

export const initializeEventServiceData = () => {
    for (const event of events) eventServiceDatabaseOperations.add(anyEventResource(event));
};
