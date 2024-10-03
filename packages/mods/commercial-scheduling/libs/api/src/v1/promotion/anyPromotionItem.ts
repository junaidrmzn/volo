import { PromotionItem } from "./apiModels";

export const anyPromotionItem = (overwrites?: Partial<PromotionItem>): Required<PromotionItem> => ({
    id: "11",
    promoId: "1",
    status: "CREATED",
    code: "promo001",
    customerId: "0",
    customerName: "",
    customerEmail: "",
    bookingId: "",
    ...overwrites,
});
