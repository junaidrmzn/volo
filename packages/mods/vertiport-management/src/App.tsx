import { Navigate, Outlet, Route, Routes } from "@voloiq/routing";
import { ServiceProvider } from "@voloiq/service";
import { QueryClientProvider } from "@voloiq/vertiport-management-components";
import { RegionOverview } from "./region/RegionOverview";
import { VertiportOverview } from "./vertiport/VertiportOverview";

type AppProps = {
    backendBaseUrl?: string;
};

export const App = (props: AppProps) => {
    const { backendBaseUrl } = props;

    const vertiportLoggingOptions = {
        teamName: "FlightOps",
        serviceName: "vertiportManagementFrontend",
    };

    const serviceUrl = "/";

    return (
        <QueryClientProvider>
            <ServiceProvider
                baseUrl={backendBaseUrl ?? `${BACKEND_BASE_URL}${serviceUrl}`}
                logging={vertiportLoggingOptions}
                withAuth
            >
                <Routes>
                    <Route path="region" element={<Outlet />}>
                        <Route index element={<Navigate to="overview" />} />
                        <Route path="overview/*" element={<RegionOverview />} />
                    </Route>
                    <Route path="vertiport" element={<Outlet />}>
                        <Route index element={<Navigate to="overview" />} />
                        <Route path="overview/*" element={<VertiportOverview />} />
                    </Route>
                </Routes>
            </ServiceProvider>
        </QueryClientProvider>
    );
};
