import { factory, primaryKey } from "@mswjs/data";
import * as faker from "faker";

export const { vertiport: vertiportDatabase } = factory({
    vertiport: {
        id: primaryKey(() => faker.datatype.uuid().toString()),
        popularity: () => faker.datatype.number(),
        code: () => faker.datatype.string(),
        name: () => faker.datatype.string(),
        location: {
            longitude: () => faker.datatype.number(),
            latitude: () => faker.datatype.number(),
            height: () => faker.datatype.number(),
        },
        elevation: () => faker.datatype.number(),
        validFrom: () => new Date(Date.UTC(2022, 4, 1)).toString(),
        createTime: () => new Date(Date.UTC(2022, 4, 1)).toString(),
        dataModelVersion: () => 1,
        shortName: () => "HAM",
        timeZone: () => "GER",
        updateTime: () => new Date(Date.UTC(2022, 4, 1)).toString(),
        region: {
            id: () => Math.round(Math.random() * 100).toString(),
            updateTime: () => new Date(Date.UTC(2022, 4, 1)).toString(),
            name: () => "GER",
            validFrom: () => new Date(Date.UTC(2022, 4, 1)).toString(),
            createTime: () => new Date(Date.UTC(2022, 4, 1)).toString(),
            center: { height: () => 2, latitude: () => 2, longitude: () => 2 },
            images: () => [],
            names: () => [],
        },
    },
});

export const vertiportDatabaseOperations = {
    add: vertiportDatabase.create,
    get: vertiportDatabase.getAll,
    getById: (value: string) =>
        vertiportDatabase.findFirst({
            where: { id: { equals: value } },
        }),
    clear: () => vertiportDatabase.deleteMany({ where: { id: { notEquals: "0" } } }),
};
