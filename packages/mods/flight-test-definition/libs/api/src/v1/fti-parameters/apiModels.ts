export type Parameter = {
    // required props
    id: string;
    requesterEmail: string;
    requesterName: string;
    aircraftZone: AircraftZone;
    workgroup: Workgroup;
    shortDescription: string;

    // optional props
    accuracy?: number;
    description?: string;
    ftiCode?: string;
    inactive: boolean;
    isSafetyOfFlightCritical?: boolean;
    maxValue?: number;
    minimumSamplingFrequency?: number;
    minValue?: number;
    validTo?: string;
    unit?: Unit;
    sensorType?: SensorType;
    ataIspec?: AtaIspec;
    parameterSource?: ParameterSource;
};

export type Workgroup = {
    label: string;
};

export type AtaIspec = {
    label: string;
};

export type AircraftZone = {
    label: string;
};

export type SensorType = {
    label: string;
};

export type Unit = {
    id: string;
    createTime: string;
    updateTime: string;
    label: string;
};

export type ParameterSource = {
    label: string;
};
