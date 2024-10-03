import type { AuthConfiguration, Permission } from "@voloiq/auth";
import type { FeatureFlagSettings, FeatureFlagsConfiguration } from "@voloiq/feature-flags";

type WithFeatureFlagProps = {
    withFeatureFlags: true;
    featureFlagSettings: FeatureFlagSettings;
};

type WithoutFeatureFlagProps = {
    withFeatureFlags?: never;
    featureFlagSettings?: never;
};

type FeatureFlagProps = WithFeatureFlagProps | WithoutFeatureFlagProps;

type WithAuthProps = {
    withAuth: true;
    authConfiguration: AuthConfiguration;
};

type WithoutAuthProps = {
    withAuth?: never;
    authConfiguration?: never;
};

type AuthProps = WithAuthProps | WithoutAuthProps;

type TimeZoneProps = {
    timeZone?: string;
};

export type AppShellProps = {
    /**
     * A partial override of the local feature flags configuration. By default, all
     * feature flag values are enabled (value = true). The local feature flag configuration
     * is only used when the environment is not production.
     */
    localFeatureFlagsConfiguration?: FeatureFlagsConfiguration;
    /**
     * A partial override of the local authorization configuration. By default, the
     * user has all permissions (admin group). The local feature flag configuration
     * is only used when the environment is not production.
     */
    localAuthorizationConfiguration?: Permission[];
    withTheme?: boolean;
    withRouter?: boolean;
    withParametersCache?: boolean;
    withI18n?: boolean;
    withNotifications?: boolean;
} & AuthProps &
    FeatureFlagProps &
    TimeZoneProps;
