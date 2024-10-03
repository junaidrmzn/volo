import { getAircraftHandlers } from "./getAircraftHandlers";
import { getAircraftTypeHandlers } from "./getAircraftTypeHandlers";

export const getAircraftManagementHandlers = (withPutConfirm?: boolean) => [
    ...getAircraftTypeHandlers(withPutConfirm),
    ...getAircraftHandlers(),
];
