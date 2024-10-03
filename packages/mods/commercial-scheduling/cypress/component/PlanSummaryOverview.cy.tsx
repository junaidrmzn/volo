import { anyPlan, anyPlanSummary } from "@voloiq/commercial-scheduling-api/v1";
import {
    addPlanSummaryModal,
    approvePlanModal,
    pageOverview,
    planDetail,
    planOverview,
    planSummaryOveriew,
    planSummaryOveriewSidePanel,
    rejectPlanModal,
    requestPlanApprovalModal,
} from "../page-objects";
import { mountPlanOverview, setupInterceptors } from "../resources/PlanCypressResources";

describe("PlanSummaryOverview", () => {
    const planName = "Plan 1";
    const plan = anyPlan({ planName, hasOffer: true, hasPrice: true });
    const tabName = "Plan";

    it("render plan summaries overview", () => {
        setupInterceptors({ plan });

        mountPlanOverview();

        const flightNumber = "1111";
        planOverview.findDetailButton(planName).click();
        pageOverview.findTabItem(tabName).click();
        planSummaryOveriew.findInformation().should("be.visible");
        planDetail.findRequestPlanApprovalButton().should("be.visible");
        planSummaryOveriew.findList().should("be.visible");
        planSummaryOveriew.findListItem(flightNumber).should("be.visible");
        planSummaryOveriew.findVertiportCode(flightNumber, "D01").should("be.visible");
        planSummaryOveriew.findVertiportCode(flightNumber, "A01").should("be.visible");
        planSummaryOveriew.findLabel("Price").should("be.visible");
        planSummaryOveriew.findLabel("Offer Runway").should("be.visible");
        planSummaryOveriew.findActionsButton(flightNumber).should("be.visible");
        planSummaryOveriew.findEditButton(flightNumber).should("be.visible");
    });

    it("render plan summaries overview with inconsistent items", () => {
        setupInterceptors({ plan, planSummary: anyPlanSummary({ scheduleItemConnectionStatus: "INCONSISTENT" }) });

        mountPlanOverview();

        const flightNumber = "1111";
        planOverview.findDetailButton(planName).click();
        pageOverview.findTabItem(tabName).click();
        planSummaryOveriew.findDeleteButton(flightNumber).should("be.visible");
    });

    it("render plan summaries overview with invalid snackbar banner", () => {
        setupInterceptors({
            plan: anyPlan({
                planName,
                hasOffer: true,
                hasPrice: true,
                scheduleItemWrtConnectionState: "ALL_INCONSISTENT",
            }),
        });

        mountPlanOverview();

        planOverview.findDetailButton(planName).click();
        pageOverview.findTabItem(tabName).click();
        planSummaryOveriew.findInformation().should("be.visible");
        planSummaryOveriew.findBanner().should("be.visible");
    });

    it("render plan summaries overview side panel with change requests", () => {
        const flightNumber = "1234";

        setupInterceptors({
            plan,
            planSummary: anyPlanSummary({
                flightNumber,
                prices: [{ price: 100, currency: "EUR" }],
                offers: [{ offerRunwayValue: 5, offerRunwayUnit: "HOURS" }],
                isCustomized: true,
                customItemStatus: "AWAITING_APPROVAL",
                customPrice: 200,
                customOfferRunwayValue: 10,
                customOfferRunwayUnit: "HOURS",
                customComments: "change request with awaiting approval status",
            }),
        });

        mountPlanOverview();

        planOverview.findDetailButton(planName).click();
        pageOverview.findTabItem(tabName).click();
        planSummaryOveriewSidePanel.findChangeRequestsTitle(1).should("be.visible");
        planSummaryOveriewSidePanel.findChangeRequestItems().should("be.visible");
        pageOverview.findByText("change request with awaiting approval status").should("be.visible");
    });

    it("render plan summaries overview side panel with change history", () => {
        const flightNumber = "1245";

        setupInterceptors({
            plan,
            planSummary: anyPlanSummary({
                flightNumber,
                prices: [{ price: 100, currency: "EUR" }],
                offers: [{ offerRunwayValue: 1, offerRunwayUnit: "HOURS" }],
                isCustomized: true,
                customItemStatus: "APPROVED",
                customPrice: 200,
                customOfferRunwayValue: 2,
                customOfferRunwayUnit: "HOURS",
                customComments: "change history with approved status",
            }),
        });

        mountPlanOverview();

        planOverview.findDetailButton(planName).click();
        pageOverview.findTabItem(tabName).click();
        planSummaryOveriewSidePanel.findChangeHistoryTitle(1).should("be.visible");
        planSummaryOveriewSidePanel.findChangeHistoryItems().should("be.visible");
        pageOverview.findByText("change history with approved status").should("be.visible");
    });

    it("render plan summary customization with overwritten status", () => {
        const flightNumber = "1245";

        setupInterceptors({
            plan,
            planSummary: anyPlanSummary({
                flightNumber,
                prices: [{ price: 100, currency: "EUR" }],
                offers: [{ offerRunwayValue: 1, offerRunwayUnit: "HOURS" }],
                isCustomized: true,
                isCustomOverwritten: true,
                customItemStatus: "APPROVED",
                customPrice: 200,
                customOfferRunwayValue: 2,
                customOfferRunwayUnit: "HOURS",
                customComments: "change history with approved status",
            }),
        });

        mountPlanOverview();

        planOverview.findDetailButton(planName).click();
        pageOverview.findTabItem(tabName).click();
        pageOverview.findByText("Overwritten");
    });

    it("render add plan summary item", () => {
        setupInterceptors({
            plan,
            planSummary: anyPlanSummary({
                isCustomized: false,
                prices: [{ price: 210, currency: "EUR" }],
                offers: [
                    {
                        offerRunwayUnit: "DAYS",
                        offerRunwayValue: 4,
                    },
                ],
            }),
        });

        mountPlanOverview();

        const flightNumber = "1111";
        planOverview.findDetailButton(planName).click();
        pageOverview.findTabItem(tabName).click();
        planSummaryOveriew.findEditButton(flightNumber).click();
        addPlanSummaryModal.add("add customization testing");
    });

    it("render edit plan summary item", () => {
        setupInterceptors({
            plan,
            planSummary: anyPlanSummary({
                isCustomized: true,
                customPrice: 210,
                customOfferRunwayUnit: "DAYS",
                customOfferRunwayValue: 4,
            }),
        });

        mountPlanOverview();

        const flightNumber = "1111";
        planOverview.findDetailButton(planName).click();
        pageOverview.findTabItem(tabName).click();
        planSummaryOveriew.findEditButton(flightNumber).click();
        addPlanSummaryModal.add("edit customization testing");
    });

    it("delete plan summary customization", () => {
        const flightNumber = "1234";

        setupInterceptors({
            plan,
            planSummary: anyPlanSummary({
                flightNumber,
                prices: [{ price: 100, currency: "EUR" }],
                offers: [{ offerRunwayValue: 5, offerRunwayUnit: "HOURS" }],
                isCustomized: true,
                customItemStatus: "DRAFT",
                customPrice: 200,
                customOfferRunwayValue: 10,
                customOfferRunwayUnit: "HOURS",
                customComments: "change request with draft status",
            }),
        });

        mountPlanOverview();

        planOverview.findDetailButton(planName).click();
        pageOverview.findTabItem("Plan").click();
        planSummaryOveriewSidePanel.findChangeRequestActionButton("deleteCustomizationAction").click();
    });

    it("render approve commercial plan modal", () => {
        setupInterceptors({
            plan: anyPlan({
                ...plan,
                status: "AWAITING_APPROVAL",
            }),
            planSummary: anyPlanSummary({
                commercialPlanStatus: "AWAITING_APPROVAL",
            }),
        });

        mountPlanOverview();

        planOverview.findDetailButton(planName).click();
        pageOverview.findTabItem(tabName).click();
        planDetail.findApprovePlanButton().click();
        approvePlanModal.findHeading().should("be.visible");
        approvePlanModal.findSubheading().should("be.visible");

        approvePlanModal.findApproveButton().should("be.visible").click();
        pageOverview.findToastByText("Commercial Plan Approved").should("be.visible");
    });

    it("render reject offer modal", () => {
        setupInterceptors({
            plan: anyPlan({
                ...plan,
                status: "AWAITING_APPROVAL",
            }),
        });

        mountPlanOverview();

        planOverview.findDetailButton(planName).click();
        pageOverview.findTabItem(tabName).click();
        planDetail.findRejectPlanButton().click();
        rejectPlanModal.findHeading().should("be.visible");
        rejectPlanModal.findSubheading().should("be.visible");

        rejectPlanModal.findRejectButton().should("be.visible").click();
    });

    it("approve plan summary customization", () => {
        const flightNumber = "1234";

        setupInterceptors({
            plan,
            planSummary: anyPlanSummary({
                flightNumber,
                prices: [{ price: 100, currency: "EUR" }],
                offers: [{ offerRunwayValue: 5, offerRunwayUnit: "HOURS" }],
                isCustomized: true,
                customItemStatus: "AWAITING_APPROVAL",
                customPrice: 200,
                customOfferRunwayValue: 10,
                customOfferRunwayUnit: "HOURS",
                customComments: "change request with awaiting approval status",
            }),
        });

        mountPlanOverview();

        planOverview.findDetailButton("Plan 1").click();
        pageOverview.findTabItem("Plan").click();
        planSummaryOveriewSidePanel.findChangeRequestActionButton("approveCustomizationAction").click();
    });

    it("approve all plan summary customization", () => {
        const flightNumber = "1234";

        setupInterceptors({
            plan,
            planSummary: anyPlanSummary({
                flightNumber,
                prices: [{ price: 100, currency: "EUR" }],
                offers: [{ offerRunwayValue: 5, offerRunwayUnit: "HOURS" }],
                isCustomized: true,
                customItemStatus: "AWAITING_APPROVAL",
                customPrice: 200,
                customOfferRunwayValue: 10,
                customOfferRunwayUnit: "HOURS",
                customComments: "change request with awaiting approval status",
            }),
        });

        mountPlanOverview();

        planOverview.findDetailButton("Plan 1").click();
        pageOverview.findTabItem("Plan").click();
        planSummaryOveriewSidePanel.findApproveAllButton().click();
        planSummaryOveriewSidePanel.findApproveButton().click();
    });

    it("reject/overwrite plan summary customization", () => {
        const flightNumber = "1234";

        setupInterceptors({
            plan,
            planSummary: anyPlanSummary({
                flightNumber,
                prices: [{ price: 100, currency: "EUR" }],
                offers: [{ offerRunwayValue: 5, offerRunwayUnit: "HOURS" }],
                isCustomized: true,
                customItemStatus: "AWAITING_APPROVAL",
                customPrice: 200,
                customOfferRunwayValue: 10,
                customOfferRunwayUnit: "HOURS",
                customComments: "change request with awaiting approval status",
            }),
        });

        mountPlanOverview();

        planOverview.findDetailButton("Plan 1").click();
        pageOverview.findTabItem("Plan").click();
        planSummaryOveriewSidePanel.findChangeRequestActionButton("rejectCustomizationAction").click();
        addPlanSummaryModal.findCommentInput().clear().type("change request with overwrite status");
        addPlanSummaryModal.findOverwriteButton().click();
    });

    it("request plan approval with warning modal", () => {
        setupInterceptors({
            plan: anyPlan({ ...plan, scheduleItemWrtConnectionState: "SOME_INCONSISTENT" }),
        });

        mountPlanOverview();

        planOverview.findDetailButton("Plan 1").click();
        pageOverview.findTabItem("Plan").click();
        planDetail.findRequestPlanApprovalButton().click();
        requestPlanApprovalModal.findHeading().should("be.visible");
        requestPlanApprovalModal.findSubheading().should("be.visible");
        requestPlanApprovalModal.findRequestPlanApprovalButton().click();
        cy.wait("@requestPlanApproval").its("response.statusCode").should("equal", 200);
    });
});
