import { OfferItemInfo, OfferRunwayUnit } from "../offer-item";
import { PlanStatus } from "../plan";
import { PriceItemInfo } from "../price-item";
import { ScheduleItemStatus } from "../schedule-item";

export type PlanSummaryCustomItemStatus = "DRAFT" | "AWAITING_APPROVAL" | "APPROVED";
export type PlanSummaryConnectionStatus = "CONSISTENT" | "INCONSISTENT";

type BasePlanSummary = {
    id: string;
    commercialPlanId: string;
    commercialPlanStatus: PlanStatus;
    commercialScheduleItemId: string;
    commercialScheduleItemStatus: ScheduleItemStatus;
    flightNumber: string;
    departureVertiportCode: string;
    arrivalVertiportCode: string;
    departureTime: string;
    arrivalTime: string;
    aircraftTypeName: string;
    prices: PriceItemInfo[];
    offers: OfferItemInfo[];
    scheduleItemConnectionStatus: PlanSummaryConnectionStatus;
};

type CustomziedPlanSummary = {
    isCustomized: boolean;
    isDeleted?: boolean;
    isCustomScheduleItemDeletionReq?: boolean;
    isNoCustomOffer?: boolean;
    isCustomOverwritten?: boolean;
    customCommercialScheduleItemId?: string;
    customItemStatus?: PlanSummaryCustomItemStatus;
    customPrice?: number;
    customOfferRunwayUnit?: OfferRunwayUnit;
    customOfferRunwayValue?: number;
    customComments?: string;
};

export type PlanSummary = BasePlanSummary & CustomziedPlanSummary;

export type PlanSummaryCustomization = Partial<
    Pick<
        PlanSummary,
        | "commercialScheduleItemId"
        | "customPrice"
        | "customOfferRunwayValue"
        | "customOfferRunwayUnit"
        | "isNoCustomOffer"
        | "customComments"
    >
>;
export type ApprovePlanSummaryPayload = {
    commercialPlanId: string;
    commercialScheduleItemCustomizations: PlanSummary[];
};
