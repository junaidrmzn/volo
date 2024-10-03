import { useToken } from "@volocopter/design-library-react";
import { Waypoint } from "@voloiq/flight-planning-api/v1";
import { useAddStraightSegment } from "./useAddStraightSegment";

type SelectedStraightRouteSegmentProps = {
    startWaypoint: Waypoint;
    endWaypoint: Waypoint;
};

export const SelectedStraightLineSegment = (props: SelectedStraightRouteSegmentProps) => {
    const { startWaypoint, endWaypoint } = props;
    const selectedRouteSegmentColor = useToken("colors", "brightBlue.500");
    useAddStraightSegment({
        startLat: startWaypoint.lat,
        startLng: startWaypoint.lng,
        endLat: endWaypoint.lat,
        endLng: endWaypoint.lng,
        color: selectedRouteSegmentColor,
    });

    return null;
};
