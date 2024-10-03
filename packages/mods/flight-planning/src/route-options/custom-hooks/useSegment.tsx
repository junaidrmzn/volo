import { useState } from "react";
import { SegmentConnectionType } from "@voloiq/flight-planning-api/v1";

export const useSegment = () => {
    const [curveRadius, setCurveRadius] = useState<string | null>();
    const [connectionType, setConnectionType] = useState<SegmentConnectionType>();
    return { curveRadius, setCurveRadius, connectionType, setConnectionType };
};
