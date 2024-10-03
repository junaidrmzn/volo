import { useFeatureFlags } from "@voloiq/feature-flags";
import { Navigate, ProtectedRoute, RootRoutes, Route, Routes } from "@voloiq/routing";
import { ServiceProvider } from "@voloiq/service";
import { QueryClientProvider } from "./QueryClientProvider";
import { DefinitionOverview } from "./definition-overview/DefinitionOverview";
import { DefinitionDetails } from "./definition-overview/definition-details/DefinitionDetails";
import { ChangesReview } from "./definition-overview/definition-details/changes-review/ChangesReview";
import { ProceduresDetails } from "./definition-overview/definition-details/flight-ground-test-plan/procedures/procedures-details/ProceduresDetails";
import { FlightTestOrderOverview } from "./flight-test-order-overview/FlightTestOrderOverview";
import { FlightTestOrderDetailsRouteElement } from "./flight-test-order-overview/flight-test-order-details/FlightTestOrderDetailsRouteElement";
import { FlightTestOrderDetailsRouteElementV2 } from "./flight-test-order-overview/flight-test-order-details/FlightTestOrderDetailsRouteElementV2";
import { TestPointSequenceDetailsRouteElement } from "./flight-test-order-overview/flight-test-order-details/test-mission/test-point-selection/test-point-sequence-details/TestPointSequenceDetailsRouteElement";
import { ParameterOverview } from "./parameter-overview/ParameterOverview";
import { TestHazardAssessmentOverview } from "./test-hazard-analysis-overview/TestHazardAssessmentOverview";
import { TestPointOverview } from "./test-point-overview/TestPointOverview";

export const AppWithoutProvider = () => {
    const { isFeatureFlagEnabled } = useFeatureFlags();

    return (
        <RootRoutes>
            <Route
                path="/flight-test-suite/definitions"
                element={
                    <ProtectedRoute resources={["FlightTestDefinition"]}>
                        <DefinitionOverview />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/flight-test-suite/definitions/:definitionId/changes-review/:referenceId"
                element={<ChangesReview />}
            />
            <Route
                path="/flight-test-suite/definitions/:definitionId/readonly/:revisionId"
                element={<ChangesReview />}
            />
            <Route
                path="/flight-test-suite/definitions/:definitionId/readonly/:revisionId/procedures/:procedureId"
                element={<ChangesReview />}
            />
            <Route path="/flight-test-suite/definitions/:definitionId/*" element={<DefinitionDetails />} />
            <Route
                path="/flight-test-suite/definitions/:definitionId/procedures/:procedureId"
                element={<ProceduresDetails />}
            />
            <Route
                path="/flight-test-suite/test-point-parameters/*"
                element={
                    <ProtectedRoute resources={["TestPointParameter"]}>
                        <ParameterOverview />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/flight-test-suite/test-hazards/*"
                element={
                    <ProtectedRoute resources={["TestHazard"]}>
                        <TestHazardAssessmentOverview />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/flight-test-suite/test-points/*"
                element={
                    <ProtectedRoute resources={["TestPoint"]}>
                        <TestPointOverview />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/flight-test-suite/orders/*"
                element={
                    <ProtectedRoute resources={["FlightTestOrder"]}>
                        <FlightTestOrderOverview />
                    </ProtectedRoute>
                }
            />
            {isFeatureFlagEnabled("vte-1506") ? (
                <Route
                    path="/flight-test-suite/orders/:flightTestOrderId/*"
                    element={<FlightTestOrderDetailsRouteElementV2 />}
                />
            ) : (
                <Route
                    path="/flight-test-suite/orders/:flightTestOrderId/*"
                    element={<FlightTestOrderDetailsRouteElement />}
                />
            )}
            <Route
                path="/flight-test-suite/orders/:flightTestOrderId/test-point-sequence/:testPointSequenceId"
                element={<TestPointSequenceDetailsRouteElement />}
            />
        </RootRoutes>
    );
};

const OldAppWithoutProvider = () => {
    const { isFeatureFlagEnabled } = useFeatureFlags();

    return (
        <Routes>
            <Route index element={<Navigate to="overview" />} />
            <Route
                path="parameter/overview/*"
                element={
                    <ProtectedRoute resources={["TestPointParameter"]}>
                        <ParameterOverview />
                    </ProtectedRoute>
                }
            />
            <Route
                path="overview/*"
                element={
                    <ProtectedRoute resources={["FlightTestDefinition"]}>
                        <DefinitionOverview />
                    </ProtectedRoute>
                }
            />
            <Route
                path="test-hazard-analysis/overview/*"
                element={
                    <ProtectedRoute resources={["TestHazard"]}>
                        <TestHazardAssessmentOverview />
                    </ProtectedRoute>
                }
            />
            <Route
                path="test-points/overview/*"
                element={
                    <ProtectedRoute resources={["TestPoint"]}>
                        <TestPointOverview />
                    </ProtectedRoute>
                }
            />
            <Route
                path="flight-test-orders/overview/*"
                element={
                    <ProtectedRoute resources={["FlightTestOrder"]}>
                        <FlightTestOrderOverview />
                    </ProtectedRoute>
                }
            />
            {isFeatureFlagEnabled("vte-1506") ? (
                <Route
                    path="flight-test-orders/overview/:flightTestOrderId/*"
                    element={<FlightTestOrderDetailsRouteElementV2 />}
                />
            ) : (
                <Route
                    path="flight-test-orders/overview/:flightTestOrderId/*"
                    element={<FlightTestOrderDetailsRouteElement />}
                />
            )}
            <Route
                path="flight-test-orders/overview/:flightTestOrderId/test-point-sequence/:testPointSequenceId"
                element={<TestPointSequenceDetailsRouteElement />}
            />
            <Route path="overview/:definitionId/changes-review/:referenceId" element={<ChangesReview />} />

            <Route path="overview/:definitionId/readonly/:revisionId" element={<ChangesReview />} />
            <Route
                path="overview/:definitionId/readonly/:revisionId/procedures/:procedureId"
                element={<ChangesReview />}
            />
            <Route path="overview/:definitionId/*" element={<DefinitionDetails />} />
            <Route path="overview/:definitionId/procedures/:procedureId" element={<ProceduresDetails />} />
        </Routes>
    );
};

export const App = () => {
    const { isFeatureFlagEnabled } = useFeatureFlags();

    const ftdLoggingOptions = {
        teamName: "FTD",
        serviceName: "ftdFrontend",
    };

    return (
        <ServiceProvider baseUrl={BACKEND_BASE_URL} logging={ftdLoggingOptions} withAuth>
            <QueryClientProvider>
                {isFeatureFlagEnabled("vte-1596") ? <AppWithoutProvider /> : <OldAppWithoutProvider />}
            </QueryClientProvider>
        </ServiceProvider>
    );
};
