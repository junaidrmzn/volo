import { Box } from "@volocopter/design-library-react";
import { Route } from "@voloiq/flight-planning-api/v1";
import { VoloiqMapStoreType } from "@voloiq/map";
import { LoadingSpinner } from "../../../components";
import { useSelectedRouteSequenceIndex } from "../../../features/selected-route-sequence-index/index";
import { AirspaceOption } from "../../../features/vertical-profile/airspaces/types";
import { useVerticalProfile } from "../../../features/vertical-profile/useVerticalProfile";

type VerticalProfileNewProps = {
    showAirspaces: boolean;
    selectedRoute: Route;
    airspacesAltitudeRange: [number, number];
    selectedAirspaceOptions: AirspaceOption[];
    voloiqMapStore?: VoloiqMapStoreType;
};

export const VerticalProfileNew = (props: VerticalProfileNewProps) => {
    const { selectedRouteSequenceIndex, setSelectedRouteSequenceIndex } = useSelectedRouteSequenceIndex();
    const { showAirspaces, selectedRoute, airspacesAltitudeRange, selectedAirspaceOptions, voloiqMapStore } = props;

    const setSelectedWaypointIndex = (index: number) => {
        if (selectedRouteSequenceIndex !== index) {
            setSelectedRouteSequenceIndex(index);
        }
    };
    const { chartRef, isLoading } = useVerticalProfile({
        selectedWaypointIndex: selectedRouteSequenceIndex,
        setSelectedWaypointIndex,
        selectedRoute,
        showAirspaces,
        airspacesAltitudeRange,
        selectedAirspaceOptions,
        voloiqMapStore,
    });

    return (
        <>
            {isLoading && (
                <Box zIndex={9999} pos="absolute" top="50%" left="50%" transform="translate(-50%, -50%)">
                    <LoadingSpinner />
                </Box>
            )}

            <Box ref={chartRef} w="100%" h="100%" data-testid="vertical-profile" />
        </>
    );
};
