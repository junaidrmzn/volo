import type { RequestHandler } from "msw";
import { setupWorker } from "msw";
import { getAircraftManagementHandlers, initializeAircraftManagementData } from "./aircraft-management";
import { initializeVertiportSelectionManagementData } from "./vertiport-management/initializeVertiportSelectionManagementData";
import { vertiportHandlers } from "./vertiport-management/vertiportHandlers";

const handlers = getAircraftManagementHandlers(false);

// Prevent setting up a real worker during test runs in other mods
const isJest = () => !!global.process && !!process.env.JEST_WORKER_ID;
const createWorker = (handlers: RequestHandler[]) =>
    isJest() ? { start: () => {}, use: () => {} } : setupWorker(...handlers, ...vertiportHandlers());

export const worker = createWorker(handlers);

if (process.env.WITH_MOCKS) {
    worker.start();
    if (!isJest()) {
        initializeAircraftManagementData();
        initializeVertiportSelectionManagementData();
    }
}
