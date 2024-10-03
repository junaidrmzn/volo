import { v4 as uuidV4 } from "uuid";
import type { AircraftZone, AtaIspec, Parameter, ParameterSource, SensorType, Unit, Workgroup } from "./apiModels";

export const anyWorkgroup = (overwrites?: Partial<Workgroup>): Workgroup => ({
    label: "EPU",
    ...overwrites,
});

export const anyAtaIspec = (overwrites?: Partial<AtaIspec>): AtaIspec => ({
    label: "23 - Communications",
    ...overwrites,
});

export const anyAircraftZone = (overwrites?: Partial<AircraftZone>): AircraftZone => ({
    label: "C: Aft Compartment",
    ...overwrites,
});

export const anySensorType = (overwrites?: Partial<SensorType>): SensorType => ({
    label: "1 - Accelerometer",
    ...overwrites,
});

export const anyParameterSource = (overwrites?: Partial<ParameterSource>): ParameterSource => ({
    label: "ADAHRS_01",
    ...overwrites,
});

export const anyUnit = (overwrites?: Partial<Unit>): Unit => ({
    id: uuidV4(),
    label: "A",
    createTime: "2021-09-02T07:00:00Z",
    updateTime: "2021-09-02T07:00:00Z",
    ...overwrites,
});

export const anyFtiParameter = (overwrites?: Partial<Parameter>): Parameter => ({
    id: uuidV4(),
    shortDescription: "A1 - Accelerometer",
    description: "A1 - Center Tunnel and Instrument Panel . 1 - Accelerometer",
    inactive: false,
    maxValue: 1,
    accuracy: 1,
    minimumSamplingFrequency: 1,
    ftiCode: "2301000001",
    isSafetyOfFlightCritical: false,
    requesterEmail: "philipp.schloesser@volocopter.com",
    requesterName: "Philipp Schlösser",
    aircraftZone: anyAircraftZone(),
    workgroup: anyWorkgroup(),
    unit: anyUnit(),
    sensorType: anySensorType(),
    ataIspec: anyAtaIspec(),
    parameterSource: anyParameterSource(),
    ...overwrites,
});
