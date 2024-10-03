import { useSelectedRoute } from "../../selected-route";
import { SelectedLineArcSegment } from "./arc-segment";
import { useSegmentEditingContext } from "./context";
import { useSelectedSegmentWaypoints } from "./helpers";
import { SelectedStraightLineSegment } from "./straight-segment";

export const SegmentEditing = () => {
    const { segmentEditMode } = useSegmentEditingContext();
    const { selectedRoute } = useSelectedRoute();
    const { startWaypoint, endWaypoint } = useSelectedSegmentWaypoints(selectedRoute?.id || 0);

    if (!startWaypoint || !endWaypoint) return null;

    return (
        <>
            {segmentEditMode === "direct" && (
                <SelectedStraightLineSegment startWaypoint={startWaypoint} endWaypoint={endWaypoint} />
            )}
            {segmentEditMode === "turn" && (
                <SelectedLineArcSegment startWaypoint={startWaypoint} endWaypoint={endWaypoint} />
            )}
        </>
    );
};
