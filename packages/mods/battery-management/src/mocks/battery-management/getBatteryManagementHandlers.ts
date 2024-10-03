import { getEsuTypeHandlers } from "./getEsuTypeHandlers";

export const getBatteryManagementHandlers = () => [...getEsuTypeHandlers()];
