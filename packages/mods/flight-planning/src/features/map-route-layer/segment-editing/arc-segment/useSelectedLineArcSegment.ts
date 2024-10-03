import { useEffect } from "react";
import { Waypoint } from "@voloiq/flight-planning-api/v1";
import { useSegmentEditingContext } from "../context";
import { useAddArcSegment } from "./line-arc";
import { useAddSupportCircle } from "./support-circle";
import { createArcSegmentCircle } from "./support-circle/createArcSegmentCircle";

export const useSelectedLineArcSegment = (startWaypoint: Waypoint, endWaypoint: Waypoint, color: string) => {
    const { isArcSegmentDirectionInverse, arcSegmentRadius, setArcSegmentAngle, setArcSegmentCoordinates } =
        useSegmentEditingContext();

    const { lat: startLat, lng: startLng } = startWaypoint;
    const { lat: endLat, lng: endLng } = endWaypoint;

    const { radius, centerLat, centerLng } = createArcSegmentCircle(
        startLat,
        startLng,
        endLat,
        endLng,
        arcSegmentRadius,
        isArcSegmentDirectionInverse
    );

    useAddArcSegment({
        startLat,
        startLng,
        endLat,
        endLng,
        centerLat,
        centerLng,
        radius,
        color,
    });

    useAddSupportCircle({
        centerLat,
        centerLng,
        radius,
        color,
    });

    useEffect(() => {
        // apply changes in lat lng also to the context object
        setArcSegmentCoordinates({ latitude: centerLat, longitude: centerLng });
    }, [centerLat, centerLng, setArcSegmentAngle, setArcSegmentCoordinates]);
};
