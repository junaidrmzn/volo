import type { EsuUpdate } from "@voloiq-typescript-api/battery-management-types";

export type EsuResourceUpdate = EsuUpdate & { id: string };

export const anyEsuResource = (overwrites?: Partial<EsuResourceUpdate>): EsuResourceUpdate => ({
    id: Math.round(Math.random() * 100).toString(),
    name: `ESU-${Math.round(Math.random() * 100)}`,
    type: "1",
    validFrom: new Date(Date.UTC(2022, 1, 1)).toString(),
    validTo: new Date(Date.UTC(2022, 2, 2)).toString(),
    batch: "ABC",
    manufacturer: "Manufacturer-1",
    serial: "12345",
    status: "POST_FLIGHT",
    technicalStatus: "SERVICEABLE_WITH_LIMITATIONS",
    battery: "123_455",
    chargingCycles: 123_456,
    chargingProfile: "1",
    flightPermits: "MANNED",
    location: "117_115",
    position: "FRA",
    usageCycles: 125,
    weight: 1574.525,
    ...overwrites,
});

export const anyEsuResourceWithId = (overwrites?: Partial<EsuResourceUpdate>): EsuResourceUpdate => ({
    ...anyEsuResource(),
    ...overwrites,
});
