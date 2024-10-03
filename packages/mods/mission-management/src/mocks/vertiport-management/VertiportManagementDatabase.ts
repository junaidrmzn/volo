import { factory, primaryKey } from "@mswjs/data";
import * as faker from "faker";

export const { vertiport: vertiportDatabase } = factory({
    vertiport: {
        id: primaryKey(() => faker.datatype.uuid().toString()),
        code: () => faker.datatype.string(),
    },
});

export const vertiportDatabaseOperations = {
    add: vertiportDatabase.create,
    get: vertiportDatabase.getAll,
    getById: (id: string) =>
        vertiportDatabase.findFirst({
            where: { id: { equals: id } },
        }),
    clear: () => vertiportDatabase.deleteMany({ where: { id: { notEquals: "0" } } }),
};
