import { Box, Icon, IconButton, VStack } from "@volocopter/design-library-react";
import type { LngLatBounds } from "maplibre-gl";
// import needed so that markers stay on their coordinate
// eslint-disable-next-line no-restricted-imports
import "maplibre-gl/dist/maplibre-gl.css";
import type { VoloiqMap, VoloiqMapStoreType } from ".";
import { MapContext } from "../../context/MapContext";
import { MapZoomControl } from "../MapZoomControl/MapZoomControl";
import { MeasurementTool, useToggleMeasurementTool } from "../MeasurementTool";
import { useMap } from "./useMap";

type MapProps = {
    zoom: number;
    testMode?: boolean;
    controlButtons?: React.ReactNode[];
    isSatellite: boolean;
    withMeasurementTool?: boolean;
    focusOn: LngLatBounds;
    withZoomControls?: boolean;
    voloiqMapStore?: VoloiqMapStoreType;
    preserveDrawingBuffer?: boolean;
};

export const Map: FCC<MapProps> = (props) => {
    const {
        zoom,
        children,
        testMode,
        focusOn,
        controlButtons,
        isSatellite,
        withMeasurementTool,
        withZoomControls = true,
        voloiqMapStore,
        preserveDrawingBuffer,
    } = props;
    const { map, mapContainer, isReady } = useMap(zoom, isSatellite, focusOn, testMode, preserveDrawingBuffer);
    const { isMeasurementToolActive, toggleMeasurementTool } = useToggleMeasurementTool();
    if (voloiqMapStore) voloiqMapStore.map = map as VoloiqMap;
    return (
        <Box h="100%" w="100%" ref={mapContainer} data-testid="map-component-test-id" zIndex={0}>
            <MapContext.Provider value={{ map, isReady }}>
                <VStack
                    id="map-control-btn-grp"
                    alignItems="flex-end"
                    position="absolute"
                    right={6}
                    top={28}
                    spacing={2}
                    zIndex={999}
                >
                    {map && withZoomControls && <MapZoomControl map={map} />}
                    {controlButtons && controlButtons.map((controlButton) => controlButton)}
                    {withMeasurementTool && (
                        <IconButton
                            aria-label="toggle-measurement-tool"
                            size="lg"
                            variant={isMeasurementToolActive ? "primary" : "secondary"}
                            onClick={toggleMeasurementTool}
                        >
                            <Icon icon="ruler" />
                        </IconButton>
                    )}
                    {map && isMeasurementToolActive && <MeasurementTool map={map} isReady={isReady} />}
                </VStack>
                {isReady && children}
            </MapContext.Provider>
        </Box>
    );
};
