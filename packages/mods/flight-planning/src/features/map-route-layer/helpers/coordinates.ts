import type { Feature, LineString, MultiLineString, Properties } from "@turf/turf";

export const extractNextCoordinate = (
    index: number,
    features: Feature<LineString | MultiLineString, Properties>[]
): number[] => {
    const geometry = features[index]?.geometry;
    if (!geometry) return [];

    let nextPosition: number[] = [];
    if (geometry.type === "LineString") {
        nextPosition = geometry.coordinates.at(-1)!;
    } else if (geometry.type === "MultiLineString") {
        nextPosition = geometry.coordinates.at(-1)!.at(-1)!;
    }

    return nextPosition;
};

export const extractPreviousCoordinate = (
    index: number,
    features: Feature<LineString | MultiLineString, Properties>[]
) => {
    const geometry = features[index - 1]?.geometry;
    if (!geometry) return [];
    return geometry.type === "LineString" ? geometry.coordinates[0]! : geometry.coordinates[0]![0]!;
};

export const sanitizeLongitude = (longitude: number) => {
    let sanitizedLongitude: number = longitude;
    if (longitude > 180) sanitizedLongitude = longitude - 360;
    if (longitude < -180) sanitizedLongitude = longitude + 360;
    return sanitizedLongitude;
};
