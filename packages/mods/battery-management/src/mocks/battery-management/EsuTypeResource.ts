import type { EsuTypeUpdate } from "@voloiq-typescript-api/battery-management-types";
import faker from "faker";

export type EsuTypeResourceUpdate = EsuTypeUpdate & { id: string };

export const anyEsuTypeResource = (overwrites?: Partial<EsuTypeResourceUpdate>): EsuTypeResourceUpdate => ({
    name: `ESUTYPE-${Math.round(Math.random() * 100)}`,
    validFrom: new Date(Date.UTC(2022, 1, 1)).toString(),
    manualCharging: false,
    aircraftTypes: ["1"],
    id: faker.datatype.uuid(),
    validTo: new Date(Date.UTC(2022, 1, 15)).toString(),
    ...overwrites,
});

export const anyEsuTypeResourceWithId = (overwrites?: Partial<EsuTypeResourceUpdate>): EsuTypeResourceUpdate => ({
    ...anyEsuTypeResource(),
    ...overwrites,
});
