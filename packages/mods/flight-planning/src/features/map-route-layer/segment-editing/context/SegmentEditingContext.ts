import { Dispatch, SetStateAction, createContext } from "react";
import { ArcSegmentInsert } from "@voloiq/flight-planning-api/v1";

export type SegmentEditModeType = "none" | "turn" | "direct";

type SegmentEditingContextProps = {
    setSegmentEditMode: Dispatch<SetStateAction<SegmentEditModeType>>;
    segmentEditMode: SegmentEditModeType;
    isArcSegmentDirectionInverse: boolean;
    setIsArcSegmentDirectionInverse: Dispatch<SetStateAction<boolean>>;
    arcSegmentRadius: number;
    setArcSegmentRadius: (radius: number) => void;
    arcSegmentAngle: number;
    setArcSegmentAngle: (angle: number) => void;
    arcSegmentCoordinates: Pick<ArcSegmentInsert, "latitude" | "longitude">;
    setArcSegmentCoordinates: Dispatch<SetStateAction<Pick<ArcSegmentInsert, "latitude" | "longitude">>>;
};

export const SegmentEditingContext = createContext<SegmentEditingContextProps | undefined>(undefined);
