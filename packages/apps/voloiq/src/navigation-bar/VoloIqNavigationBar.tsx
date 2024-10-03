import {
    Icon,
    NavigationBar,
    NavigationBarActions,
    NavigationBarMenu,
    NavigationBarMenuItem,
    NavigationBarToggleButton,
} from "@volocopter/design-library-react";
import { RequirePermissions } from "@voloiq/auth";
import { useFeatureFlags } from "@voloiq/feature-flags";
import { useNavigate } from "@voloiq/routing";
import { Notifications } from "../microfrontends/Notifications";
import { VoloIqLogo } from "./VoloIqLogo";
import { ColorModeButton } from "./action-buttons/ColorModeButton";
import { DocumentationButton } from "./action-buttons/DocumentationButton";
import { FeedbackButton } from "./action-buttons/FeedbackButton";
import { LogoutButton } from "./action-buttons/LogoutButton";
import { ProtectedNavigationBarMenuEntry } from "./protected-menu-item/ProtectedNavigationBarMenuEntry";
import { ProtectedNavigationBarMenuItem } from "./protected-menu-item/ProtectedNavigationBarMenuItem";
import { useNavigationBarTranslation } from "./translations/useNavigationBarTranslation";
import { useIsMenuEntryActive } from "./useIsMenuEntryActive";

export const VoloIqNavigationBar = () => {
    const { t } = useNavigationBarTranslation();
    const { isFeatureFlagEnabled } = useFeatureFlags();
    const { isActive } = useIsMenuEntryActive();
    const navigateTo = useNavigate();

    return (
        <NavigationBar>
            <VoloIqLogo />
            <NavigationBarMenu>
                <ProtectedNavigationBarMenuItem icon={<Icon icon="layer" />} label={t("resources")}>
                    <ProtectedNavigationBarMenuEntry
                        to="/aircraft-management/aircraft/overview"
                        isActive={isActive("/aircraft-management/aircraft")}
                        label={t("aircraft")}
                        requiresPermissionsFor={["Aircraft"]}
                    />
                    <ProtectedNavigationBarMenuEntry
                        to="/aircraft-management/aircraft-type/overview"
                        isActive={isActive("/aircraft-management/aircraft-type")}
                        label={t("aircraft types")}
                        requiresPermissionsFor={["AircraftType"]}
                    />
                    {isFeatureFlagEnabled("batteryManagement") && (
                        <ProtectedNavigationBarMenuEntry
                            to="/battery-management/batteries"
                            isActive={isActive("/battery-management/batteries")}
                            label={t("batteries")}
                            requiresPermissionsFor={["Battery"]}
                        />
                    )}
                    {isFeatureFlagEnabled("batteryManagement") && (
                        <ProtectedNavigationBarMenuEntry
                            to="/battery-management/esu-type"
                            isActive={isActive("/battery-management/esu-type")}
                            label={t("esu types")}
                            requiresPermissionsFor={["ESUType"]}
                        />
                    )}
                    {isFeatureFlagEnabled("batteryManagement") && (
                        <ProtectedNavigationBarMenuEntry
                            to="/battery-management/esu"
                            isActive={isActive("/battery-management/esu")}
                            label={t("esus")}
                            requiresPermissionsFor={["ESU"]}
                        />
                    )}
                    {isFeatureFlagEnabled("batteryManagement") && (
                        <ProtectedNavigationBarMenuEntry
                            to="/battery-management/charging-profiles"
                            isActive={isActive("/battery-management/charging-profiles")}
                            label={t("charging profiles")}
                            requiresPermissionsFor={["ChargingProfile"]}
                        />
                    )}
                    {isFeatureFlagEnabled("batteryManagement") && (
                        <ProtectedNavigationBarMenuEntry
                            to="/battery-management/charging-stations"
                            isActive={isActive("/battery-management/charging-stations")}
                            label={t("charging stations")}
                            requiresPermissionsFor={["ChargingStation"]}
                        />
                    )}
                    {isFeatureFlagEnabled("batteryManagement") && (
                        <ProtectedNavigationBarMenuEntry
                            to="/battery-management/charging-logs"
                            isActive={isActive("/battery-management/charging-logs")}
                            label={t("charging logs")}
                            requiresPermissionsFor={["ChargingLog"]}
                        />
                    )}
                    {isFeatureFlagEnabled("batteryManagement") && (
                        <ProtectedNavigationBarMenuEntry
                            to="/battery-management/charging-station-slots"
                            isActive={isActive("/battery-management/charging-station-slots")}
                            label={t("charging station slots")}
                            requiresPermissionsFor={["ChargingStationSlot"]}
                        />
                    )}
                    <ProtectedNavigationBarMenuEntry
                        to="/crew-management/crewrole/overview"
                        isActive={isActive("/crew-management/crewrole")}
                        label={t("crew roles")}
                        requiresPermissionsFor={["CrewRole"]}
                    />
                    <ProtectedNavigationBarMenuEntry
                        to="/crew-management/crewmember/overview"
                        isActive={isActive("/crew-management/crewmember")}
                        label={t("crew members")}
                        requiresPermissionsFor={["CrewMember"]}
                    />
                    <ProtectedNavigationBarMenuEntry
                        to="/crew-management/crewschedule"
                        isActive={isActive("/crew-management/crewschedule")}
                        label={t("crew schedule")}
                        requiresPermissionsFor={["CrewMember"]}
                    />
                </ProtectedNavigationBarMenuItem>
                <ProtectedNavigationBarMenuItem icon={<Icon icon="mapPin" />} label={t("locations")}>
                    <ProtectedNavigationBarMenuEntry
                        to="/vertiport-management/region/overview"
                        isActive={isActive("/vertiport-management/region")}
                        label={t("regions")}
                        requiresPermissionsFor={["Region"]}
                    />
                    <ProtectedNavigationBarMenuEntry
                        to="/vertiport-management/vertiport/overview"
                        isActive={isActive("/vertiport-management/vertiport")}
                        label={t("vertiports")}
                        requiresPermissionsFor={["Vertiport"]}
                    />
                </ProtectedNavigationBarMenuItem>
                <ProtectedNavigationBarMenuItem icon={<Icon icon="calendar" />} label={t("planning")}>
                    {isFeatureFlagEnabled("flightPlanning") && (
                        <ProtectedNavigationBarMenuEntry
                            to="/flight-planning"
                            isActive={isActive("/flight-planning")}
                            label={t("routes")}
                            requiresPermissionsFor={["RouteOptions"]}
                        />
                    )}
                    {isFeatureFlagEnabled("flightPlanManagement") && (
                        <ProtectedNavigationBarMenuEntry
                            to="/flight-plan-management/flight-plans"
                            label={t("flight plans")}
                            requiresPermissionsFor={["RouteOptions"]}
                        />
                    )}
                    {isFeatureFlagEnabled("weather") && (
                        <ProtectedNavigationBarMenuEntry
                            to={WEATHER_APP_URL}
                            isExternal
                            label={t("weather")}
                            requiresPermissionsFor={["Weather"]}
                        />
                    )}
                    <ProtectedNavigationBarMenuEntry
                        to="/air-operations/network-scheduling/event/overview"
                        isActive={isActive("/air-operations/network-scheduling/event")}
                        label={t("events")}
                        requiresPermissionsFor={["Event"]}
                    />
                </ProtectedNavigationBarMenuItem>
                <ProtectedNavigationBarMenuItem icon={<Icon icon="reticle" />} label={t("operations")}>
                    {isFeatureFlagEnabled("mission-management") && (
                        <ProtectedNavigationBarMenuEntry
                            to="/air-operations/mission-management/missions"
                            isActive={isActive("/air-operations/mission-management/missions")}
                            label={t("missions")}
                            requiresPermissionsFor={["Mission"]}
                        />
                    )}
                    {isFeatureFlagEnabled("scheduled-mission") && (
                        <ProtectedNavigationBarMenuEntry
                            to="/air-operations/mission-management/schedule"
                            isActive={isActive("/air-operations/mission-management/schedule")}
                            label={t("scheduledMissions")}
                            requiresPermissionsFor={["Mission"]}
                        />
                    )}
                    {isFeatureFlagEnabled("mission-management") && (
                        <ProtectedNavigationBarMenuEntry
                            to="/air-operations/network-scheduling/schedule"
                            isActive={isActive("/air-operations/network-scheduling/schedule")}
                            label={t("aircraftSchedule")}
                            requiresPermissionsFor={["AcTimegrid"]}
                        />
                    )}
                    {isFeatureFlagEnabled("liveweather") && (
                        <ProtectedNavigationBarMenuEntry
                            to={WEATHER_LIVE_APP_URL}
                            isExternal
                            label={t("liveweather")}
                            requiresPermissionsFor={["Weather"]}
                        />
                    )}
                    {isFeatureFlagEnabled("weather-forecast") && (
                        <ProtectedNavigationBarMenuEntry
                            to={WEATHER_FORECAST_APP_URL}
                            isExternal
                            label={t("weather forecast")}
                            requiresPermissionsFor={["WeatherForecast"]}
                        />
                    )}
                    {isFeatureFlagEnabled("battery-dashboard") && (
                        <ProtectedNavigationBarMenuEntry
                            to={BATTERY_DASHBOARD_URL}
                            isExternal
                            label={t("batteryDashboard")}
                            requiresPermissionsFor={["Battery"]}
                        />
                    )}
                    {isFeatureFlagEnabled("flightMonitoring") && (
                        <ProtectedNavigationBarMenuEntry
                            to="/flight-monitoring"
                            isActive={isActive("/flight-monitoring")}
                            label={t("flightMonitoring")}
                            requiresPermissionsFor={["RouteOptions"]}
                        />
                    )}
                </ProtectedNavigationBarMenuItem>
                {isFeatureFlagEnabled("vte-1596") ? (
                    <RequirePermissions
                        resources={[
                            "Log",
                            "SoftwareConfiguration",
                            "Parameter",
                            "FlightTestDefinition",
                            "TestHazard",
                            "TestPointParameter",
                            "TestPoint",
                            "FlightTestOrder",
                        ]}
                        actions={["read"]}
                    >
                        <NavigationBarMenuItem
                            icon={<Icon icon="cogSignal" />}
                            label={t("flight test suite")}
                            isActive={isActive("/flight-test-suite")}
                            onClick={() => {
                                navigateTo("/flight-test-suite");
                            }}
                        />
                    </RequirePermissions>
                ) : (
                    <ProtectedNavigationBarMenuItem icon={<Icon icon="cogSignal" />} label={t("engineering")}>
                        <ProtectedNavigationBarMenuEntry
                            to="/logbook/overview"
                            isActive={isActive("/logbook/overview")}
                            label={t("logs")}
                            requiresPermissionsFor={["Log"]}
                        />
                        {!isFeatureFlagEnabled("vte-1103-hide-software-configs-nav-button") && (
                            <ProtectedNavigationBarMenuEntry
                                to="/logbook/software-configurations"
                                isActive={isActive("/logbook/software-configurations")}
                                label={t("configurations")}
                                requiresPermissionsFor={["SoftwareConfiguration"]}
                            />
                        )}
                        <ProtectedNavigationBarMenuEntry
                            to="/flight-test-instrumentation"
                            isActive={isActive("/flight-test-instrumentation")}
                            label={t("parameters")}
                            requiresPermissionsFor={["Parameter"]}
                        />
                        <ProtectedNavigationBarMenuEntry
                            to="/flight-test-definition/overview"
                            isActive={isActive("/flight-test-definition/overview")}
                            label={t("definitions")}
                            requiresPermissionsFor={["FlightTestDefinition"]}
                        />
                        {isFeatureFlagEnabled("vte-1302") && (
                            <ProtectedNavigationBarMenuEntry
                                to="/flight-test-definition/test-hazard-analysis/overview"
                                isActive={isActive("/flight-test-definition/test-hazard-analysis/overview")}
                                label={t("testHazards")}
                                requiresPermissionsFor={["TestHazard"]}
                            />
                        )}
                        <ProtectedNavigationBarMenuEntry
                            to="/flight-test-definition/parameter/overview"
                            isActive={isActive("/flight-test-definition/parameter/overview")}
                            label={t("test point parameters")}
                            requiresPermissionsFor={["TestPointParameter"]}
                        />

                        <ProtectedNavigationBarMenuEntry
                            to="/flight-test-definition/test-points/overview"
                            isActive={isActive("/flight-test-definition/test-points/overview")}
                            label={t("test points")}
                            requiresPermissionsFor={["TestPoint"]}
                        />
                        {isFeatureFlagEnabled("vte-969") && (
                            <ProtectedNavigationBarMenuEntry
                                to="/flight-test-definition/flight-test-orders/overview"
                                isActive={isActive("/flight-test-definition/flight-test-orders/overview")}
                                label={t("flight test orders")}
                                requiresPermissionsFor={["FlightTestOrder"]}
                            />
                        )}
                    </ProtectedNavigationBarMenuItem>
                )}
                <ProtectedNavigationBarMenuItem icon={<Icon icon="shoppingCart" />} label={t("sales")}>
                    <ProtectedNavigationBarMenuEntry
                        to="/booking-management/booking"
                        isActive={isActive("/booking-management/booking")}
                        label={t("bookings")}
                        requiresPermissionsFor={["BookingManagement"]}
                    />
                    <ProtectedNavigationBarMenuEntry
                        to="/commercial-scheduling/plan"
                        isActive={isActive("/commercial-scheduling/plan")}
                        label={t("commercialPlans")}
                        requiresPermissionsFor={["CommercialPlan"]}
                    />
                    <ProtectedNavigationBarMenuEntry
                        to="/commercial-scheduling/connection"
                        isActive={isActive("/commercial-scheduling/connection")}
                        label={t("connections")}
                        requiresPermissionsFor={["Connection"]}
                    />
                </ProtectedNavigationBarMenuItem>
            </NavigationBarMenu>
            {isFeatureFlagEnabled("notifications") && <Notifications />}
            <NavigationBarActions>
                {isFeatureFlagEnabled("documentation-button") && <DocumentationButton />}
                {isFeatureFlagEnabled("feedback-button") && <FeedbackButton />}
                {isFeatureFlagEnabled("colorModeControl") && <ColorModeButton />}
                <LogoutButton />
                <NavigationBarToggleButton showLabel={t("show menu bar")} hideLabel={t("hide menu bar")} />
            </NavigationBarActions>
        </NavigationBar>
    );
};
