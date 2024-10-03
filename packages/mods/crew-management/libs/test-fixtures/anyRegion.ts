import type { Region } from "@voloiq-typescript-api/vertiport-management-types";

export const anyRegion = (overwrites?: Partial<Region>): Required<Region> => ({
    id: "ce118b6e-d8e1-11e7-9296-cec278b6b50a",
    name: "iloveorange",
    images: [
        {
            key: "dsd",
            value: "dsadf",
        },
    ],
    coordinates: {
        points: [
            {
                longitude: 13,
                latitude: 13,
                height: 13,
            },
        ],
    },
    center: {
        longitude: 13,
        latitude: 13,
        height: 13,
    },
    names: [
        {
            key: "iloveorange",
            value: "iloveorange",
        },
    ],
    createTime: "2020-11-06T16:34:41.000Z",
    updateTime: "2020-11-06T16:34:41.000Z",
    publicFrom: "2020-11-06T16:34:41.000Z",
    publicTo: "2020-11-06T16:34:41.000Z",
    validFrom: "2020-11-06T16:34:41.000Z",
    validTo: "2020-11-06T16:34:41.000Z",
    version: 0,
    ...overwrites,
});
