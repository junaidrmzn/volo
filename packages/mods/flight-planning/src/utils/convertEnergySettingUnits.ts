import type { RouteEnergySettings } from "../features/expert-settings/types";
import { FEETPERMIN_TO_METERSPERSEC, METERSPERSEC_TO_FEETPERMIN } from "./unitConversionFactors";

export const convertEnergySettingUnitsForDisplay = (energySettings: RouteEnergySettings) => ({
    ...energySettings,
    ...(energySettings?.maxClimbRate && {
        maxClimbRate: Math.round(energySettings.maxClimbRate * METERSPERSEC_TO_FEETPERMIN),
    }),
    ...(energySettings?.maxDescendRate && {
        maxDescendRate: Math.round(energySettings.maxDescendRate * METERSPERSEC_TO_FEETPERMIN),
    }),
    // ... add more conversions here if needed
});

export const convertEnergySettingUnitsToSIUnits = (energySettings: RouteEnergySettings) => ({
    ...energySettings,
    ...(energySettings?.maxClimbRate && {
        maxClimbRate: energySettings.maxClimbRate * FEETPERMIN_TO_METERSPERSEC,
    }),
    ...(energySettings?.maxDescendRate && {
        maxDescendRate: energySettings.maxDescendRate * FEETPERMIN_TO_METERSPERSEC,
    }),
    // ... add more conversions here if needed
});
