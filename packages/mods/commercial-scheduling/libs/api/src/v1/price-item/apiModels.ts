export type Currency = "EUR" | "USD" | "YEN" | "GBP";

export type PriceItem = {
    id: string;
    commercialPlanId?: string;
    commercialPriceId: string;
    price: number;
    validFrom: string;
    validTo: string;
    connectionId: string | null;
    day: string | null;
    currency: Currency;
};

export type PriceItemInfo = Pick<PriceItem, "price" | "currency">;
