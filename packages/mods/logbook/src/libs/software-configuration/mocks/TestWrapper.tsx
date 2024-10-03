import { AppShell } from "@voloiq/app-shell";
import type { Permission } from "@voloiq/auth";
import type { FeatureFlagsConfiguration } from "@voloiq/feature-flags";
import { ServiceProvider } from "@voloiq/service";

export const ServiceWrapper: FCC = (props) => {
    const { children } = props;
    return <ServiceProvider baseUrl={BACKEND_BASE_URL}>{children}</ServiceProvider>;
};

export type CypressUIWrapperProps = {
    localFeatureFlagsConfiguration?: FeatureFlagsConfiguration;
    localAuthorizationConfiguration?: Permission[];
    withRouter?: boolean;
};

export const CypressUIWrapper: FCC<CypressUIWrapperProps> = (props) => {
    const { children, localAuthorizationConfiguration, localFeatureFlagsConfiguration, withRouter = true } = props;

    return (
        <AppShell
            localFeatureFlagsConfiguration={localFeatureFlagsConfiguration}
            localAuthorizationConfiguration={localAuthorizationConfiguration}
            withAuth
            withI18n
            withTheme
            withRouter={withRouter}
            withFeatureFlags
            featureFlagSettings={{
                baseUrl: "unusedInTests",
                environmentId: "unusedInTests",
            }}
            withParametersCache
            authConfiguration={{
                authorization: {
                    mapping: [],
                },
                domain: "unusedInTests",
                type: "static",
                verificationInfo: {
                    authority: "unusedInTests",
                    clientId: "unusedInTests",
                    redirectUri: "unusedInTests",
                },
            }}
        >
            {children}
        </AppShell>
    );
};
