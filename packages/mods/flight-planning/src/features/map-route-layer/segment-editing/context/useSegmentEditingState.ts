import { useState } from "react";
import { ArcSegmentInsert } from "@voloiq/flight-planning-api/v1";
import { SegmentEditModeType } from "./SegmentEditingContext";

export const useSegmentEditingState = () => {
    const [isArcSegmentDirectionInverse, setIsArcSegmentDirectionInverse] = useState<boolean>(false);
    const [segmentEditMode, setSegmentEditMode] = useState<SegmentEditModeType>("none");
    const [arcSegmentRadius, setArcSegmentRadius] = useState<number>(1000);
    const [arcSegmentAngle, setArcSegmentAngle] = useState<number>(0);
    const [arcSegmentCoordinates, setArcSegmentCoordinates] = useState<
        Pick<ArcSegmentInsert, "latitude" | "longitude">
    >({
        latitude: 0,
        longitude: 0,
    });

    return {
        isArcSegmentDirectionInverse,
        setIsArcSegmentDirectionInverse,
        segmentEditMode,
        setSegmentEditMode,
        arcSegmentRadius,
        setArcSegmentRadius,
        arcSegmentAngle,
        setArcSegmentAngle,
        arcSegmentCoordinates,
        setArcSegmentCoordinates,
    };
};
