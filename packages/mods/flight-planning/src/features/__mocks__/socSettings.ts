import type { RouteEnergySettings } from "../expert-settings/types";

export const anySocSettings = (overrides?: Partial<RouteEnergySettings>): RouteEnergySettings => ({
    // Normal settings
    airDensity: 1.15, // kg/m^3
    ambientTemperature: 20, // °C
    batteryCycles: 100, // #
    maxTimeToCsfl: 6, // min
    takeoffMass: 950, // kg
    windDirection: 180, // angles input, converted to rad upon init
    windSpeed: 10, // kts input, converted to m/s upon init
    csflEnergyOverhead: 10, // %
    pdmTwoEfficiencyLoss: 13, // %
    discretionaryEnergy: 6, // kWh
    additionalEnergy: 7, // kWh
    extraEnergy: 8, // kWh
    goAroundEnergy: 10, // kWh
    contingencyEnergy: 10, // %
    horizontalObstacleClearance: 100, // m
    verticalObstacleClearance: 10, // m
    // Taxiing
    arrivalTaxiDistance: 50,
    arrivalTaxiSpeed: 15,
    departureTaxiDistance: 50,
    departureTaxiSpeed: 15,
    // Expert settings
    airspeedCsfl: 38, // kts input, converted to m/s upon init
    batteryCapacityOrig: 48.1, // kWh
    climbTakeoff: 2.1, // m/s
    climbTouchDown: -2.1, // m/s
    descendAngleCsfl: 6, // deg input, converted to rad upon init
    unusableEnergy: 3.5, // kWh
    finalReserve: 2.5, // kWh
    integrationTimeStepsSeconds: 30, // sec
    loiterAltitude: 3, // m
    loiterTime: 10, // sec
    loiterTimeCsfl: 10, // sec
    maxClimbRate: 3.0988, // m/s
    maxDescendRate: 2.54, // m/s
    transitionAltitude: 30, // m
    ...overrides,
});
