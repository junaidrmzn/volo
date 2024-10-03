import { useFeatureFlags } from "@voloiq/feature-flags";
import { Navigate, ProtectedRoute, RootRoutes, Route, Routes } from "@voloiq/routing";
import { ServiceProvider } from "@voloiq/service";
import { QueryClientProvider } from "./QueryClientProvider";
import { OverviewPage } from "./log-overview";
import { UploadFilePage } from "./log-overview/file-upload";
import { SoftwareConfigurationsPage } from "./software-config-overview";

if (process.env.WITH_MOCKS) {
    // eslint-disable-next-line global-require, unicorn/prefer-module
    require("./__tests__/mocks/browser");
}

type AppProps = {
    backendBaseUrl?: string;
    baseUrl?: string;
};

type LogbookRoutesOldProps = {
    baseUrl: string;
};
const LogbookRoutesOld = (props: LogbookRoutesOldProps) => {
    const { baseUrl } = props;
    return (
        <Routes>
            <Route index element={<Navigate to={`${baseUrl}/overview`} />} />
            <Route
                path={`${baseUrl}/overview/*`}
                element={
                    <ProtectedRoute resources={["Log"]}>
                        <OverviewPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path={`${baseUrl}/overview/:logId/upload-file`}
                element={
                    <ProtectedRoute resources={["Log"]} actions={["create"]}>
                        <UploadFilePage />
                    </ProtectedRoute>
                }
            />
            <Route path="software-configurations">
                <Route
                    index
                    element={
                        <ProtectedRoute resources={["SoftwareConfiguration"]}>
                            <SoftwareConfigurationsPage />
                        </ProtectedRoute>
                    }
                />
            </Route>
        </Routes>
    );
};
const LogbookRoutes = () => {
    return (
        <RootRoutes>
            <Route
                path="/flight-test-suite/logs"
                element={
                    <ProtectedRoute resources={["Log"]}>
                        <OverviewPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/flight-test-suite/logs/:logId/upload-file"
                element={
                    <ProtectedRoute resources={["Log"]} actions={["create"]}>
                        <UploadFilePage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/flight-test-suite/software-configs"
                element={
                    <ProtectedRoute resources={["SoftwareConfiguration"]}>
                        <SoftwareConfigurationsPage />
                    </ProtectedRoute>
                }
            />
        </RootRoutes>
    );
};

export const App = (props: AppProps) => {
    const { backendBaseUrl, baseUrl = "" } = props;
    const { isFeatureFlagEnabled } = useFeatureFlags();

    const logbookLoggingOptions = {
        teamName: "TelePort",
        serviceName: "logbookFrontend",
    };

    const serviceUrl = isFeatureFlagEnabled("vte-986") ? "/ftd/v1" : "/logbook/v6";

    return (
        <ServiceProvider
            baseUrl={backendBaseUrl ?? `${BACKEND_BASE_URL}${serviceUrl}`}
            logging={logbookLoggingOptions}
            withAuth
        >
            <QueryClientProvider>
                {isFeatureFlagEnabled("vte-1596") ? <LogbookRoutes /> : <LogbookRoutesOld baseUrl={baseUrl} />}
            </QueryClientProvider>
        </ServiceProvider>
    );
};
