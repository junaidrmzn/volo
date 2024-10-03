import { CrewConfiguration, Service, TechnicalStatus } from "@voloiq-typescript-api/aircraft-management-types";
import type { Aircraft } from "@voloiq/aircraft-management-api/v1";

export type AircraftResourceCreate = Aircraft;

export type AircraftResourceUpdate = Partial<AircraftResourceCreate>;

export type AircraftResource = AircraftResourceUpdate & { id: string };

export const anyAircraftResource = (overwrites?: Partial<AircraftResource>): AircraftResource => ({
    id: Math.round(Math.random() * 100).toString(),
    msn: Math.round(Math.random() * 100).toString(),
    technicalStatus: TechnicalStatus.SERVICEABLE,
    aircraftTypeId: Math.round(Math.random() * 100).toString(),
    registration: `A-LPHA-${Math.round(Math.random() * 100).toString()}`,
    homebaseVertiportId: "HAM",
    validFrom: new Date(Date.UTC(2022, 4, 1)).toString(),
    validTo: new Date(Date.UTC(2022, 4, 10)).toString(),
    crewConfiguration: CrewConfiguration.CREWED,
    services: [Service.PASSENGER],
    ...overwrites,
});

export const anyAircraftResourceWithId = (overwrites?: Partial<AircraftResource>): AircraftResource => ({
    ...anyAircraftResource(),
    ...overwrites,
});
