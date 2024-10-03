import { ExternalAircraftType } from "./models";

export const anyExternalAircraftType = (overwrites?: Partial<ExternalAircraftType>): ExternalAircraftType => ({
    externalId: "type-1",
    name: "VC2-1",
    productLine: "VOLOCITY",
    validFrom: new Date(Date.UTC(2022, 4, 1)).toString(),
    validTo: new Date(Date.UTC(2022, 4, 10)).toString(),
    createTime: "",
    updateTime: "",
    ...overwrites,
});
