import { setupServer } from "msw/node";
import { eventServiceDatabaseOperations, getEventHandlers } from "./EventServiceMock";

export const setupEventServiceMock = () => {
    const handlers = getEventHandlers();

    const { listen, resetHandlers, close } = setupServer(...handlers);
    return {
        listen: () => listen(),
        handlers,
        resetHandlers,
        close,
        databaseOperations: eventServiceDatabaseOperations,
    };
};
