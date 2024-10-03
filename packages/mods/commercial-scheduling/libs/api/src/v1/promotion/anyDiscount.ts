import { Discount } from "./apiModels";

export const anyDiscount = (overwrites?: Partial<Discount>): Required<Discount> => ({
    id: "1",
    name: "discount",
    status: "DRAFT",
    validFrom: "2024-02-01T00:00:00Z",
    validTo: "2024-02-10T00:00:00Z",
    regionId: "1",
    regionName: "region",
    type: "DISCOUNT",
    discountType: "AMOUNT",
    symbol: "EUR",
    value: 10,
    itemsCount: 1,
    ...overwrites,
});
