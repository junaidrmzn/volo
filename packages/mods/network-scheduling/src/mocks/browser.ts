import { setupWorker } from "msw";
import { getEventHandlers } from "./EventServiceMock";
import { initializeEventServiceData } from "./initializeEventServiceData";

const handlers = [...getEventHandlers()];

export const worker = setupWorker(...handlers);

worker.start();

initializeEventServiceData();
