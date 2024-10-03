import { anyPlan, anyPrice } from "@voloiq/commercial-scheduling-api/v1";
import {
    addPriceModal,
    approvePriceModal,
    editPriceModal,
    pageOverview,
    planOverview,
    pricePage,
    rejectPriceModal,
} from "../page-objects";
import { mountPlanOverview, setupInterceptors } from "../resources/PlanCypressResources";

describe("Price", () => {
    const planName = "Plan 1";
    const tabName = "Pricing";

    it("render price of a commercial plan", () => {
        setupInterceptors();

        mountPlanOverview();

        planOverview.findDetailButton(planName).click();
        pageOverview.findTabItem(tabName).click();
        pricePage.findInformation().should("be.visible");
        pricePage.findRequestPricingApprovalButton().should("be.visible");
        pricePage.findEditButton().should("be.visible");
        pageOverview.findByText("Pricing for this plan");
    });

    it("render add price modal", () => {
        setupInterceptors({
            price: anyPrice({
                status: "DRAFT",
                commercialPriceItems: undefined,
            }),
        });

        mountPlanOverview();

        planOverview.findDetailButton(planName).click();
        pageOverview.findTabItem(tabName).click();
        pricePage.findAddButton().click();
        addPriceModal.add({ price: "10", currencyIndex: 0 });
        pageOverview.findToastByText("Price Definition Added").should("be.visible");
    });

    it("render edit price modal for a awaiting approval plan with draft pricing", () => {
        setupInterceptors({
            plan: anyPlan({
                planName,
                status: "AWAITING_APPROVAL",
            }),
        });

        mountPlanOverview();

        planOverview.findDetailButton(planName).click();
        pageOverview.findTabItem(tabName).click();
        pricePage.findEditButton().click();
        editPriceModal.edit({ price: "210", currencyIndex: 0 });
        pageOverview.findToastByText("Price Definition Edited").should("be.visible");
    });

    it("render edit price modal for awating approval plan with approved pricing", () => {
        setupInterceptors({
            plan: anyPlan({
                planName,
                status: "AWAITING_APPROVAL",
            }),
            price: anyPrice({
                status: "APPROVED",
            }),
        });

        mountPlanOverview();

        planOverview.findDetailButton(planName).click();
        pageOverview.findTabItem(tabName).click();
        pricePage.findEditButton().click();
        editPriceModal.edit({ price: "210", currencyIndex: 0 });
        editPriceModal.findConfirmationModal().should("be.visible");
        editPriceModal.findEditButton().click();
        pageOverview.findToastByText("Price Definition Edited").should("be.visible");
    });

    it("edit price button should be disabled for published plan with approved pricing", () => {
        setupInterceptors({
            plan: anyPlan({
                planName,
                status: "PUBLISHED",
            }),
            price: anyPrice({
                status: "APPROVED",
            }),
        });

        mountPlanOverview();

        planOverview.findDetailButton(planName).click();
        pageOverview.findTabItem(tabName).click();
        pricePage.findEditButton().should("be.disabled");
    });

    it("render approve price modal", () => {
        setupInterceptors({
            price: anyPrice({
                status: "AWAITING_APPROVAL",
            }),
        });

        mountPlanOverview();

        planOverview.findDetailButton(planName).click();
        pageOverview.findTabItem(tabName).click();
        pricePage.findApprovePricingButton().click();
        approvePriceModal.findHeading().should("be.visible");
        approvePriceModal.findSubheading().should("be.visible");

        approvePriceModal.findApproveButton().should("be.visible").click();
        pageOverview.findToastByText("Pricing Definition Approved").should("be.visible");
    });

    it("render reject price modal", () => {
        setupInterceptors({
            price: anyPrice({
                status: "AWAITING_APPROVAL",
            }),
        });

        mountPlanOverview();

        planOverview.findDetailButton(planName).click();
        pageOverview.findTabItem(tabName).click();
        pricePage.findRejectPricingButton().click();
        rejectPriceModal.findHeading().should("be.visible");
        rejectPriceModal.findSubheading().should("be.visible");
        rejectPriceModal.findCommentsInput().clear().type("comments");

        rejectPriceModal.findRejectButton().should("be.visible").click();
        pageOverview.findToastByText("Pricing Definition Rejected").should("be.visible");
    });

    it("render request for approval of pricing", () => {
        setupInterceptors();

        mountPlanOverview();

        planOverview.findDetailButton(planName).click();
        pageOverview.findTabItem(tabName).click();
        pricePage.findRequestPricingApprovalButton().click();
        pageOverview.findToastByText("Requested pricing approval successfully").should("be.visible");
    });
});
