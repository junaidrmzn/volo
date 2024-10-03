import type { Vertiport } from "@voloiq-typescript-api/vertiport-management-types";

export const anyVertiport = (overwrites?: Partial<Vertiport>): Vertiport => ({
    id: Math.round(Math.random() * 100).toString(),
    popularity: 1,
    code: "HAM",
    name: "HAM",
    location: { longitude: 1, latitude: 2, height: 3 },
    elevation: -1,
    validFrom: new Date(Date.UTC(2022, 4, 1)).toString(),
    createTime: new Date(Date.UTC(2022, 4, 1)).toString(),
    dataModelVersion: 1,
    shortName: "HAM",
    timeZone: "GER",
    updateTime: new Date(Date.UTC(2022, 4, 1)).toString(),
    region: {
        id: Math.round(Math.random() * 100).toString(),
        updateTime: new Date(Date.UTC(2022, 4, 1)).toString(),
        name: "GER",
        validFrom: new Date(Date.UTC(2022, 4, 1)).toString(),
        createTime: new Date(Date.UTC(2022, 4, 1)).toString(),
        center: { height: 2, latitude: 2, longitude: 2 },
        images: [],
        names: [],
        coordinates: { points: [{ height: 1, latitude: 2, longitude: 2 }] },
    },
    ...overwrites,
});
