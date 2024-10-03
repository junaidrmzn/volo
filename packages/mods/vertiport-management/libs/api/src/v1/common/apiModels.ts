export type CreateEntity = {
    name: string;
    validFrom: string;
    validTo?: string;
    publicFrom?: string;
    publicTo?: string;
};

export type BaseDto = {
    createTime: string;
    updateTime: string;
};

export type Point = {
    longitude: number;
    latitude: number;
    height: number;
};

export type Polygon = {
    points: Point[];
};

export type StringPair = {
    key: string;
    value: string;
};

export type PadService = "UNKNOWN" | "FATO" | "STAND" | "OVERNIGHT-PARKING";
