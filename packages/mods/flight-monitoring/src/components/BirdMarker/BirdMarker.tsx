import type { LngLatLike } from "maplibre-gl";
import { useBirdMarker } from "./useBirdMarker";

type BirdMarkerProps = {
    coords: LngLatLike;
    type: string;
};

export const BirdMarker = (props: BirdMarkerProps) => {
    const { coords, type } = props;
    useBirdMarker(coords, type);
    return null;
};
