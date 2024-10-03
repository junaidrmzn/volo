import { useToken } from "@volocopter/design-library-react";
import { Waypoint } from "@voloiq/flight-planning-api/v1";
import { useSelectedLineArcSegment } from "./useSelectedLineArcSegment";

type SelectedLineArcSegmentProps = {
    startWaypoint: Waypoint;
    endWaypoint: Waypoint;
};

export const SelectedLineArcSegment = (props: SelectedLineArcSegmentProps) => {
    const { startWaypoint, endWaypoint } = props;
    const color = useToken("colors", "brightBlue.500");
    useSelectedLineArcSegment(startWaypoint, endWaypoint, color);
    return null;
};
