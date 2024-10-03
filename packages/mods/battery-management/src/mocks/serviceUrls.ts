import { BATTERY_MANAGEMENT } from "../api-hooks/serviceEndpoints";

type ServiceUrlProperties = {
    port: number;
    endpoint: string;
};

export const serviceUrlProperties = {
    batteryManagement: { port: 8090, endpoint: BATTERY_MANAGEMENT },
};

const getLocalBackendBaseUrl = (localBackendPort: number) =>
    `http://localhost:${process.env.WITH_MOCKS ? 9000 : localBackendPort}`;

const getServiceUrl = (props: ServiceUrlProperties) => `${getLocalBackendBaseUrl(props.port)}${props.endpoint}`;

export const BATTERY_MANAGEMENT_BASE_URL = getLocalBackendBaseUrl(serviceUrlProperties.batteryManagement.port);
export const BATTERY_MANAGEMENT_SERVICE_URL = getServiceUrl(serviceUrlProperties.batteryManagement);
