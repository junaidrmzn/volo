import type { Aircraft } from "@voloiq/aircraft-management-api/v1";

export type AircraftDisplay = Aircraft & { aircraftTypeName: string; homebaseName: string };
