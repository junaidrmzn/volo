import {
    Offer,
    Plan,
    PlanProcess,
    PlanSummary,
    Price,
    ScheduleItem,
    anyOffer,
    anyOfferItem,
    anyPlan,
    anyPlanProcess,
    anyPlanSummary,
    anyPrice,
    anyPriceItem,
    anyScheduleItem,
} from "@voloiq/commercial-scheduling-api/v1";
import { Route } from "@voloiq/routing";
import { PlanOverview } from "../../src/features/plan/PlanOverview";
import { PlanDetail } from "../../src/features/plan/detail/PlanDetail";
import {
    addOfferItemInterceptor,
    addPlanSummaryInterceptor,
    addPriceInterceptor,
    approveOfferInterceptor,
    approvePlanInterceptor,
    approvePlanSummaryInterceptor,
    approvePriceInterceptor,
    createPlanInterceptor,
    deletePlanInterceptor,
    editOfferItemInterceptor,
    editPlanInterceptor,
    editPlanSummaryInterceptor,
    editPriceItemInterceptor,
    getOffersInterceptor,
    getPlanByIdInterceptor,
    getPlanInterceptor,
    getPlanProcessProgressInterceptor,
    getPlanSummaryInterceptor,
    getPricesInterceptor,
    getRegionsInterceptor,
    getScheduleItemsInterceptor,
    overwritePlanSummaryInterceptor,
    publishPlanIntercepter,
    rejectOfferInterceptor,
    rejectPlanInterceptor,
    rejectPriceInterceptor,
    requestOfferApproveInterceptor,
    requestPlanApprovalInterceptor,
    requestPriceApproveInterceptor,
} from "../interceptors";
import { CypressServiceProvider } from "./CypressResources";

type SetupInterceptorsOptions = {
    plan?: Plan;
    planProcess?: PlanProcess;
    scheduleItem?: ScheduleItem;
    price?: Price;
    offer?: Offer;
    planSummary?: PlanSummary;
};

export const mountPlanOverview = () => {
    cy.mount(
        <CypressServiceProvider initialEntries={["/overview"]}>
            <Route path="overview/*" element={<PlanOverview />} />
            <Route path="overview/:planId/*" element={<PlanDetail />} />
        </CypressServiceProvider>
    );
};

export const setupInterceptors = (options: SetupInterceptorsOptions = {}) => {
    const {
        plan = anyPlan({ id: "1", planName: "Plan 1", status: "DRAFT" }),
        planProcess = anyPlanProcess({ id: "1", status: "NEW" }),
        scheduleItem = anyScheduleItem({ id: "1", planName: "Plan 1", status: "DRAFT", flightNumber: "1111" }),
        price = anyPrice({
            id: "1",
            status: "DRAFT",
            commercialPriceItems: [anyPriceItem({ price: 10, currency: "EUR" })],
        }),
        offer = anyOffer({
            id: "1",
            status: "DRAFT",
            commercialOfferItems: [anyOfferItem({ offerRunwayValue: 10, offerRunwayUnit: "HOURS" })],
        }),
        planSummary = anyPlanSummary({
            id: "1",
            isCustomized: true,
            customItemStatus: "DRAFT",
            customPrice: 10,
            customOfferRunwayUnit: "HOURS",
            customOfferRunwayValue: 2,
        }),
    } = options;

    getRegionsInterceptor();
    getPlanInterceptor(plan);
    getPlanByIdInterceptor(plan);
    createPlanInterceptor(planProcess);
    getPlanProcessProgressInterceptor(planProcess.id);
    editPlanInterceptor(plan);
    deletePlanInterceptor(plan.id);
    getScheduleItemsInterceptor(plan.id, scheduleItem);
    getPricesInterceptor(plan.id, price);
    addPriceInterceptor(price.id);
    editPriceItemInterceptor(price.commercialPriceItems?.[0]?.id ?? "-1");
    approvePriceInterceptor(price.id);
    rejectPriceInterceptor(price.id);
    requestPriceApproveInterceptor(price.id);
    getOffersInterceptor(plan.id, offer);
    requestOfferApproveInterceptor(offer.id);
    editOfferItemInterceptor(offer.commercialOfferItems?.[0]?.id ?? "-1");
    addOfferItemInterceptor(offer.id);
    approveOfferInterceptor(offer.id);
    rejectOfferInterceptor(offer.id);
    getPlanSummaryInterceptor(plan.id, planSummary);
    addPlanSummaryInterceptor();
    editPlanSummaryInterceptor(planSummary.commercialScheduleItemId ?? "-1");
    approvePlanSummaryInterceptor();
    overwritePlanSummaryInterceptor(planSummary.commercialScheduleItemId ?? "-1");
    requestPlanApprovalInterceptor(plan.id);
    approvePlanInterceptor(plan.id);
    rejectPlanInterceptor(plan.id);
    publishPlanIntercepter(plan.id);
};
