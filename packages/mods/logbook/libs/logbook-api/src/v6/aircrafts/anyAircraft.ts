import type { Aircraft } from "./apiModels";

export const anyAircraft = (overwrites?: Partial<Aircraft>): Aircraft => ({
    id: "43g5bvrg5h4rb",
    productLine: "VC",
    aircraftType: "VC1-2",
    msn: "01",
    createTime: new Date().toISOString(),
    updateTime: new Date().toISOString(),
    ...overwrites,
});
