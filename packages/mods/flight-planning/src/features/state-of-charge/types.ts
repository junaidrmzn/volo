export type MarkLineType = [
    {
        id?: string | null;
        name: string;
        coord: (number | string)[];
    },
    {
        coord: (number | string)[];
    }
];

export type MarkLineReference = "csfl" | "waypoints";
export type GraphType = "batteryCapacity" | "batteryTemperature";
