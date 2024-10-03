import { setupServer } from "msw/node";
import {
    esuDatabaseOperations,
    esuTypeDatabaseOperations,
    getBatteryManagementHandlers,
    getEsuHandlers,
    getEsuTypeHandlers,
} from "./battery-management";

export const setupEsuTypeServiceMock = () => {
    const handlers = getEsuTypeHandlers();
    const { listen, resetHandlers, close } = setupServer(...handlers);
    return { listen: () => listen(), handlers, resetHandlers, close, esuTypeDatabaseOperations };
};

export const setupEsuServiceMock = () => {
    const handlers = getEsuHandlers();
    const { listen, resetHandlers, close } = setupServer(...handlers);
    return { listen: () => listen(), handlers, resetHandlers, close, esuDatabaseOperations };
};

export const setupBatteryManagementServiceMock = () => {
    const handlers = getBatteryManagementHandlers();
    const { listen, resetHandlers, close } = setupServer(...handlers);
    return {
        listen,
        resetHandlers,
        close,
        esuTypeDatabaseOperations,
    };
};
