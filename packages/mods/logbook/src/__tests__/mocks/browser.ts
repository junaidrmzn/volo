import { setupWorker } from "msw";
import { initializeLogbookData } from "../../libs/logbook/mocks/initializeLogbookData";
import { setupServiceMockHandlers } from "../../libs/logbook/mocks/msw/ServiceMock";

const { handlers } = setupServiceMockHandlers();

export const worker = setupWorker(...handlers);

worker.start();

initializeLogbookData();
