import { QueryClientProvider } from "@voloiq/crew-management-components";
import { Navigate, Outlet, Route, Routes } from "@voloiq/routing";
import { ServiceProvider } from "@voloiq/service";
import { CrewCalendar } from "./crewCalendar/CrewCalendar";
import { CrewMemberOverview } from "./crewMember/CrewMemberOverview";
import { CrewRoleOverview } from "./crewRole/CrewRoleOverview";

type AppProps = {
    backendBaseUrl?: string;
};

export const App = (props: AppProps) => {
    const { backendBaseUrl } = props;

    const crewLoggingOptions = {
        teamName: "FlightOps",
        serviceName: "crewManagementFrontend",
    };

    const serviceUrl = "/";

    return (
        <QueryClientProvider>
            <ServiceProvider
                baseUrl={backendBaseUrl ?? `${BACKEND_BASE_URL}${serviceUrl}`}
                logging={crewLoggingOptions}
                withAuth
            >
                <Routes>
                    <Route path="crewrole" element={<Outlet />}>
                        <Route index element={<Navigate to="overview" />} />
                        <Route path="overview/*" element={<CrewRoleOverview />} />
                    </Route>
                    <Route path="crewmember" element={<Outlet />}>
                        <Route index element={<Navigate to="overview" />} />
                        <Route path="overview/*" element={<CrewMemberOverview />} />
                    </Route>
                    <Route path="crewschedule" element={<Outlet />}>
                        <Route index element={<CrewCalendar />} />
                    </Route>
                </Routes>
            </ServiceProvider>
        </QueryClientProvider>
    );
};
