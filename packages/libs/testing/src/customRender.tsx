import type { RenderOptions } from "@testing-library/react";
import { render } from "@testing-library/react";
import type { ReactElement } from "react";
// eslint-disable-next-line no-restricted-imports
import type { MemoryRouterProps } from "react-router-dom";
// eslint-disable-next-line no-restricted-imports
import { MemoryRouter } from "react-router-dom";
import { AppShell } from "@voloiq/app-shell";
import type { Permission } from "@voloiq/auth";
import type { FeatureFlagsConfiguration } from "@voloiq/feature-flags";

type UIWrapperProps = {
    localFeatureFlagsConfiguration?: FeatureFlagsConfiguration;
    localAuthorizationConfiguration?: Permission[];
    withRouter: boolean;
};

export const UIWrapper: FCC<UIWrapperProps> = (props) => {
    const { children, localFeatureFlagsConfiguration, localAuthorizationConfiguration, withRouter } = props;

    return (
        <AppShell
            localFeatureFlagsConfiguration={localFeatureFlagsConfiguration}
            localAuthorizationConfiguration={localAuthorizationConfiguration}
            withI18n
            withRouter={withRouter}
            withTheme
            withFeatureFlags
            withAuth
            withParametersCache
            featureFlagSettings={{
                baseUrl: "unusedInTests",
                environmentId: "unusedInTests",
            }}
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

export const UIWrapperWithMemoryRouter: FCC<Omit<UIWrapperProps, "withRouter"> & MemoryRouterProps> = (props) => {
    const { basename, children, initialEntries, initialIndex, ...wrapperProps } = props;
    return (
        <UIWrapper {...wrapperProps} withRouter={false}>
            <MemoryRouter initialEntries={initialEntries} initialIndex={initialIndex} basename={basename}>
                {children}
            </MemoryRouter>
        </UIWrapper>
    );
};

/**
 * Renders the given React element in the document.body and wrap it within
 * an AppShell preconfigured to provide i18n, routing, theming, feature flags and authorization.
 *
 * @param ui The React element to be rendered
 * @param localFeatureFlagsConfiguration A partial override of the local feature flags configuration
 * @param localAuthorizationConfiguration A list of permissions overriding the default * (wildcard) permission
 * (by default all feature flag values are enabled (value = true) when the environment is not production)
 * @param options Render options
 * @returns The render result
 */
export const customRender = (
    ui: ReactElement,
    localFeatureFlagsConfiguration?: FeatureFlagsConfiguration,
    localAuthorizationConfiguration?: Permission[],
    options?: Omit<RenderOptions, "queries" | "wrapper">
) =>
    render(ui, {
        wrapper: (props) => (
            <UIWrapper
                {...props}
                localFeatureFlagsConfiguration={localFeatureFlagsConfiguration}
                localAuthorizationConfiguration={localAuthorizationConfiguration}
                withRouter
            />
        ),
        ...options,
    });
