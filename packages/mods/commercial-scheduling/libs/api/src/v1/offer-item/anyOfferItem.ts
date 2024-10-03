import { OfferItem } from "./apiModel";

export const anyOfferItem = (overwrites?: Partial<OfferItem>): Required<OfferItem> => ({
    id: "1",
    commercialOfferId: "1",
    offerRunwayUnit: "HOURS",
    offerRunwayValue: 10,
    validFrom: "2024-01-01T00:00:00.000Z",
    validTo: "2024-12-31T00:00:00.000Z",
    commercialPlanId: "1",
    ...overwrites,
});
