import * as turf from "@turf/turf";
import type { FlightPathItem } from "@voloiq-typescript-api/flight-monitoring-types";
import type { LngLatLike } from "maplibre-gl";
import { LngLat } from "maplibre-gl";
import { useEffect, useState } from "react";

export const useBearing = (messages: FlightPathItem[]) => {
    const [bearing, setBearing] = useState(0);
    const [currentPosition, setCurrentPosition] = useState<LngLatLike>([0, 0]);

    const lastMessage = messages ? messages[messages.length - 1] : null;

    const nextPosition: LngLatLike =
        lastMessage && lastMessage.lng && lastMessage.lat ? [lastMessage.lng, lastMessage.lat] : [0, 0];

    useEffect(() => {
        const bearing = turf.bearing(LngLat.convert(currentPosition).toArray(), LngLat.convert(nextPosition).toArray());
        setBearing(turf.bearingToAngle(bearing));

        setCurrentPosition(nextPosition);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [messages]);
    return { bearing };
};
