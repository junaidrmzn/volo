export type SegmentType = "arc";

export type ArcSegment = {
    id: number;
    latitude: number;
    longitude: number;
    radius: number;
    type: SegmentType;
    created?: string;
    isInverted?: boolean;
};

export type ArcSegmentInsert = {
    latitude: number;
    longitude: number;
    radius: number;
    isInverted?: boolean;
};

export type SegmentInsert = {
    segmentData: ArcSegmentInsert;
    segmentType: SegmentType;
};

// enum for Segment Connection type
export const SegmentConnection = {
    direct: "direct",
    arc: "arc",
    invert: "invert",
} as const;

export type SegmentConnectionType = typeof SegmentConnection[keyof typeof SegmentConnection];
