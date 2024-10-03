import type { LngLatLike } from "maplibre-gl";
import { useVoloportMarker } from "./useVoloportMarker";

type VoloportMarkerProps = {
    coords: LngLatLike;
};

export const VoloportMarker = (props: VoloportMarkerProps) => {
    const { coords } = props;

    useVoloportMarker(coords);

    return null;
};
