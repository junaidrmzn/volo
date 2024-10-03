import type { PriceItem } from "./apiModels";

export const anyPriceItem = (overwrites?: Partial<PriceItem>): Required<PriceItem> => ({
    id: "1",
    commercialPlanId: "1",
    price: 10,
    validFrom: "2024-01-01T00:00:00.000Z",
    validTo: "2024-12-31T00:00:00.000Z",
    connectionId: null,
    day: null,
    currency: "EUR",
    commercialPriceId: "1",
    ...overwrites,
});
