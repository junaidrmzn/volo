import { Box, HStack, Icon, IconButton, useDisclosure } from "@volocopter/design-library-react";
import type { CsflSite } from "@voloiq-typescript-api/flight-planning-types";
import { Fragment } from "react";
import { useFeatureFlags } from "@voloiq/feature-flags";
import { useGetRouteOptionQuery } from "@voloiq/flight-planning-api/v1";
import { Map, VoloiqMapStoreType, useSatelliteStyleFlag } from "@voloiq/map";
import { Outlet, useLocation } from "@voloiq/routing";
import { useGetRouteFullEnergy } from "../../api-hooks";
import { BottomPanel, ErrorPage, LeftPanel as LeftPanelOld, LoadingSpinner } from "../../components";
import { useFlightStatusContext } from "../../contexts/flight-status";
import { Header, LeftPanel } from "../../route-options/left-panel";
import { VerticalProfileNew } from "../../route-options/left-panel/modal-popups/VerticalProfileNew";
import { RightPanel } from "../../route-options/right-panel/RightPanel";
import { useAirspaces } from "../airspaces/layer";
import { AirspaceLayer } from "../airspaces/layer/AirspaceLayer";
import { ToggleAirspaceListButton } from "../airspaces/list";
import { ToggleAlertsListButton } from "../alerts-list";
import { CsflSitesLayer } from "../csfl";
import { useDisplayedRoutes } from "../displayed-routes";
import { RouteOptionMetaInfo } from "../flight-meta-info";
import { FlightStatusBar } from "../flight-status-bar";
import { DisplayedRouteLayer } from "../map-displayed-route-layer";
import { NotamLayerWrapper } from "../map-notam-layer";
import { RouteLayer } from "../map-route-layer/RouteLayer";
import { RouteTemplateLayer, useRouteTemplatePreview } from "../map-route-template-layer";
import { VfrLayer } from "../map-vfr-layer";
import { VoloportMarker } from "../map-voloport-marker";
import { ToggleNotamListButton } from "../notam-list";
import { RouteComparisonToggleButtons } from "../route-comparison";
import { RoutesPanel } from "../routes-panel";
import { useSelectedRoute } from "../selected-route";
import { StateOfChargePanel, ToggleEnergySettingsButton, ToggleSocPanelButton } from "../state-of-charge";
import { VerticalProfile } from "../vertical-profile";
import { ToggleVfrListButton } from "../vfr-list";
import { MapLayerDialog } from "./components/MapLayerDialog";
import { MapLayerToggleButton } from "./components/MapLayerToggleButton";
import {
    useFocusBounds,
    useRefocusCallback,
    useRightPanelContent,
    useRightSidebar,
    useShowAirspaces,
    useShowCsflSites,
    useShowNotam,
    useShowVfr,
    useSocSettings,
    useUpdateFlightStatus,
} from "./hooks";

export const RouteOptionOverview = (props: { preserveDrawingBuffer?: boolean }) => {
    const { preserveDrawingBuffer } = props;
    const { displayedRoutes, routes } = useDisplayedRoutes();
    const { selectedRoute, routeOptionId } = useSelectedRoute();

    const routeOptionQuery = useGetRouteOptionQuery({
        routeOptionId,
        isEnabled: !!routeOptionId,
    });
    const { selectedSite, setSelectedSite, setShowCsflSites, showCsflSites } = useShowCsflSites();

    const { handleRefocusCallback } = useRefocusCallback(displayedRoutes, routeOptionQuery.data);

    const { rightPanelContent, toggleShowMapLayerPanel, toggleShowSocPanel, isAlertExist } = useRightPanelContent();
    const { previewedTemplate, onSelectRouteTemplatePreview, resetRouteTemplatePreview } = useRouteTemplatePreview();

    const [isSatellite, setSatellite] = useSatelliteStyleFlag();
    const { showNotam, setShowNotam } = useShowNotam();
    const { showAirspaces, setShowAirspaces } = useShowAirspaces();
    const { showVfr, setShowVfr, selectedVfrLayers, handleVfrLayerSelection } = useShowVfr();
    const { isOpen: showDeviationFromPlannedRoute, onToggle: onToggleShowDeviationFromPlannedRoute } = useDisclosure();
    const { isOpen: showConductedRoute, onToggle: onToggleShowConductedRoute } = useDisclosure();

    const { setSelectedAirspaceOptions, altitudeRange, selectedAirspaceOptions, changeAltitudeRange } = useAirspaces();
    const {
        toggleRouteTemplateList,
        toggleSocSettings,
        toggleNotamList,
        toggleAlertsList,
        toggleAirspaceList,
        closeRightSidebar,
        toggleCsflSite,
        toggleVfrList,
    } = useRightSidebar(resetRouteTemplatePreview, setShowNotam);

    const { socSettings, setSocSettings } = useSocSettings();
    const location = useLocation();
    const { isFeatureFlagEnabled } = useFeatureFlags();
    const isNewUIDesign = isFeatureFlagEnabled("ui-redesign");

    const { setFlightStatus } = useFlightStatusContext();
    const { invalidateFullEnergyCache } = useGetRouteFullEnergy(selectedRoute?.id, false, setFlightStatus);
    const voloiqMapStore: VoloiqMapStoreType = {};
    useUpdateFlightStatus(selectedRoute);

    const controlButtons = [
        <IconButton
            key="toggleRouteTemplateList"
            variant="secondary"
            onClick={toggleRouteTemplateList}
            isActive={location.pathname.endsWith("/templates")}
            size="lg"
            aria-label="Toggle Route Template List"
            data-testid="toggle-route-template-list-button"
        >
            <Icon icon="copy" />
        </IconButton>,
        <ToggleNotamListButton
            key="toggleNotamList"
            handleClick={toggleNotamList}
            isActive={location.pathname.endsWith("/notams")}
        />,
        <ToggleAlertsListButton
            key="toggleAlertsList"
            handleClick={toggleAlertsList}
            isActive={location.pathname.endsWith("/alerts")}
            disabled={!selectedRoute}
        />,
        <ToggleSocPanelButton
            key="toggleEnergyConsumptionPanel"
            handleClick={async () => {
                toggleShowSocPanel();
                if (rightPanelContent !== "stateOfChargePanel") {
                    invalidateFullEnergyCache();
                }
            }}
            isActive={rightPanelContent === "stateOfChargePanel"}
            disabled={!selectedRoute || isAlertExist}
        />,
        <ToggleEnergySettingsButton
            key="toggleEnergySettings"
            handleClick={() => {
                toggleSocSettings();
            }}
            isActive={location.pathname.endsWith("/soc-settings")}
            disabled={!selectedRoute}
        />,
        <MapLayerToggleButton
            key="toggleMapLayerSwitch"
            handleClick={() => toggleShowMapLayerPanel()}
            isActive={rightPanelContent === "mapLayerPanel"}
        />,
        <ToggleVfrListButton
            key="toggleVfrListe"
            handleClick={toggleVfrList}
            isActive={location.pathname.endsWith("/vfrlayers")}
            disabled={!showVfr}
        />,
        <ToggleAirspaceListButton
            key="toggleAirspaceList"
            handleClick={toggleAirspaceList}
            isActive={location.pathname.endsWith("/airspaces")}
            disabled={!showAirspaces}
        />,
    ];

    const getRouteLayers = () => {
        return [
            ...displayedRoutes
                .filter((route) => route !== selectedRoute)
                .map((route) => (
                    <Fragment key={`route-layer-${route.id}-${route.createdAt}`}>
                        <DisplayedRouteLayer route={route} />
                    </Fragment>
                )),
            selectedRoute && (
                <Fragment key={`route-layer-${selectedRoute.id}-${selectedRoute.createdAt}`}>
                    <RouteLayer route={selectedRoute} />
                </Fragment>
            ),
        ];
    };

    const openCsflDetails = (site: CsflSite) => {
        setSelectedSite(site);
        toggleCsflSite();
    };

    const { bounds } = useFocusBounds();

    if (routeOptionQuery.isLoading) return <LoadingSpinner />;

    if (routeOptionQuery.isError) return <ErrorPage error="Error fetching flight" />;

    return (
        <HStack w="100%" h="100%" spacing={0}>
            <Box position="relative" flexGrow={1} h="100%">
                <Map
                    zoom={12}
                    controlButtons={
                        isNewUIDesign
                            ? [
                                  <MapLayerToggleButton
                                      key="toggleMapLayerSwitch"
                                      handleClick={() => toggleShowMapLayerPanel()}
                                      isActive={rightPanelContent === "mapLayerPanel"}
                                  />,
                              ]
                            : controlButtons
                    }
                    isSatellite={isSatellite}
                    focusOn={bounds}
                    withMeasurementTool
                    voloiqMapStore={voloiqMapStore}
                    preserveDrawingBuffer={preserveDrawingBuffer}
                >
                    <VoloportMarker coords={routeOptionQuery.data!.arrivalExternalVertiport} />
                    <VoloportMarker coords={routeOptionQuery.data!.departureExternalVertiport} />
                    {getRouteLayers()}
                    {selectedRoute && (
                        <CsflSitesLayer
                            key="csfl-sites-layer"
                            selectedRoute={selectedRoute}
                            onSiteClick={openCsflDetails}
                            showCsflSites={showCsflSites}
                        />
                    )}
                    {previewedTemplate && <RouteTemplateLayer routeTemplate={previewedTemplate} />}
                    {showNotam && <NotamLayerWrapper />}

                    {showAirspaces && altitudeRange && selectedAirspaceOptions && (
                        <AirspaceLayer
                            altitudeRange={altitudeRange}
                            selectedAirspaceOptions={selectedAirspaceOptions}
                            isSatellite={isSatellite}
                        />
                    )}
                    {showVfr && selectedVfrLayers?.length > 0 && (
                        <VfrLayer tilesets={selectedVfrLayers} isSatellite={isSatellite} />
                    )}
                </Map>
                {isNewUIDesign ? (
                    <>
                        <Header />
                        <LeftPanel />
                        <RightPanel />
                        {selectedRoute && routeOptionId && (
                            <BottomPanel>
                                <VerticalProfileNew
                                    showAirspaces={showAirspaces}
                                    selectedRoute={selectedRoute}
                                    airspacesAltitudeRange={altitudeRange}
                                    selectedAirspaceOptions={selectedAirspaceOptions}
                                    voloiqMapStore={voloiqMapStore}
                                />
                            </BottomPanel>
                        )}
                    </>
                ) : (
                    <LeftPanelOld>
                        <RouteOptionMetaInfo />
                        <RoutesPanel
                            routes={routes}
                            resetRouteTemplatePreview={resetRouteTemplatePreview}
                            toggleRouteTemplateList={toggleRouteTemplateList}
                            handleRefocusCallback={handleRefocusCallback}
                            voloiqMapStore={voloiqMapStore}
                        />
                    </LeftPanelOld>
                )}
                {selectedRoute && !isFeatureFlagEnabled("ui-redesign") && <FlightStatusBar route={selectedRoute} />}
                {selectedRoute && routeOptionId && !isFeatureFlagEnabled("ui-redesign") && (
                    <BottomPanel>
                        <VerticalProfile
                            showAirspaces={showAirspaces}
                            selectedRoute={selectedRoute}
                            airspacesAltitudeRange={altitudeRange}
                            selectedAirspaceOptions={selectedAirspaceOptions}
                            voloiqMapStore={voloiqMapStore}
                        />
                    </BottomPanel>
                )}

                {rightPanelContent === "stateOfChargePanel" && selectedRoute && !isAlertExist && (
                    <StateOfChargePanel
                        handleClose={() => {
                            toggleShowSocPanel();
                            closeRightSidebar();
                        }}
                    />
                )}
                {rightPanelContent === "mapLayerPanel" && (
                    <MapLayerDialog
                        handleClose={toggleShowMapLayerPanel}
                        handleToggleSatellite={() => setSatellite(!isSatellite)}
                        isSatellite={isSatellite}
                        selectedRoute={selectedRoute}
                        showNotam={showNotam}
                        handleShowNotam={() => {
                            if (location.pathname.endsWith("/notams")) {
                                closeRightSidebar();
                            }
                            setShowNotam(!showNotam);
                        }}
                        showCsflSites={showCsflSites}
                        handleShowCsflSites={() => setShowCsflSites(!showCsflSites)}
                        showAirspaces={showAirspaces}
                        toggleAirspaces={() => {
                            setShowAirspaces((showAirspaces) => !showAirspaces);
                            toggleAirspaceList();
                        }}
                        showVfr={showVfr}
                        toggleVfr={() => {
                            setShowVfr((vfr) => !vfr);
                            toggleVfrList();
                        }}
                    >
                        <RouteComparisonToggleButtons
                            showConductedRoute={showConductedRoute}
                            onToggleShowConductedRoute={onToggleShowConductedRoute}
                            showDeviationFromPlannedRoute={showDeviationFromPlannedRoute}
                            onToggleShowDeviationFromPlannedRoute={onToggleShowDeviationFromPlannedRoute}
                            routeId={selectedRoute?.id || 0}
                        />
                    </MapLayerDialog>
                )}
            </Box>
            <Outlet
                context={{
                    socSettings,
                    setSocSettings,
                    onSelectRouteTemplatePreview,
                    previewedTemplate,
                    closeRightSidebar,
                    selectedSite,
                    selectedRoute,
                    selectedAirspaceOptions,
                    showAirspaces,
                    setSelectedAirspaceOptions,
                    altitudeRange,
                    changeAltitudeRange,
                    selectedVfrLayers,
                    handleVfrLayerSelection,
                    showVfr,
                }}
            />
        </HStack>
    );
};
