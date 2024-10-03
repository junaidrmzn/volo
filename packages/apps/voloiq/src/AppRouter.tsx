import { useFeatureFlags } from "@voloiq/feature-flags";
import { ProtectedRoute, Route, Routes } from "@voloiq/routing";
import { AppLayout } from "./AppLayout";
import { AircraftManagement } from "./microfrontends/AircraftManagement";
import { BatteryManagement } from "./microfrontends/BatteryManagement";
import { BookingManagement } from "./microfrontends/BookingManagement";
import { CommercialScheduling } from "./microfrontends/CommercialScheduling";
import { CrewManagement } from "./microfrontends/CrewManagement";
import { FlightMonitoring } from "./microfrontends/FlightMonitoring";
import { FlightPlanning } from "./microfrontends/FlightPlanning";
import { FlightTestDefinition } from "./microfrontends/FlightTestDefinition";
import { FlightTestInstrumentation } from "./microfrontends/FlightTestInstrumentation";
import { Logbook } from "./microfrontends/Logbook";
import { MissionManagement } from "./microfrontends/MissionManagement";
import { NetworkScheduling } from "./microfrontends/NetworkScheduling";
import { VertiportManagement } from "./microfrontends/VertiportManagement";
import { Home } from "./routes/Home";
import { renderModuleRoutes } from "./routes/renderModuleRoutes";
import { useVoloIqTranslation } from "./translations/useVoloIqTranslation";

export const AppRouter = () => {
    const { isFeatureFlagEnabled } = useFeatureFlags();
    const { t } = useVoloIqTranslation();

    return (
        <Routes>
            <Route path="/" element={<AppLayout />}>
                <Route index element={<Home />} />
                {isFeatureFlagEnabled("batteryManagement") && (
                    <Route
                        path="battery-management/*"
                        element={
                            <ProtectedRoute resources={["Battery"]} actions={["read"]}>
                                <BatteryManagement />
                            </ProtectedRoute>
                        }
                    />
                )}
                <Route path="aircraft-management/*" element={<AircraftManagement />} />
                {isFeatureFlagEnabled("logbook") && (
                    <Route
                        path="logbook/*"
                        element={
                            <ProtectedRoute resources={["Log"]}>
                                <Logbook />
                            </ProtectedRoute>
                        }
                    />
                )}
                {isFeatureFlagEnabled("flightPlanning") && (
                    <Route
                        path="flight-planning/*"
                        element={
                            <ProtectedRoute resources={["RouteOptions"]}>
                                <FlightPlanning />
                            </ProtectedRoute>
                        }
                    />
                )}
                {isFeatureFlagEnabled("flightPlanManagement") && (
                    <Route
                        path="flight-plan-management/*"
                        element={
                            <ProtectedRoute resources={["FlightPlan"]}>
                                <FlightPlanning />
                            </ProtectedRoute>
                        }
                    />
                )}
                {isFeatureFlagEnabled("flightMonitoring") && (
                    <Route path="flight-monitoring/*" element={<FlightMonitoring />} />
                )}
                <Route path="air-operations/network-scheduling/*" element={<NetworkScheduling />} />
                <Route path="air-operations/mission-management/*" element={<MissionManagement />} />
                <Route
                    path="vertiport-management/*"
                    element={
                        <ProtectedRoute resources={["Vertiport"]} actions={["read"]}>
                            <VertiportManagement />
                        </ProtectedRoute>
                    }
                />
                <Route path="crew-management/*" element={<CrewManagement />} />
                <Route path="booking-management/*" element={<BookingManagement />} />
                <Route path="commercial-scheduling/*" element={<CommercialScheduling />} />
                {isFeatureFlagEnabled("flightTestInstrumentation") && (
                    <Route path="flight-test-instrumentation/*" element={<FlightTestInstrumentation />} />
                )}
                {isFeatureFlagEnabled("vte-1596") ? (
                    renderModuleRoutes({
                        moduleLabel: t("Flight Test Suite"),
                        modulePath: "/flight-test-suite/*",
                        indexRoute: "/flight-test-suite/definitions",
                        pages: [
                            {
                                label: t("Flight Test Definitions"),
                                path: "definitions",
                                element: <FlightTestDefinition />,
                            },
                            {
                                label: t("Flight Test Orders"),
                                path: "orders",
                                element: <FlightTestDefinition />,
                            },
                            {
                                label: t("Logs"),
                                path: "logs",
                                element: <Logbook />,
                            },
                            {
                                label: t("Test Points"),
                                path: "test-points",
                                element: <FlightTestDefinition />,
                            },
                            {
                                label: t("Test Point Parameters"),
                                path: "test-point-parameters",
                                element: <FlightTestDefinition />,
                            },
                            {
                                label: t("Test Hazards"),
                                path: "test-hazards",
                                element: <FlightTestDefinition />,
                            },
                            {
                                label: t("Software Configs"),
                                path: "software-configs",
                                element: <Logbook />,
                            },
                            {
                                label: t("FTI Parameters"),
                                path: "instrumentation-parameters",
                                element: <FlightTestInstrumentation />,
                            },
                        ],
                    })
                ) : (
                    <Route path="flight-test-definition/*" element={<FlightTestDefinition />} />
                )}
            </Route>
        </Routes>
    );
};
