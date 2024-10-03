import { factory, primaryKey } from "@mswjs/data";
import { Service, StatusOfMission, TypeOfOperation } from "@voloiq-typescript-api/network-scheduling-types";
import * as faker from "faker";
import { getTypedKeys } from "@voloiq/utils";

const missionDictionary = {
    id: primaryKey(() => faker.datatype.uuid().toString()),
    flightNumber: () => faker.datatype.string(),
    service: () => Service.TEST,
    departureDateTime: () => new Date(Date.UTC(2022, 4, 1)).toString(),
    arrivalDateTime: () => new Date(Date.UTC(2022, 4, 1)).toString(),
    departureVertiportId: () => faker.datatype.string(),
    arrivalVertiportId: () => faker.datatype.string(),
    typeOfOperation: () => TypeOfOperation.PILOTED,
    statusOfMission: () => StatusOfMission.PLANNED,
    clearance: () => true,
    validFrom: () => new Date(Date.UTC(2022, 4, 1)).toString(),
    validTo: () => new Date(Date.UTC(2022, 4, 10)).toString(),
};

const missionProperties = getTypedKeys(missionDictionary);
type MissionProperty = typeof missionProperties[number];
export const isMissionProperty = (property: unknown): property is MissionProperty =>
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    missionProperties.includes(property as MissionProperty);

const { mission: missionDatabase } = factory({
    mission: missionDictionary,
});

export const missionDatabaseOperations = {
    add: missionDatabase.create,
    getById: (id: string) =>
        missionDatabase.findFirst({
            where: { id: { equals: id } },
        }),
    get: missionDatabase.getAll,
    clear: () => missionDatabase.deleteMany({ where: { id: { notEquals: "0" } } }),
};

export { missionDatabase };
