import { setupWorker } from "msw";
import { setupServiceMockHandlers } from "./ServiceMock";
import { initializeVertiportManagementData } from "./initialiseVertiportManagementData";

const { handlers } = setupServiceMockHandlers();
export const worker = setupWorker(...handlers);
worker.start();
initializeVertiportManagementData();
