import { anyPriceItem } from "../price-item/anyPriceItem";
import { Price } from "./apiModels";

export const anyPrice = (overwrites?: Partial<Price>): Required<Price> => ({
    id: "1",
    commercialPlanId: "1",
    status: "DRAFT",
    isValidAllConnectionsAllDates: true,
    commercialPriceItems: [anyPriceItem({ price: 210, currency: "EUR" })],
    comments: "comments",
    ...overwrites,
});
