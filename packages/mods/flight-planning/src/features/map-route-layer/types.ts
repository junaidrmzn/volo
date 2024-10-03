import type { GeoJSONFeature } from "maplibre-gl";

export type RouteProperties = {
    routeSequenceIndex?: number;
};

export type RouteFeatureProperties = {
    properties: RouteProperties;
};

export type GeoJsonRouteFeature = GeoJSONFeature & RouteFeatureProperties;
