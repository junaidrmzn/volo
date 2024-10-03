import { anyOfferItem } from "../offer-item";
import { Offer } from "./apiModels";

export const anyOffer = (overwrites?: Partial<Offer>): Required<Offer> => ({
    id: "1",
    commercialPlanId: "1",
    status: "DRAFT",
    commercialOfferItems: [anyOfferItem()],
    isValidAllConnectionsAllDates: true,
    comments: "comments",
    ...overwrites,
});
