import type { BatteryEnergy } from "./types";

export const getNextEnergyType = (batteryEnergy: BatteryEnergy, energyType?: string): number | string => {
    const energyMapping: [string, string][] = [
        ["contingencyEnergy", "discretionaryEnergyValue"],
        ["discretionaryEnergy", "extraEnergyValue"],
        ["extraEnergy", "additionalEnergyValue"],
        ["additionalEnergy", "finalReserveValue"],
        ["finalReserve", "unusableEnergyValue"],
        ["unusableEnergy", "start"],
    ];
    const nextType = energyMapping.find(([currentType]) => currentType === energyType)?.[1];

    if (nextType && batteryEnergy && nextType in batteryEnergy) {
        return batteryEnergy[nextType] || 0;
    }
    return "auto";
};
