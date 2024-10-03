export type OfferRunwayUnit = "HOURS" | "DAYS" | "WEEKS" | "MONTHS";

export type OfferItem = {
    id: string;
    commercialOfferId: string;
    offerRunwayValue: number;
    offerRunwayUnit: OfferRunwayUnit;
    validFrom: string;
    validTo: string;
    commercialPlanId?: string;
};

export type OfferItemInfo = Pick<OfferItem, "offerRunwayValue" | "offerRunwayUnit">;
