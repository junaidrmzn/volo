import type { BatteryEnergy } from "../../lib/echarts/types";

export const convertVariableNameToString = (key: BatteryEnergy) => Object.keys(key)[0];
