import { OfferRunwayUnit } from "../offer-item";
import { Currency } from "../price-item";

export type PromotionStatus = "DRAFT" | "PUBLISHED";

export type PromotionType = "EARLY_ACCESS" | "DISCOUNT";

export type DiscountType = "AMOUNT" | "PERCENTAGE";

export type PromotionItemStatus = "CREATED" | "CLAIMED" | "REDEEMED" | "INVALIDATED";

type BasePromotion = {
    id: string;
    name: string;
    validFrom: string;
    validTo: string;
    regionId: string;
    regionName: string;
    status: PromotionStatus;
    value: number;
    itemsCount: number;
};

export type BasePromotionPayload = {
    type: PromotionType;
    codes: string;
} & Pick<BasePromotion, "name" | "validFrom" | "validTo" | "regionId" | "regionName" | "value">;

export type Discount = BasePromotion & {
    type: "DISCOUNT";
    discountType: DiscountType;
    symbol: string;
};

export type EarlyAccess = BasePromotion & {
    type: "EARLY_ACCESS";
    accessType: OfferRunwayUnit;
};

export type DiscountPayload = {
    currency?: Currency;
} & BasePromotionPayload &
    Pick<Discount, "discountType">;

export type EarlyAccessPayload = BasePromotionPayload & Pick<EarlyAccess, "accessType">;

export type PromotionItem = {
    id: string;
    promoId: string;
    status: PromotionItemStatus;
    code: string;
    customerId: string;
    customerName: string;
    customerEmail: string;
    bookingId: string;
};

export type UpdatePromotionItemPayload = {
    promotionItems: [PromotionItem] | [];
};

export type UpdatePromotionItemProps = "invalidate" | "re-validate";
