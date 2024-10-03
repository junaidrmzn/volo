import { setupWorker } from "msw";
import { getBatteryManagementHandlers, initializeBatteryManagementData } from "./battery-management";

const handlers = getBatteryManagementHandlers();

export const worker = setupWorker(...handlers);

worker.start();

initializeBatteryManagementData();
