import type { AuthConfiguration } from "@voloiq/auth";
import { useParsedAuthConfiguration } from "@voloiq/auth";
import { isDevelopment } from "@voloiq/utils";

/**
 * The auth configuration string will be replaced when the bundle is served on production
 * @returns object with the auth configuration of the current environment
 */
export const useAuthConfiguration = (): AuthConfiguration => {
    const config = "$AUTH_CONFIGURATION";
    return useParsedAuthConfiguration(
        isDevelopment
            ? `{
        "domain": "mock.voloiq.io",
        "type": "static",
        "authorization": {
            "mapping": [
                {
                    "sourceId": "commercial-manager-sales-agent",
                    "targetGroupName": "CommercialManagerSalesAgent"
                },
                {
                    "sourceId": "commercial-manager-sales-supervisor",
                    "targetGroupName": "CommercialManagerSalesSupervisor"
                }
            ]
        },
        "verificationInfo": {
            "clientId": "mock",
            "authority": "mock",
            "redirectUri": "mock"
        }
    }`
            : config
    );
};
