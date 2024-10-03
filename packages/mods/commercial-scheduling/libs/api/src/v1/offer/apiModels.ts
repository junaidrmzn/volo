import { OfferItem } from "../offer-item";

export type OfferStatus = "DRAFT" | "AWAITING_APPROVAL" | "APPROVED";

export type Offer = {
    id: string;
    commercialPlanId: string;
    status: OfferStatus;
    isValidAllConnectionsAllDates: boolean;
    commercialOfferItems: [OfferItem] | [];
    comments: string;
};

export type ApproveOfferPayload = {
    commercialOfferItems: [OfferItem] | [];
};

export type RejectOfferPayload = ApproveOfferPayload & {
    comments: string;
};
