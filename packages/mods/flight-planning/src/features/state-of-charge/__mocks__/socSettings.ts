import type { RouteEnergySettings } from "@voloiq-typescript-api/flight-planning-types";

export const mockedSocSettings: RouteEnergySettings = {
    // Normal settings
    windSpeed: 0, // kts input, converted to m/s upon init
    windDirection: 180, // angles input, converted to rad upon init
    takeoffMass: 950, // kg
    batteryCycles: 100, // #
    airDensity: 1.15, // kg/m^3
    ambientTemperature: 20, // °C
    pdmTwoEfficiencyLoss: 13, // %
    maxTimeToCsfl: 6, // min
    // Expert settings
    transitionAltitude: 30, // m
    airspeedCsfl: 38, // kts input, converted to m/s upon init
    descendAngleCsfl: 6, // deg input, converted to rad upon init
    climbTakeoff: 2.1, // m/s
    climbTouchDown: -2.1, // m/s
    maxClimbRate: 3.0988, // m/s
    maxDescendRate: 2.54, // m/s
    loiterAltitude: 3, // m
    loiterTime: 10, // sec
    loiterTimeCsfl: 10, // sec
    batteryCapacityOrig: 48.1, // kWh
    integrationTimeStepsSeconds: 30, // sec
};

export const createMockedSocSettings = (overrides?: Partial<RouteEnergySettings>): RouteEnergySettings => ({
    ...mockedSocSettings,
    ...overrides,
});
