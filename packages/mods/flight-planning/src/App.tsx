import { useFeatureFlags } from "@voloiq/feature-flags";
import { Navigate, Route, Routes } from "@voloiq/routing";
import { ServiceProviders } from "./ServiceProviders";
import { Sidebar } from "./components";
import { AirspaceListWrapper } from "./features/airspaces/list";
import { AlertsListWrapper } from "./features/alerts-list";
import { CsflDetails } from "./features/csfl";
import { StateOfChargeSettingsWrapper } from "./features/expert-settings/StateOfChargeSettingsWrapper";
import { FileFlightPlan } from "./features/file-flight-plan";
import { FlightPlanningMissionRedirect } from "./features/flight-planning-mission";
import { NotamListWrapper } from "./features/notam-list";
import { RouteOptionOverviewPage } from "./features/overview";
import { RouteOptionResourceOverview } from "./features/route-option/resource-overview";
import { RouteTemplateNavigation } from "./features/route-template-navigation";
import { VfrListWrapper } from "./features/vfr-list";

export const AppWithoutProviders = (props: { preserveDrawingBuffer?: boolean }) => {
    const { preserveDrawingBuffer } = props;
    const { isFeatureFlagEnabled } = useFeatureFlags();
    return (
        <Routes>
            <Route path="/" element={<Navigate to="route-options" />} />
            {isFeatureFlagEnabled("vfp-265") && (
                <Route path="/missions/:missionId" element={<FlightPlanningMissionRedirect />} />
            )}
            <Route
                path="route-options/:routeOptionId/map"
                element={<RouteOptionOverviewPage preserveDrawingBuffer={preserveDrawingBuffer} />}
            >
                <Route
                    path="notams"
                    element={
                        <Sidebar>
                            <NotamListWrapper />
                        </Sidebar>
                    }
                />
                <Route
                    path="alerts"
                    element={
                        <Sidebar>
                            <AlertsListWrapper />
                        </Sidebar>
                    }
                />
                <Route
                    path="vfrlayers"
                    element={
                        <Sidebar>
                            <VfrListWrapper />
                        </Sidebar>
                    }
                />
                <Route
                    path="airspaces"
                    element={
                        <Sidebar>
                            <AirspaceListWrapper />
                        </Sidebar>
                    }
                />
                <Route
                    path="soc-settings"
                    element={
                        <Sidebar>
                            <StateOfChargeSettingsWrapper />
                        </Sidebar>
                    }
                />
                <Route
                    path="templates"
                    element={
                        <Sidebar>
                            <RouteTemplateNavigation />
                        </Sidebar>
                    }
                />
                <Route
                    path="csflSite"
                    element={
                        <Sidebar>
                            <CsflDetails />
                        </Sidebar>
                    }
                />
            </Route>
            <Route path="route-options/:routeOptionId/plan" element={<FileFlightPlan />} />
            <Route path="route-options" element={<RouteOptionResourceOverview />}>
                <Route path="*" element={<Navigate to="" />} />
            </Route>
        </Routes>
    );
};

export const App = () => {
    return (
        <ServiceProviders>
            <AppWithoutProviders preserveDrawingBuffer />
        </ServiceProviders>
    );
};
