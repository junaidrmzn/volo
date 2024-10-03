export type KeyValuePair = {
    key: string;
    value: string;
};

export type Point = {
    longitude: number;
    latitude: number;
    height: number;
};

export type Region = {
    id: string;
    name: string;
    coordinates: { points: Point[] };
    center: Point;
    names: KeyValuePair[];
    images: KeyValuePair[];
    validFrom: string;
    validTo?: string;
    publicFrom?: string;
    publicTo?: string;
    createTime: string;
    updateTime: string;
};
