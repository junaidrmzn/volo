import { setupServer } from "msw/node";
import { missionDatabaseOperations } from "./mission-management/MissionManagementDatabase";
import { missionHandlers } from "./mission-management/missionHandlers";
import { vertiportDatabaseOperations } from "./vertiport-management/VertiportManagementDatabase";
import { vertiportHandlers } from "./vertiport-management/vertiportHandlers";

export const setupMissionServiceMock = () => {
    const { listen, resetHandlers, close } = setupServer(...missionHandlers, ...vertiportHandlers);
    const clearDatabases = () => {
        for (const database of [missionDatabaseOperations, vertiportDatabaseOperations]) {
            database.clear();
        }
    };
    return {
        listen,
        resetHandlers,
        close,
        clearDatabases,
        missionDatabaseOperations,
        vertiportDatabaseOperations,
    };
};
