import type { AircraftType } from "@voloiq-typescript-api/aircraft-management-types";
import { ProductLine } from "@voloiq-typescript-api/aircraft-management-types";

export type AircraftTypeResourceCreate = AircraftType;

export type AircraftTypeResourceUpdate = Partial<AircraftTypeResourceCreate>;

export type AircraftTypeResource = AircraftTypeResourceUpdate & { id: string };

export const anyAircraftTypeResource = (overwrites?: Partial<AircraftTypeResource>): AircraftTypeResource => ({
    id: Math.round(Math.random() * 100).toString(),
    name: Math.round(Math.random() * 100).toString(),
    productLine: ProductLine.VOLODRONE,
    validFrom: new Date(Date.UTC(2022, 4, 1)).toString(),
    validTo: new Date(Date.UTC(2022, 4, 10)).toString(),
    performanceDataFileUrl: "url",
    performanceDataFileVersion: 1,
    ...overwrites,
});

export const anyAircraftTypeResourceWithId = (overwrites?: Partial<AircraftTypeResource>): AircraftTypeResource => ({
    ...anyAircraftTypeResource(),
    ...overwrites,
});
