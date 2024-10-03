import { QueryClientProvider } from "@voloiq/network-scheduling-management-components";
import { Navigate, Outlet, ProtectedRoute, Route, Routes } from "@voloiq/routing";
import { ServiceProvider } from "@voloiq/service";
import { AircraftSchedule } from "./aircraft-schedule/AircraftSchedule";
import { EventOverview } from "./event/EventOverview";

if (process.env.WITH_MOCKS) {
    // eslint-disable-next-line global-require, unicorn/prefer-module
    require("./mocks/browser");
}
type AppProps = {
    backendBaseUrl?: string;
};

export const App = (props: AppProps) => {
    const { backendBaseUrl } = props;

    const networkSchedulingLoggingOptions = {
        teamName: "FlightOps",
        serviceName: "networkSchedulingFrontend",
    };

    const serviceUrl = "/";

    return (
        <QueryClientProvider>
            <ServiceProvider
                baseUrl={backendBaseUrl ?? `${BACKEND_BASE_URL}${serviceUrl}`}
                logging={networkSchedulingLoggingOptions}
                withAuth
            >
                <Routes>
                    <Route
                        path="event"
                        element={
                            <ProtectedRoute resources={["Event"]}>
                                <Outlet />
                            </ProtectedRoute>
                        }
                    >
                        <Route index element={<Navigate to="overview" />} />
                        <Route path="overview/*" element={<EventOverview />} />
                    </Route>
                    <Route
                        path="schedule"
                        element={
                            <ProtectedRoute resources={["AcTimegrid"]}>
                                <Outlet />
                            </ProtectedRoute>
                        }
                    >
                        <Route index element={<AircraftSchedule />} />
                    </Route>
                </Routes>
            </ServiceProvider>
        </QueryClientProvider>
    );
};
