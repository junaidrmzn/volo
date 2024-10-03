import type { ProxyConfigMap } from "webpack-dev-server";

const apiProxyPort = 8008;

const localBackendPortMap: { [namespace: string]: number } = {
    // The order matters here! One namespace might override another if it starts with the same characters.
    "/v1/aircraft-management": apiProxyPort,
    "/logbook/v6": apiProxyPort,
    "/v1/flight-planning": apiProxyPort,
    "/v1/flight-monitoring": apiProxyPort,
    "/v1/tile-server": apiProxyPort,
    "/v1/network-scheduling-management": apiProxyPort,
    "/battery-management/v1": apiProxyPort,
    "/battery-management-reports/v1": apiProxyPort,
    "/vertiport-management/v1": apiProxyPort,
    "/crew-management/v1": apiProxyPort,
    "/v1/commercial-scheduling": apiProxyPort,
    "/ftd/v1": apiProxyPort,
    "/ftd/v2": apiProxyPort,
    "/v1/booking": apiProxyPort,
};

export const getProxyConfigMap = () => {
    const proxy: ProxyConfigMap = {};
    for (const namespace of Object.keys(localBackendPortMap)) {
        proxy[namespace] = `http://0.0.0.0:${localBackendPortMap[namespace]}`;
    }
    return proxy;
};
