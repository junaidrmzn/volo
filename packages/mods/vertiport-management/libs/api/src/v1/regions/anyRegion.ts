import { Region, RegionCreate } from "./apiModels";

export const anyRegion = (overwrites?: Partial<Region>): Required<Region> => ({
    id: "ce118b6e-d8e1-11e7-9296-cec278b6b50a",
    name: "iloveorange",
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
    createTime: "2020-11-06T16:34:41.000Z",
    updateTime: "2020-11-06T16:34:41.000Z",
    publicFrom: "2020-11-06T16:34:41.000Z",
    publicTo: "2020-11-06T16:34:41.000Z",
    validFrom: "2020-11-06T16:34:41.000Z",
    validTo: "2020-11-06T16:34:41.000Z",
    version: 0,
    createdBy: "Petrik",
    updatedBy: "Petrik",
    ...overwrites,
});

export const anyRegionCreate = (overwrites?: Partial<RegionCreate>): Required<RegionCreate> => ({
    name: "iloveorange",
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
    publicFrom: "2020-11-06T16:34:41.000Z",
    publicTo: "2020-11-06T16:34:41.000Z",
    validFrom: "2020-11-06T16:34:41.000Z",
    validTo: "2020-11-06T16:34:41.000Z",
    ...overwrites,
});
