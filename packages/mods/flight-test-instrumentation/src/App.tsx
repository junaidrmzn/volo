import { useFeatureFlags } from "@voloiq/feature-flags";
import { Navigate, ProtectedRoute, RootRoutes, Route, Routes } from "@voloiq/routing";
import { ServiceProvider } from "@voloiq/service";
import { QueryClientProvider } from "./QueryClientProvider";
import { ImportPage, OverviewPage } from "./parameter-overview";

export const App = () => {
    const { isFeatureFlagEnabled } = useFeatureFlags();
    const ftiLoggingOptions = {
        teamName: "TelePort",
        serviceName: "ftiFrontend",
    };

    const baseRoute = `${BACKEND_BASE_URL}/ftd/v1`;

    return (
        <ServiceProvider baseUrl={baseRoute} logging={ftiLoggingOptions} withAuth>
            <QueryClientProvider>
                {isFeatureFlagEnabled("vte-1596") ? (
                    <RootRoutes>
                        <Route
                            path="/flight-test-suite/instrumentation-parameters"
                            element={
                                <ProtectedRoute resources={["Parameter"]}>
                                    <OverviewPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/flight-test-suite/instrumentation-parameters/import"
                            element={
                                <ProtectedRoute resources={["ParameterBulkImportLog"]} actions={["create"]}>
                                    <ImportPage />
                                </ProtectedRoute>
                            }
                        />
                    </RootRoutes>
                ) : (
                    <Routes>
                        <Route index element={<Navigate to="overview" />} />
                        <Route
                            path="overview/*"
                            element={
                                <ProtectedRoute resources={["Parameter"]}>
                                    <OverviewPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="overview/import"
                            element={
                                <ProtectedRoute resources={["ParameterBulkImportLog"]} actions={["create"]}>
                                    <ImportPage />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                )}
            </QueryClientProvider>
        </ServiceProvider>
    );
};
