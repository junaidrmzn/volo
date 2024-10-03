type ServiceUrlProperties = {
    port: number;
    endpoint: string;
};

export const serviceUrlProperties = {
    networkScheduling: { port: 9081, endpoint: "/v1/network-scheduling-management" },
    aircraftManagement: { port: 9081, endpoint: "/v1/aircraft-management" },
};

const getLocalBackendBaseUrl = (localBackendPort: number) =>
    `http://localhost:${process.env.WITH_MOCKS ? 9000 : localBackendPort}`;

const getServiceUrl = (props: ServiceUrlProperties) => `${getLocalBackendBaseUrl(props.port)}${props.endpoint}`;

export const NETWORK_SCHEDULING_BASE_SERVICE_URL = getLocalBackendBaseUrl(
    serviceUrlProperties?.networkScheduling?.port
);
export const NETWORK_SCHEDULING_MANAGEMENT_SERVICE_URL = getServiceUrl(serviceUrlProperties.networkScheduling);
export const AIRCRAFT_MANAGEMENT_SERVICE_URL = getServiceUrl(serviceUrlProperties.aircraftManagement);
