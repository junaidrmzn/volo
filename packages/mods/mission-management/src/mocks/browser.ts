import { setupWorker } from "msw";
import { initializeMissionManagementData } from "./mission-management/initializeMissionManagementData";
import { missionHandlers } from "./mission-management/missionHandlers";
import { initializeVertiportManagementData } from "./vertiport-management/initializeVertiportManagementData";
import { vertiportHandlers } from "./vertiport-management/vertiportHandlers";

export const worker = setupWorker(...missionHandlers, ...vertiportHandlers);

worker.start();

initializeMissionManagementData();
initializeVertiportManagementData();
