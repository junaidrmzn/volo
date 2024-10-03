import type { CrewRole, CrewRoleCreate } from "@voloiq-typescript-api/crew-api-types";

export const anyCrewRole = (overwrites?: Partial<CrewRole>): CrewRole => ({
    roleKey: "PIL",
    description: "Pilot",
    validFrom: "2022-01-01T00:00:00Z",
    createdBy: "Test",
    createTime: "2022-01-01T00:00:00Z",
    updateTime: "2022-11-08T11:44:30Z",
    id: "2679f481-1517-4df6-a8e9-debe126fb5a0",
    requiresWeight: true,
    requiresLicense: true,
    canBecomePilotInCharge: true,
    numberOfAssignments: 7,
    requiresAircraftType: true,
    validTo: "2099-01-01T00:00:00Z",
    updatedBy: "Test",
    ...overwrites,
});

export const anyCrewRoleInsert = (overwrites?: Partial<CrewRoleCreate>): CrewRoleCreate => ({
    roleKey: "PIL",
    description: "Pilot Test",
    requiresAircraftType: true,
    requiresLicense: true,
    requiresWeight: true,
    canBecomePilotInCharge: true,
    createdBy: "Test",
    updatedBy: "Test",
    validFrom: "2022-01-01T00:00:00Z",
    validTo: "2099-01-01T00:00:00Z",
    ...overwrites,
});
