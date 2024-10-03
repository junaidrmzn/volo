import type { Vertiport } from "@voloiq/vertiport-management-api/v1";
import { mockedRegion } from "./MockedRegion";

export const mockedVertiport: Vertiport = {
    id: "63c90da4-1e0c-4482-9cef-467501686edd",
    shortName: "ShortName",
    region: mockedRegion,
    timeZone: "UTC",
    elevation: 0,
    location: {
        height: 1,
        longitude: 41,
        latitude: 3,
    },
    createTime: "2022-01-01T00:00Z",
    updateTime: "2022-01-04T00:00Z",
    name: "Paris",
    publicFrom: "2021-01-01T00:00Z",
    publicTo: "2023-01-01T00:00Z",
    validFrom: "2021-01-01T00:00Z",
    validTo: "2023-01-01T00:00Z",
    names: [{ key: "a", value: "aa" }],
    images: [{ key: "b", value: "bb" }],
    popularity: 0,
    dataModelVersion: 0,
    synchronizedWithLeon: false,
    lastSynchronizedAt: undefined,
    createdBy: "Petrik",
    updatedBy: "Petrik",
};
