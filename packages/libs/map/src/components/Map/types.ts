import { Feature, FeatureCollection, Properties } from "@turf/turf";
import type { AirspaceFeatureAllOf } from "@voloiq-typescript-api/flight-planning-types";
import { GeoJSON } from "geojson";
import {
    CircleLayerSpecification,
    DataDrivenPropertyValueSpecification,
    FillLayerSpecification,
    FilterSpecification,
    GeoJSONSource,
    GeoJSONSourceSpecification,
    LayerSpecification,
    LineLayerSpecification,
    LngLatLike,
    Map,
    MapGeoJSONFeature,
    MapLayerMouseEvent,
    MapMouseEvent,
    PointLike,
    PropertyValueSpecification,
    SymbolLayerSpecification,
} from "maplibre-gl";
import { Waypoint } from "@voloiq/flight-planning-api/v1";

type LineLayoutOptions = LineLayerSpecification["layout"];
type LinePaintOptions = LineLayerSpecification["paint"];
type FillLayoutOptions = FillLayerSpecification["layout"];
type FillPaintOptions = FillLayerSpecification["paint"];
type SymbolLayoutOptions = SymbolLayerSpecification["layout"];
type SymbolPaintOptions = SymbolLayerSpecification["paint"];
type CircleLayoutOptions = CircleLayerSpecification["layout"];
type CirclePaintOptions = CircleLayerSpecification["paint"];
type SymbolType = SymbolLayerSpecification["type"];
type LineType = LineLayerSpecification["type"];
type FillType = FillLayerSpecification["type"];
type CircleType = CircleLayerSpecification["type"];
export type MapLayerMouseEvents = MapLayerMouseEvent;
export type MapGeoJsonFeature = MapGeoJSONFeature;
export type LayerSpec = LayerSpecification;
export type GeoJsonSourceType = GeoJSONSourceSpecification["type"];
export type SymbolLayerSpec = SymbolLayerSpecification;
export type CircleLayerSpec = CircleLayerSpecification;
export type FillLayerSpec = FillLayerSpecification;
export type LineJoinTypes = DataDrivenPropertyValueSpecification<"round" | "bevel" | "miter"> | undefined;
export type LineCapTypes = PropertyValueSpecification<"round" | "butt" | "square"> | undefined;
export type FilterSpec = FilterSpecification;
export type RouteType = "selected" | "displayed" | "template";
export type GeomType = LineType | SymbolType | FillType | CircleType;
export type FeatureLayoutOptions = LineLayoutOptions | FillLayoutOptions | SymbolLayoutOptions | CircleLayoutOptions;
export type FeaturePaintOptions = LinePaintOptions & FillPaintOptions & SymbolPaintOptions & CirclePaintOptions;
export type FeaturesCoordinates = number[] | number[][] | number[][][];
export type SegmentEditModeType = "none" | "turn" | "direct";
export type LngLatType = LngLatLike;
export type PointGeom = PointLike;
export type MapMouseEvents = MapMouseEvent;
export type GeoJsonSource = GeoJSONSource;
export type GeoJsonType = GeoJSON;
export type WaypointsHashMap = { [id: number]: { coordinates: FeaturesCoordinates; properties: Waypoint } };
export type LayerProperties =
    | LineLayerSpecification
    | SymbolLayerSpecification
    | FillLayerSpecification
    | CircleLayerSpecification;
export type VoloiqCustomDataType = { coordinates: FeaturesCoordinates; properties: Properties };
export type MapLibre = Map;
export type obstacleTranslationTypes =
    | "highestTerrianCollision"
    | "highestClearanceViolation"
    | "highest"
    | "terrainCollision"
    | "clearanceViolation"
    | "obstacle";
export type VoloiqMapStoreType = { [key: string]: VoloiqMap };
export type VoloiqMap = {
    mapVersion?: string;
    lastWaypointsUpdate?: number;
    selectedWaypointId?: number;
    selectedWaypointType?: string;
    segmentEditMode?: string;
    waypointOriginalCoordinates?: { lng: number; lat: number };
    selectedRouteSequenceIndex?: number;
    currentWaypointEditId?: number;
    previousSelectedWaypoint?: number;
    dragDone?: boolean;
    previousWaypoint?: Waypoint;
    waypointsHashMap?: WaypointsHashMap;
    waypointsHashMapBackUp?: { [routeId: number]: WaypointsHashMap };
    isWaypointUpdate?: boolean;
    isAddingWaypoint?: boolean;
    isMapNeedsRefresh?: boolean;
    takeWaypointsFromRouteRequest?: boolean;
    waypointEditSession?: { [waypointId: number]: { activeSessions: number; originalCoordinates: number[] } };
    newestWaypointIdOnRoute?: number;
    horizontalObstacleClearance?: number;
    verticalObstacleClearance?: number;
    updateRouteLayer?: boolean;
    updateCycle?: number;
    numberOfAllowedUpdateCycles?: number;
    updateRouteCoordinates?: (props: {
        index?: number;
        lng?: number;
        lat?: number;
        waypointsArray?: Waypoint[];
    }) => void;
    editWaypoint?: (waypoint: Waypoint, routeSequenceIndex?: number) => void;
    currentRouteId?: number;
    updateRouteSequenceIndex?: (sequnceIndex: number | undefined) => void;
    addLayerToMap?: (
        map: VoloiqMap,
        layerProperties: LayerProperties,
        sourceType: GeoJsonSourceType,
        data?: AirspaceFeatureAllOf[] | Feature[],
        beforeId?: string
    ) => void;
    updateLayer?: (
        map: maplibregl.Map | VoloiqMap,
        greatCircleCoordinates: FeatureCollection,
        id: number | string
    ) => void;
    removeMapLayer?: (map: maplibregl.Map | VoloiqMap, id: string, source?: string, ids?: string[]) => void;
    addGeoJsonLayer?: (
        map: VoloiqMap,
        id: string,
        data: Feature | FeatureCollection,
        geomType: GeomType,
        layoutOptions?: FeatureLayoutOptions,
        paintOptions?: FeaturePaintOptions
    ) => void;
    createLayerFromGeoJson?: (
        map: VoloiqMap,
        featuresData: { coordinates: FeaturesCoordinates; properties: Properties }[],
        featureType: "LineString" | "Point" | "Polygon",
        layerProperties: LayerProperties,
        beforeId?: string
    ) => void;
    updateSourceData?: (
        map: VoloiqMap,
        features: AirspaceFeatureAllOf[] | Feature[] | Feature | FeatureCollection,
        sourceId: string
    ) => void;
    getMapVersion?: (map: maplibregl.Map | VoloiqMap) => boolean;
    buildTranslatedPopUpText?: (popupTextToTransalte: {
        obstacleType: obstacleTranslationTypes;
        formatedAltitude: number;
    }) => string;
} & maplibregl.Map;
