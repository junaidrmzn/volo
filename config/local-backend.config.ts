const localBackendPorts: { [namespace: string]: number } = {
    // The order matters here! One namespace might override another if it starts with the same characters.
    "/v1/aircraft-management": 8000,
    "/logbook/v6": 8000,
    "/v1/flight-planning": 8081,
    "/v1/flight-monitoring": 8082,
    "/v1/tile-server": 8083,
    "/v1/network-scheduling-management": 8002,
    "/battery-management/v1": 8090,
    "/battery-management-reports/v1": 8099,
    "/vertiport-management/v1": 8003,
    "/crew-management/v1": 8001,
    "/v1/commercial-scheduling": 9080,
    "/booking-data": 8086,
    "/ftd/v1": 8080,
    "/ftd/v2": 8080,
};

export const getLocalBackendProxyConfiguration = () => {
    const proxy: Record<string, string> = {};
    for (const namespace of Object.keys(localBackendPorts)) {
        proxy[namespace] = `http://0.0.0.0:${localBackendPorts[namespace]}`;
    }
    return proxy;
};
