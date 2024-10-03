import { useColorModeValue } from "@volocopter/design-library-react";
import type { LngLat } from "maplibre-gl";
import { useDisplayFlightPathLayer } from "./hooks";

type FlightPathLayerProps = {
    flightPath: LngLat[];
    flightId: string | number;
};

export const PlannedRoutePathLayer = (props: FlightPathLayerProps) => {
    const { flightPath, flightId } = props;
    const selectedAircraftFlightPathColor: string = useColorModeValue("#B2B8C4", "#B2B8C4");
    useDisplayFlightPathLayer(flightPath, flightId, selectedAircraftFlightPathColor);
    return null;
};
