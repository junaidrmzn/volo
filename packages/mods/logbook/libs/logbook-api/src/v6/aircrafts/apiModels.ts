export type Aircraft = {
    id: string;
    productLine: string;
    aircraftType: string;
    msn: string;
    createTime: string;
    updateTime: string;
};

export type AircraftInsert = {
    productLine: string;
    aircraftType?: string;
    msn: string;
};
