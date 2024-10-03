export type FileStatus = {
    uploaded: boolean;
};

export type Coordinate = [number, number];

export type DeviationSegment = {
    averageDeviation: number;
    coordinates: Coordinate[];
};

export type RouteComparison = {
    deviationFromPlannedRoutePolygons: Coordinate[][];
    deviationFromPlannedRoute: DeviationSegment[];
    conductedRoute: Coordinate[];
};
