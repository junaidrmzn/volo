import { PriceItem } from "../price-item/apiModels";

export type PriceStatus = "DRAFT" | "AWAITING_APPROVAL" | "APPROVED";

export type Price = {
    id: string;
    commercialPlanId: string;
    status: PriceStatus;
    isValidAllConnectionsAllDates: boolean;
    commercialPriceItems: [PriceItem];
    comments: string;
};

export type PricePayload = {
    currency: string;
    price: number;
};

export type ApprovePayload = {
    commercialPriceItems: [PriceItem];
};

export type RejectPayload = ApprovePayload & {
    comments: string;
};

export type UpdateStatusPayload = {
    status: PriceStatus;
};
