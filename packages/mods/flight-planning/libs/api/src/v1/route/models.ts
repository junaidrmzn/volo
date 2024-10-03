import { Waypoint } from "../waypoint";

export type Alert = {
    id?: number;
    message?: string;
    type?: string;
    routeId: number;
};

export type Route = {
    id: number;
    name: string;
    description: string;
    plannedBy: string;
    createdAt: string;
    distance: number;
    duration: number;
    refAltAmsl: number;
    remainingEnergy: number;
    validationStatus?: "invalid" | "valid" | "not_yet_validated";
    validityDate?: string;
    routeOptionId: number;
    waypoints?: Waypoint[];
    alerts?: Alert[];
    routeEnergySettings?: RouteEnergySettings;
    isAltitudeProfileGenerated?: boolean;
};

export type RouteEnergySettings = {
    windSpeed?: number;
    windDirection?: number;
    takeoffMass?: number;
    batteryCycles?: number;
    airDensity?: number;
    pilotEfficiencySafetyBuffer?: number;
    transitionAltitude?: number;
    airspeedCsfl?: number;
    descendAngleCsfl?: number;
    climbTakeoff?: number;
    climbTouchDown?: number;
    maxClimbRate?: number;
    maxDescendRate?: number;
    loiterAltitude?: number;
    loiterTime?: number;
    loiterTimeCsfl?: number;
    batteryCapacityOrig?: number;
    unusableEnergy?: number;
    finalReserve?: number;
    additionalEnergy?: number;
    extraEnergy?: number;
    discretionaryEnergy?: number;
    contingencyEnergy?: number;
    goAroundEnergy?: number;
    integrationTimeStepsSeconds?: number;
    ambientTemperature?: number;
    csflEnergyOverhead?: number;
    pdmTwoEfficiencyLoss?: number;
    maxTimeToCsfl?: number;
    departureTaxiSpeed?: number;
    departureTaxiDistance?: number;
    arrivalTaxiSpeed?: number;
    arrivalTaxiDistance?: number;
    horizontalObstacleClearance?: number;
    verticalObstacleClearance?: number;
};

export type FlightStatus = {
    alerts: Alert[];
    remainingEnergy: number;
    validationStatus?: "invalid" | "valid" | "not_yet_validated";
    duration: number;
};

// Enum for WeatherTypes
export const WeatherFields = {
    standard: "Standard" as WeatherTypes,
    specific: "Specific" as WeatherTypes,
    live: "Live" as WeatherTypes,
};

export type WeatherTypes = "Standard" | "Specific" | "Live";
