import { Box, VStack } from "@volocopter/design-library-react";
import { LngLat, LngLatBounds } from "maplibre-gl";
import { Map } from "@voloiq/map";
import type { Vertiport } from "@voloiq/vertiport-management-api/v1";
import { VoloportMarker } from "./VoloportMarker";

type VertiportDetailGeneralProps = {
    vertiport: Vertiport;
};
export const VertiportDetailHeader = (props: VertiportDetailGeneralProps) => {
    const { vertiport } = props;

    const romeVoloportCoordinates: LngLat = new LngLat(vertiport.location.longitude, vertiport.location.latitude);

    return (
        <VStack height="-moz-max-content" width="-moz-max-content">
            <Box w="100%" h="35vh">
                <Map zoom={12} isSatellite focusOn={LngLatBounds.fromLngLat(romeVoloportCoordinates, 10_000)}>
                    <VoloportMarker coords={romeVoloportCoordinates} />
                </Map>
            </Box>
        </VStack>
    );
};
