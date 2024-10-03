import { Navigate, Outlet, ProtectedRoute, Route, Routes } from "@voloiq/routing";
import { ServiceProvider } from "@voloiq/service";
import { BatteryOverview } from "./battery/BatteryOverview";
import { CreateBattery } from "./battery/create/CreateBattery";
import { EditBattery } from "./battery/edit/EditBattery";
import { ChargingLogOverview } from "./charging-log/ChargingLogOverview";
import { ChargingProfileOverview } from "./charging-profile/ChargingProfileOverview";
import { CreateChargingProfile } from "./charging-profile/create/CreateChargingProfile";
import { EditChargingProfile } from "./charging-profile/edit/EditChargingProfile";
import { ChargingStationSlotOverview } from "./charging-station-slot/ChargingStationSlotOverview";
import { ChargingStationOverview } from "./charging-station/ChargingStationOverview";
import { EsuTypeOverview } from "./esu-type/EsuTypeOverview";
import { CreateEsuType } from "./esu-type/create/CreateEsuType";
import { EditEsuType } from "./esu-type/edit/EditEsuType";
import { EsuOverview } from "./esu/EsuOverview";
import { CreateEsu } from "./esu/create/CreateEsu";
import { EditEsu } from "./esu/edit/EditEsu";

if (process.env.WITH_MOCKS) {
    // eslint-disable-next-line global-require, unicorn/prefer-module
    require("./mocks/browser");
}

export const App = () => (
    <ServiceProvider baseUrl={`${BACKEND_BASE_URL}`}>
        <Routes>
            <Route path="esu-type" element={<Outlet />}>
                <Route
                    index
                    element={
                        <ProtectedRoute resources={["ESUType"]}>
                            <EsuTypeOverview />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="create"
                    element={
                        <ProtectedRoute resources={["ESUType"]} actions={["create"]}>
                            <CreateEsuType />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="edit/:esuTypeId"
                    element={
                        <ProtectedRoute resources={["ESUType"]} actions={["update"]}>
                            <EditEsuType />{" "}
                        </ProtectedRoute>
                    }
                />
            </Route>
            <Route path="esu" element={<Outlet />}>
                <Route
                    index
                    element={
                        <ProtectedRoute resources={["ESU"]}>
                            <EsuOverview />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="create"
                    element={
                        <ProtectedRoute resources={["ESU"]} actions={["create"]}>
                            <CreateEsu />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="edit/:esuId"
                    element={
                        <ProtectedRoute resources={["ESU"]} actions={["update"]}>
                            <EditEsu />
                        </ProtectedRoute>
                    }
                />
            </Route>
            <Route path="charging-profiles" element={<Outlet />}>
                <Route
                    index
                    element={
                        <ProtectedRoute resources={["ChargingProfile"]}>
                            <ChargingProfileOverview />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="create"
                    element={
                        <ProtectedRoute resources={["ChargingProfile"]} actions={["create"]}>
                            <CreateChargingProfile />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="edit/:chargingProfileId"
                    element={
                        <ProtectedRoute resources={["ChargingProfile"]} actions={["update"]}>
                            <EditChargingProfile />
                        </ProtectedRoute>
                    }
                />
            </Route>
            <Route path="batteries" element={<Outlet />}>
                <Route
                    index
                    element={
                        <ProtectedRoute resources={["Battery"]}>
                            <BatteryOverview />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="create"
                    element={
                        <ProtectedRoute resources={["Battery"]} actions={["create"]}>
                            <CreateBattery />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="edit/:batteryId"
                    element={
                        <ProtectedRoute resources={["Battery"]} actions={["update"]}>
                            <EditBattery />
                        </ProtectedRoute>
                    }
                />
            </Route>
            <Route path="charging-stations" element={<Outlet />}>
                <Route
                    index
                    element={
                        <ProtectedRoute resources={["ChargingStation"]}>
                            <ChargingStationOverview />
                        </ProtectedRoute>
                    }
                />
            </Route>
            <Route path="charging-logs" element={<Outlet />}>
                <Route
                    index
                    element={
                        <ProtectedRoute resources={["ChargingLog"]}>
                            <ChargingLogOverview />
                        </ProtectedRoute>
                    }
                />
            </Route>
            <Route path="charging-station-slots" element={<Outlet />}>
                <Route
                    index
                    element={
                        <ProtectedRoute resources={["ChargingStationSlot"]}>
                            <ChargingStationSlotOverview />
                        </ProtectedRoute>
                    }
                />
            </Route>
            <Route path="*" element={<Navigate to="/esu" replace />} />
        </Routes>
    </ServiceProvider>
);
