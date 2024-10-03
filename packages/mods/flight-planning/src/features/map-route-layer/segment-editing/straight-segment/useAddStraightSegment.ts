import { useEffect } from "react";
import { useSegmentEditingContext } from "../context";
import { useStraightSegment } from "./useStraightSegment";

type UseHighlightSelectedStraightRouteSegmentOptions = {
    startLat: number;
    startLng: number;
    endLat: number;
    endLng: number;
    color: string;
};

export const useAddStraightSegment = (options: UseHighlightSelectedStraightRouteSegmentOptions) => {
    const { startLat, startLng, endLat, endLng, color } = options;
    const { segmentEditMode } = useSegmentEditingContext();
    const isEditingDirectSegment = segmentEditMode === "direct";
    const { addStraightLineToMap, removeStraightLineFromMap } = useStraightSegment({
        startLat,
        startLng,
        endLat,
        endLng,
        color,
    });

    useEffect(() => {
        if (!isEditingDirectSegment) return () => {};

        addStraightLineToMap();

        return () => {
            removeStraightLineFromMap();
        };
    }, [isEditingDirectSegment, addStraightLineToMap, removeStraightLineFromMap]);
};
