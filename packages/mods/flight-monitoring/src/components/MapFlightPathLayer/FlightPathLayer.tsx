import { useColorModeValue } from "@volocopter/design-library-react";
import type { LngLat } from "maplibre-gl";
import { useDisplayFlightPathLayer } from "./hooks";

type FlightPathLayerProps = {
    flightPath: LngLat[];
    flightId: string | number;
};

export const FlightPathLayer = (props: FlightPathLayerProps) => {
    const { flightPath, flightId } = props;
    const selectedAircraftFlightPathColor: string = useColorModeValue("#44A4C5", "#44A4C5");
    useDisplayFlightPathLayer(flightPath, flightId, selectedAircraftFlightPathColor);
    return null;
};
