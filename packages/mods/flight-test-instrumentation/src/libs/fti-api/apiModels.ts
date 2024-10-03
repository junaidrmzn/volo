import type {
    Aircraft,
    Parameter as OASParameter,
    ParameterInsert as OASParameterInsert,
    ParameterPatch as OASParameterPatch,
    ParameterStatusEnum,
} from "@voloiq-typescript-api/fti-types";

export type Parameter = Omit<OASParameter, "aircraft"> & {
    isSafetyOfFlightCritical?: boolean;
    aircrafts: AircraftWithStatus[];
};

export type ParameterInsert = Omit<OASParameterInsert, "aircraftId"> & {
    aircraftIds: string[];
    isSafetyOfFlightCritical?: boolean;
};

export type AircraftWithStatus = Aircraft & {
    status: ParameterStatusEnum;
};

export type ParameterPatch = Omit<OASParameterPatch, "aircraftId"> &
    Partial<{
        aircraftIds: string[];
        isSafetyOfFlightCritical: boolean;
    }>;
