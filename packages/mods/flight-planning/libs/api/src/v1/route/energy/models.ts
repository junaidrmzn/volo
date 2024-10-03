import { Alert } from "../models";

export type RouteFullEnergy = {
    additionalEnergy: number;
    alerts: Alert[];
    contingencyEnergy: number;
    csflPowerCurve: CsflPowerCurve[];
    csflTemperatureTimeIntervals: CsflTemperatureTimeInterval[];
    csflTemperatureTimeIntervalsWorstCase: CsflTemperatureTimeInterval[];
    csflWorstCasePowerCurve: CsflPowerCurve[];
    discretionaryEnergy: number;
    extraEnergy: number;
    finalReserve: number;
    mainEnergyPowercurve: MainEnergyPowercurve[];
    mainWorstCasePowercurve?: MainEnergyPowercurve[];
    targetTimeOver: TargetTimeOver[];
    taxi: Taxi;
    temperatureTimeIntervals: TemperatureTimeInterval[];
    voltageTimeIntervals: VoltageTimeInterval[];
    voltageDrop: VoltageDrop;
    unusableEnergy: number;
    windDirection: number;
    windSpeed: number;
    finalReserveAndUnusableEnergy?: number;
    waypointsReference: WaypointReference[];
    remainingEnergy: number;
    validationStatus?: "invalid" | "valid" | "not_yet_validated";
    duration: number;
};

export type CsflPowerCurve = {
    time: number;
    bestReachableCsflSiteEnergy: number;
    bestReachableCsflSiteName?: string;
    bestReachableCsflSiteTime?: number;
};

export type CsflTemperatureTimeInterval = {
    time: number;
    bestReachableCsflSiteTemperature: number;
    bestReachableCsflSiteName?: string;
};

export type MainEnergyPowercurve = {
    time: number;
    remainingEnergy: number;
    bestReachableCsflSiteHeading?: number;
};

export type TargetTimeOver = {
    routeSequenceIndex: number;
    tto: number;
};

export type Taxi = {
    taxiValid: boolean;
    taxiCsflValid: boolean;
    taxiEnergy: number[];
};

export type TemperatureTimeInterval = {
    time: number;
    batteryTemperature: number;
};

export type VoltageTimeInterval = {
    time: number;
    batteryVoltage: number;
};

export type WindScenario = {
    windSpeed?: number;
    windDirection?: number;
};

export type WaypointReference = {
    time: number;
    waypointName: string;
};

export type VoltageDrop = {
    threshold: number;
    dropBelowAtIndex: number | null;
    dropBelowAtTime: number | null;
    defaultThresholdUsed: boolean;
};
