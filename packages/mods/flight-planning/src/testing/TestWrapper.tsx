import { AppShell } from "@voloiq/app-shell";
import type { MemoryRouterProps } from "@voloiq/routing";
import { MemoryRouter, Outlet, Route, Routes } from "@voloiq/routing";
import { ServiceProvider } from "@voloiq/service";
import { ReactQueryClientProvider } from "../contexts/queryclient/ReactQueryContext";
import type { CypressAppShellProps, CypressOutletProps, CypressRouteProps, CypressServiceProviderProps } from "./types";

export const CypressServiceProvider: FCC<CypressServiceProviderProps> = (props) => {
    const { children, baseUrl } = props;
    return (
        <ServiceProvider baseUrl={baseUrl}>
            <ReactQueryClientProvider>{children}</ReactQueryClientProvider>
        </ServiceProvider>
    );
};

export const CypressAppShell: FCC<CypressAppShellProps> = (props) => {
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

export const CypressMemoryRouter: FCC<MemoryRouterProps> = (props) => {
    const { initialEntries, initialIndex, basename, children } = props;
    return (
        <MemoryRouter initialEntries={initialEntries} initialIndex={initialIndex} basename={basename}>
            <Routes>{children}</Routes>
        </MemoryRouter>
    );
};

export const CypressAppShellWithMemoryRouter: FCC<
    Omit<CypressAppShellProps, "withRouter"> & CypressServiceProviderProps & MemoryRouterProps & CypressRouteProps
> = (props) => {
    const { baseUrl, initialEntries, initialIndex, basename, path, children, ...wrapperProps } = props;
    return (
        <CypressAppShell {...wrapperProps} withRouter={false}>
            <CypressServiceProvider baseUrl={baseUrl}>
                <CypressMemoryRouter initialEntries={initialEntries} initialIndex={initialIndex} basename={basename}>
                    <Route path={path} element={children} />
                </CypressMemoryRouter>
            </CypressServiceProvider>
        </CypressAppShell>
    );
};

export const CypressAppShellWithOutletContext: FCC<
    Omit<CypressAppShellProps, "withRouter"> &
        CypressServiceProviderProps &
        MemoryRouterProps &
        CypressOutletProps &
        CypressRouteProps
> = (props) => {
    const { baseUrl, initialEntries, initialIndex, basename, context, path, children, ...wrapperProps } = props;
    return (
        <CypressAppShell {...wrapperProps} withRouter={false}>
            <CypressServiceProvider baseUrl={baseUrl}>
                <CypressMemoryRouter initialEntries={initialEntries} initialIndex={initialIndex} basename={basename}>
                    <Route path="/" element={<Outlet context={context} />}>
                        <Route path={path} element={children} />
                    </Route>
                </CypressMemoryRouter>
            </CypressServiceProvider>
        </CypressAppShell>
    );
};
