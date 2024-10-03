import { BaseDto, CreateEntity, Point, Polygon } from "../common/apiModels";

export type RegionCreateAllOf = {
    coordinates: Polygon;
    center: Point;
};

export type RegionCreate = CreateEntity & RegionCreateAllOf;

export type RegionAllOf = {
    id: string;
    version?: number;
    createdBy: string;
    updatedBy: string;
};

export type RegionUpdateAllOf = {
    id: string;
};

export type RegionUpdate = RegionCreate & RegionUpdateAllOf;
export type Region = RegionCreate & BaseDto & RegionAllOf;
export type RegionBulkUpdate = {
    fieldType: string;
    newValue: string | object[] | null;
};
