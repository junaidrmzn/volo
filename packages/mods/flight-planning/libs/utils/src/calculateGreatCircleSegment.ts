import { Position, greatCircle, point } from "@turf/turf";

export type RouteProperties = {
    routeSequenceIndex?: number;
};

export const calculateGreatCircleSegment = (startCoord: Position, endCoord: Position, routeSequenceIndex?: number) => {
    const start = point(startCoord);
    const end = point(endCoord);
    // add custom properties to identify route segments
    const properties: RouteProperties = {
        routeSequenceIndex,
    };
    const segment = greatCircle(start, end);
    segment.properties = properties;
    return segment;
};
