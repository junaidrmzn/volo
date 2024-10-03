import {
    AIRCRAFT_MANAGEMENT,
    NETWORK_SCHEDULING_MANAGEMENT,
    VERTIPORT_MANAGEMENT,
} from "../api-hooks/serviceEndpoints";

type ServiceUrlProperties = {
    port: number;
    endpoint: string;
};

export const serviceUrlProperties = {
    aircraftManagement: { port: 9080, endpoint: AIRCRAFT_MANAGEMENT },
    networkScheduling: { port: 9081, endpoint: NETWORK_SCHEDULING_MANAGEMENT },
    vertiportManagement: { port: 9080, endpoint: VERTIPORT_MANAGEMENT },
};

const getLocalBackendBaseUrl = (localBackendPort: number) =>
    `http://localhost:${process.env.WITH_MOCKS ? 9000 : localBackendPort}`;

const getServiceUrl = (props: ServiceUrlProperties) => `${getLocalBackendBaseUrl(props.port)}${props.endpoint}`;

export const AIRCRAFT_MANAGEMENT_BASE_URL = getLocalBackendBaseUrl(serviceUrlProperties.aircraftManagement.port);
export const NETWORK_SCHEDULING_BASE_SERVICE_URL = getLocalBackendBaseUrl(serviceUrlProperties.networkScheduling.port);
export const VERTIPORT_MANAGEMENT_BASE_URL = getLocalBackendBaseUrl(serviceUrlProperties.vertiportManagement.port);

export const AIRCRAFT_MANAGEMENT_SERVICE_URL = getServiceUrl(serviceUrlProperties.aircraftManagement);
export const NETWORK_SCHEDULING_MANAGEMENT_SERVICE_URL = getServiceUrl(serviceUrlProperties.networkScheduling);
export const VERTIPORT_MANAGEMENT_SERVICE_URL = getServiceUrl(serviceUrlProperties.vertiportManagement);
