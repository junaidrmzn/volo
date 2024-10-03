import { factory, primaryKey } from "@mswjs/data";
import type { EsuTypeUpdate, EsuUpdate } from "@voloiq-typescript-api/battery-management-types";
import * as faker from "faker";

const { esuType: esuTypeDatabase, esu: esuDatabase } = factory({
    esuType: {
        id: primaryKey(() => faker.datatype.uuid()),
        name: () => faker.datatype.string(),
        validFrom: () => new Date(Date.UTC(2022, 4, 1)).toString(),
        validTo: () => new Date(Date.UTC(2022, 4, 10)).toString(),
        manualCharging: () => faker.datatype.boolean(),
        aircraftTypes: () => [faker.datatype.uuid()],
    },
    esu: {
        id: primaryKey(() => faker.datatype.uuid()),
        name: () => faker.datatype.string(),
        type: () => faker.datatype.uuid(),
        validFrom: () => new Date(Date.UTC(2020, 1, 1)).toString(),
        validTo: () => new Date(Date.UTC(2099, 1, 1)).toString(),
        batch: () => faker.datatype.string(),
        manufacturer: () => faker.datatype.string(),
        serial: () => faker.datatype.string(),
        status: () => faker.datatype.string(),
        technicalStatus: () => faker.datatype.string(),
        battery: () => faker.datatype.uuid(),
        chargingCycles: () => faker.datatype.number(),
        chargingProfile: () => faker.datatype.uuid(),
        flightPermits: () => faker.datatype.string(),
        location: () => faker.datatype.uuid(),
        position: () => faker.datatype.string(),
        usageCycles: () => faker.datatype.number(),
        weight: () => faker.datatype.float(),
    },
});

export const esuTypeDatabaseOperations = {
    add: esuTypeDatabase.create,
    getById: (id: string) =>
        esuTypeDatabase.findFirst({
            where: { id: { equals: id } },
        }),
    get: esuTypeDatabase.getAll,
    update: (updateDto: EsuTypeUpdate, id: string) =>
        esuTypeDatabase.update({
            where: { id: { equals: id } },
            data: updateDto,
        }),
    clear: () => esuTypeDatabase.deleteMany({ where: { id: { notEquals: "" } } }),
};

export const esuDatabaseOperations = {
    add: esuDatabase.create,
    getById: (id: string) =>
        esuDatabase.findFirst({
            where: { id: { equals: id } },
        }),
    get: esuDatabase.getAll,
    update: (updateDto: EsuUpdate, id: string) =>
        esuDatabase.update({
            where: { id: { equals: id } },
            data: updateDto,
        }),
    clear: () => esuDatabase.deleteMany({ where: { id: { notEquals: "" } } }),
};

export { esuTypeDatabase, esuDatabase };
