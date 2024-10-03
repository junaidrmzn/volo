import { Box, ButtonGroup } from "@volocopter/design-library-react";
import { LngLat, LngLatBounds } from "maplibre-gl";
import { Map } from "@voloiq/map";
import { AircraftMarker } from "../AircraftMarker";
import { useAircraftWebsocketData } from "../AircraftMarker/hooks";
import { AircraftSelect } from "../AircraftSelect";
import { BirdMarker } from "../BirdMarker/BirdMarker";
import { useBirdData } from "../BirdMarker/useBirdData";
import { BottomPanel } from "../BottomPanel";
import { FlightInformationPanel } from "../FlightInformationPanel/FlightInformationPanel";
import { LeftPanel } from "../LeftPanel/LeftPanel";
import { LocateAircraftButton } from "../LocateAircraftButton";
import { FlightPathLayer } from "../MapFlightPathLayer";
import { useShowFlightPath } from "../MapFlightPathLayer/hooks";
import { PlannedRoutePathLayer } from "../MapPlannedRoutePathLayer";
import { TelemetryPanel } from "../TelemetryPanel";
import { ToggleFocusAircraftButton } from "../ToggleFocusAircraftButton";
import { VerticalProfile } from "../VerticalProfile";
import { VoloportMarker } from "../VoloportMarker";
import { useActiveFlight } from "./useActiveFlight";
import { useBearing } from "./useBearing";
import { useMonitoring } from "./useMonitoring";

export const Monitoring = () => {
    const {
        isAircraftCentered,
        toggleAircraftCentered,
        setAircraftCentered,
        selectedAircraftId,
        setSelectedAircraftId,
    } = useMonitoring();
    const { flightPathTelemetryData, getCurrentPosition } = useAircraftWebsocketData(selectedAircraftId);
    const validFlightPathDataStream = flightPathTelemetryData.length > 0 && flightPathTelemetryData[0]?.timestamp;
    const { bearing } = useBearing(flightPathTelemetryData);
    const { birdMonitoringData } = useBirdData();

    const { showFlightPath, setShowFlightPath } = useShowFlightPath();
    const controlButtons = [
        <ButtonGroup isVertical isAttached key="buttonGroup">
            <ToggleFocusAircraftButton
                key="toggleFocusMapButton"
                toggleAircraftCentered={toggleAircraftCentered}
                setShowFlightPath={setShowFlightPath}
            />
            <LocateAircraftButton key="locateMapButton" isDisabled={isAircraftCentered} coords={getCurrentPosition()} />
        </ButtonGroup>,
    ];
    const romeVoloportCoordinates: LngLat = new LngLat(12.274_194, 41.795_639);

    const { activeFlight, plannedRouteCoords } = useActiveFlight(selectedAircraftId);

    return (
        <Box w="100%" h="100%">
            <AircraftSelect selectedAircraftId={selectedAircraftId} setSelectedAircraftId={setSelectedAircraftId} />
            <Map
                zoom={12}
                isSatellite
                focusOn={LngLatBounds.fromLngLat(romeVoloportCoordinates, 10_000)}
                controlButtons={controlButtons}
            >
                <VoloportMarker coords={romeVoloportCoordinates} />

                {birdMonitoringData &&
                    birdMonitoringData.map((birdData) => (
                        <BirdMarker key={`birdItem-${birdData.coords}`} coords={birdData.coords} type={birdData.type} />
                    ))}

                {selectedAircraftId && (
                    <AircraftMarker
                        coords={getCurrentPosition()}
                        bearing={bearing}
                        isCentered={isAircraftCentered}
                        setIsCentered={setAircraftCentered}
                        setShowFlightPath={setShowFlightPath}
                    />
                )}
                {selectedAircraftId && showFlightPath && validFlightPathDataStream && (
                    <>
                        <FlightPathLayer
                            flightPath={flightPathTelemetryData.map(
                                (message) => new LngLat(message.lng!, message.lat!)
                            )}
                            flightId={selectedAircraftId}
                        />
                        {plannedRouteCoords && (
                            <PlannedRoutePathLayer
                                flightPath={plannedRouteCoords.map(
                                    (lngLatCoordinates: number[]) =>
                                        new LngLat(lngLatCoordinates[0]!, lngLatCoordinates[1]!)
                                )}
                                flightId={selectedAircraftId}
                            />
                        )}
                    </>
                )}
            </Map>
            {selectedAircraftId && activeFlight && validFlightPathDataStream && (
                <>
                    <LeftPanel>
                        <FlightInformationPanel
                            startTime={flightPathTelemetryData[0]?.timestamp!}
                            flight={activeFlight}
                        />
                        {selectedAircraftId && validFlightPathDataStream && (
                            <TelemetryPanel data={flightPathTelemetryData} />
                        )}
                    </LeftPanel>
                    <BottomPanel>
                        <VerticalProfile data={flightPathTelemetryData} />
                    </BottomPanel>
                </>
            )}
        </Box>
    );
};
