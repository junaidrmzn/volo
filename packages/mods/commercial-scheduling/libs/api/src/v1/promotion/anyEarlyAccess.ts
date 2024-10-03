import { EarlyAccess } from "./apiModels";

export const anyEarlyAccess = (overwrites?: Partial<EarlyAccess>): Required<EarlyAccess> => ({
    id: "1",
    name: "discount",
    status: "DRAFT",
    validFrom: "2024-02-01T00:00:00Z",
    validTo: "2024-02-10T00:00:00Z",
    regionId: "1",
    regionName: "region",
    type: "EARLY_ACCESS",
    accessType: "DAYS",
    value: 10,
    itemsCount: 1,
    ...overwrites,
});
