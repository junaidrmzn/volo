import type { Route } from "@voloiq-typescript-api/flight-planning-types";
import type { RouteEnergySettings } from "./routeEnergySettings";

export type SocSidebarContext = {
    selectedRoute: Route;
    socSettings: RouteEnergySettings;
    setSocSettings: (socSettings: RouteEnergySettings) => void;
    closeRightSidebar: () => void;
};
