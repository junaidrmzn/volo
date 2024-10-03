import type { LngLatLike } from "maplibre-gl";
import type { Dispatch, SetStateAction } from "react";
import { useAircraftMarker } from "./hooks";

type AircraftMarkerProps = {
    coords: LngLatLike;
    bearing: number;
    isCentered: boolean;
    setIsCentered: Dispatch<SetStateAction<boolean>>;
    setShowFlightPath: Dispatch<SetStateAction<boolean>>;
};

export const AircraftMarker = (props: AircraftMarkerProps) => {
    const { coords, bearing, isCentered, setIsCentered, setShowFlightPath } = props;
    useAircraftMarker(coords, bearing, isCentered, setIsCentered, setShowFlightPath);

    return null;
};
