import type { Permission } from "@voloiq/auth";
import type { FeatureFlagsConfiguration } from "@voloiq/feature-flags";

export type CypressServiceProviderProps = {
    baseUrl: string;
};

export type CypressOutletProps = {
    context: unknown;
};

export type CypressRouteProps = {
    path: string;
};

export type CypressAppShellProps = {
    localFeatureFlagsConfiguration?: FeatureFlagsConfiguration;
    localAuthorizationConfiguration?: Permission[];
    withRouter?: boolean;
};
