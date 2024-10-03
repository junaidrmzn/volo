import { QueryClientProvider } from "@voloiq/network-scheduling-components";
import { Navigate, Outlet, ProtectedRoute, Route, Routes } from "@voloiq/routing";
import { ServiceProvider } from "@voloiq/service";
import { MissionOverview } from "./missions/MissionOverview";
import { MissionDetail } from "./missions/mission-detail/MissionDetail";
import { OperationalFlightPlan } from "./missions/ofp-pdf/OperationalFlightPlan";
import { ScheduledMissionOverview } from "./scheduled-missions/ScheduledMissionOverview";

if (process.env.WITH_MOCKS) {
    // eslint-disable-next-line global-require, unicorn/prefer-module
    require("./mocks/browser");
}
type AppProps = {
    backendBaseUrl?: string;
};

export const App = (props: AppProps) => {
    const { backendBaseUrl } = props;

    const missionLoggingOptions = {
        teamName: "FlightOps",
        serviceName: "missionManagementFrontend",
    };

    const serviceUrl = "/";

    return (
        <QueryClientProvider>
            <ServiceProvider
                baseUrl={backendBaseUrl ?? `${BACKEND_BASE_URL}${serviceUrl}`}
                logging={missionLoggingOptions}
                withAuth
            >
                <Routes>
                    <Route
                        path="missions"
                        element={
                            <ProtectedRoute resources={["Mission"]}>
                                <Outlet />
                            </ProtectedRoute>
                        }
                    >
                        <Route index element={<Navigate to="overview" />} />
                        <Route path="overview/*" element={<MissionOverview />} />
                        <Route path="overview/:missionId/*" element={<MissionDetail />} />
                    </Route>
                    <Route path="schedule" element={<Outlet />}>
                        <Route index element={<Navigate to="overview" />} />
                        <Route path="overview/*" element={<ScheduledMissionOverview />} />
                    </Route>
                    <Route path="/ofp/:missionId" element={<OperationalFlightPlan />} />
                    <Route path="*" element={<Navigate to="/missions" replace />} />
                </Routes>
            </ServiceProvider>
        </QueryClientProvider>
    );
};
