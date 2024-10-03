export type Location = {
    id: string;
    icaoCode: string;
    latitude: number;
    longitude: number;
    createTime: string;
    updateTime: string;
};

export type LocationInsert = {
    icaoCode: string;
    latitude: number;
    longitude: number;
};
