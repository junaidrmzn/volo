import { RouteFullEnergy } from "../models";

export const anyRouteFullEnergy = (overrides?: Partial<RouteFullEnergy>): RouteFullEnergy => ({
    mainEnergyPowercurve: [
        {
            time: 1.428,
            remainingEnergy: 43.456,
            bestReachableCsflSiteHeading: 0,
        },
    ],
    contingencyEnergy: 4.11,
    csflPowerCurve: [
        {
            time: 24.285,
            bestReachableCsflSiteEnergy: 0.358,
            bestReachableCsflSiteName: "WP0 - Roma Termini",
            bestReachableCsflSiteTime: 11,
        },
    ],
    temperatureTimeIntervals: [
        {
            time: 1.428,
            batteryTemperature: 20.119,
        },
    ],
    voltageTimeIntervals: [
        {
            time: 1.428,
            batteryVoltage: 3.845,
        },
    ],
    voltageDrop: {
        threshold: 3.5,
        dropBelowAtIndex: null,
        dropBelowAtTime: null,
        defaultThresholdUsed: true,
    },
    csflTemperatureTimeIntervals: [
        {
            time: 970.595,
            bestReachableCsflSiteTemperature: 57.494,
            bestReachableCsflSiteName: "WP0 - Roma Termini",
        },
    ],
    taxi: {
        taxiValid: false,
        taxiCsflValid: false,
        taxiEnergy: [0.23, 0],
    },
    finalReserve: 2.5,
    unusableEnergy: 3.5,
    discretionaryEnergy: 0.1,
    additionalEnergy: 0.1,
    extraEnergy: 0.1,
    targetTimeOver: [
        {
            routeSequenceIndex: 1,
            tto: 970.597,
        },
    ],
    csflTemperatureTimeIntervalsWorstCase: [
        {
            time: 24.285,
            bestReachableCsflSiteTemperature: 0,
            bestReachableCsflSiteName: "WP0 - Roma Termini",
        },
    ],
    csflWorstCasePowerCurve: [
        {
            time: 24.285,
            bestReachableCsflSiteEnergy: 9.895,
            bestReachableCsflSiteName: "WP0 - Roma Termini",
            bestReachableCsflSiteTime: 11,
        },
    ],
    windSpeed: 11,
    windDirection: 90,
    alerts: [],
    waypointsReference: [
        {
            time: 860.85,
            waypointName: "Roma Termini",
        },
    ],
    remainingEnergy: 1.2,
    validationStatus: "valid",
    duration: 1.2,
    ...overrides,
});
