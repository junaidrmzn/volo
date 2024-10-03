import { factory, primaryKey } from "@mswjs/data";
import {
    CrewConfiguration,
    ProductLine,
    Service,
    TechnicalStatus,
} from "@voloiq-typescript-api/aircraft-management-types";
import * as faker from "faker";
import { AircraftUpdate } from "@voloiq/aircraft-management-api/v1";
import { getTypedKeys } from "@voloiq/utils";

const aircraftTypeDictionary = {
    id: primaryKey(() => faker.datatype.uuid().toString()),
    name: () => "VD_100",
    productLine: () => ProductLine.VOLODRONE,
    validFrom: () => new Date(Date.UTC(2022, 4, 1)).toString(),
    validTo: () => new Date(Date.UTC(2022, 4, 10)).toString(),
    performanceDataFileUrl: () => "url",
    performanceDataFileVersion: () => 1,
    minimumTemperature: () => -10.01,
    maximumTemperature: () => 11.11,
    windSpeed: () => 12.21,
    relativeHumidity: () => 13.31,
    rain: () => 14.41,
    visibility: () => 15.51,
    cloudCeilingHeight: () => 16.61,
    airDensity: () => 1.71,
};

const aircraftTypeProperties = getTypedKeys(aircraftTypeDictionary);
type AircraftTypeProperty = typeof aircraftTypeProperties[number];
export const isAircraftTypeProperty = (property: unknown): property is AircraftTypeProperty =>
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    aircraftTypeProperties.includes(property as AircraftTypeProperty);

const aircraftDictionary = {
    id: primaryKey(() => faker.datatype.uuid().toString()),
    registration: () => faker.datatype.string(),
    msn: () => faker.datatype.string(),
    service: () => Service.TEST,
    technicalStatus: () => TechnicalStatus.SERVICEABLE_WITH_LIMITATIONS,
    homebaseVertiportId: () => faker.datatype.uuid().toString(),
    crewConfiguration: () => CrewConfiguration.CREWED,
    validFrom: () => new Date(Date.UTC(2022, 4, 1)).toString(),
    validTo: () => new Date(Date.UTC(2022, 4, 10)).toString(),
    aircraftTypeId: () => faker.datatype.uuid(),
};

const aircraftProperties = getTypedKeys(aircraftDictionary);
type AircraftProperty = typeof aircraftProperties[number];
export const isAircraftProperty = (property: unknown): property is AircraftProperty =>
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    aircraftProperties.includes(property as AircraftProperty);

const { aircraftType: aircraftTypeDatabase, aircraft: aircraftDatabase } = factory({
    aircraftType: aircraftTypeDictionary,
    aircraft: aircraftDictionary,
});

export const aircraftTypeDatabaseOperations = {
    add: aircraftTypeDatabase.create,
    get: aircraftTypeDatabase.getAll,
    getById: (id: string) =>
        aircraftTypeDatabase.findFirst({
            where: { id: { equals: id } },
        }),
    clear: () => aircraftTypeDatabase.deleteMany({ where: { id: { notEquals: "0" } } }),
};

export const aircraftDatabaseOperations = {
    add: aircraftDatabase.create,
    getById: (id: string) =>
        aircraftDatabase.findFirst({
            where: { id: { equals: id } },
        }),
    get: aircraftDatabase.getAll,
    update: (updateDto: AircraftUpdate, id: string) =>
        aircraftDatabase.update({
            where: { id: { equals: id } },
            data: updateDto,
        }),
    clear: () => aircraftDatabase.deleteMany({ where: { id: { notEquals: "0" } } }),
};

export { aircraftDatabase, aircraftTypeDatabase };
