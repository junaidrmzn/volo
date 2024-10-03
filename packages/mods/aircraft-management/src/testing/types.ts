import type { Aircraft, AircraftType } from "@voloiq-typescript-api/aircraft-management-types";

export type CypressServiceProviderProps = {
    baseUrl: string;
    initialEntries: string[];
};

export type CypressAircraftServiceProviderProps = {
    aircraft: Aircraft;
};

export type CypressAircraftTypeServiceProviderProps = {
    aircraftType: AircraftType;
};
