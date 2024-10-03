import type { Region } from "./apiModels";

export const anyRegion = (overwrites?: Partial<Region>): Required<Region> => ({
    id: "63c90da4-1e0c-4482-9cef-467501686edd",
    name: "Paris",
    validFrom: "2024-01-01T00:00:00.000Z",
    coordinates: {
        points: [
            {
                longitude: 1.884_155_3,
                latitude: 49.122_421_8,
                height: 158,
            },
            {
                longitude: 1.874_224,
                latitude: 48.554_796_2,
                height: 255,
            },
            {
                longitude: 2.955_322_3,
                latitude: 48.551_16,
                height: 324,
            },
        ],
    },
    center: {
        longitude: 2.237_900_533_333_337_3,
        latitude: 48.742_792_666_666_546,
        height: 0,
    },
    names: [
        {
            key: "Ausgeweitete Region",
            value: "de",
        },
    ],
    images: [],
    createTime: "2024-01-01T00:00:00.000Z",
    updateTime: "2024-01-01T00:00:00.000Z",
    validTo: "2024-12-31T00:00:00.000Z",
    publicFrom: "2024-01-01T00:00:00.000Z",
    publicTo: "2024-12-31T11:00:00.000Z",
    ...overwrites,
});
