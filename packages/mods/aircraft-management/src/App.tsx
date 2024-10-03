import { QueryClientProvider } from "@voloiq/aircraft-management-components";
import { Navigate, Outlet, ProtectedRoute, Route, Routes } from "@voloiq/routing";
import { ServiceProvider } from "@voloiq/service";
import { AircraftTypeOverview } from "./aircraft-type/AircraftTypeOverview";
import { AircraftOverview } from "./aircraft/AircraftOverview";

if (process.env.WITH_MOCKS) {
    // eslint-disable-next-line global-require, unicorn/prefer-module
    require("./mocks/browser");
}

type AppProps = {
    backendBaseUrl?: string;
};

export const App = (props: AppProps) => {
    const { backendBaseUrl } = props;

    const aircraftLoggingOptions = {
        teamName: "FlightOps",
        serviceName: "aircraftManagementFrontend",
    };

    const serviceUrl = "/";

    return (
        <QueryClientProvider>
            <ServiceProvider
                baseUrl={backendBaseUrl ?? `${BACKEND_BASE_URL}${serviceUrl}`}
                logging={aircraftLoggingOptions}
                withAuth
            >
                <Routes>
                    <Route
                        path="aircraft"
                        element={
                            <ProtectedRoute resources={["Aircraft"]}>
                                <Outlet />
                            </ProtectedRoute>
                        }
                    >
                        <Route index element={<Navigate to="overview" />} />
                        <Route path="overview/*" element={<AircraftOverview />} />
                    </Route>
                    <Route
                        path="aircraft-type"
                        element={
                            <ProtectedRoute resources={["AircraftType"]}>
                                <Outlet />
                            </ProtectedRoute>
                        }
                    >
                        <Route index element={<Navigate to="overview" />} />
                        <Route path="overview/*" element={<AircraftTypeOverview />} />
                    </Route>
                </Routes>
            </ServiceProvider>
        </QueryClientProvider>
    );
};
