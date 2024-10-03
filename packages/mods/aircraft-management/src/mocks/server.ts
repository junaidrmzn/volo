import { setupServer } from "msw/node";
import {
    aircraftDatabaseOperations,
    aircraftTypeDatabaseOperations,
    getAircraftHandlers,
    getAircraftManagementHandlers,
    getAircraftTypeHandlers,
} from "./aircraft-management";
import { vertiportDatabaseOperations } from "./vertiport-management/VertiportManagementDatabase";
import { vertiportHandlers } from "./vertiport-management/vertiportHandlers";

export const setupAircraftTypeServiceMock = (withPutConfirm?: boolean) => {
    const handlers = getAircraftTypeHandlers(withPutConfirm);

    const { listen, resetHandlers, close } = setupServer(...handlers, ...vertiportHandlers());

    return {
        listen: () => listen(),
        handlers,
        resetHandlers,
        close,
        databaseOperations: aircraftTypeDatabaseOperations,
    };
};

export const setupAircraftServiceMock = () => {
    const handlers = getAircraftHandlers();

    const { listen, resetHandlers, close, printHandlers } = setupServer(...handlers, ...vertiportHandlers());
    return {
        listen: () => listen(),
        handlers,
        resetHandlers,
        printHandlers,
        close,
        databaseOperations: aircraftDatabaseOperations,
        vertiportDatabaseOperations,
    };
};

export const setupAircraftManagementServiceMock = (withPutConfirm?: boolean) => {
    const handlers = getAircraftManagementHandlers(withPutConfirm);
    const { listen, resetHandlers, close, printHandlers } = setupServer(...handlers, ...vertiportHandlers());
    return {
        listen,
        resetHandlers,
        close,
        printHandlers,
        aircraftDatabaseOperations,
        aircraftTypeDatabaseOperations,
        vertiportDatabaseOperations,
    };
};
