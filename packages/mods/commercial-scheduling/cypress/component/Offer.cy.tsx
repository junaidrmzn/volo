import { anyOffer, anyOfferItem, anyPlan } from "@voloiq/commercial-scheduling-api/v1";
import {
    addOfferingModal,
    approveOfferModal,
    editOfferingModal,
    offerPage,
    pageOverview,
    planOverview,
    rejectOfferModal,
} from "../page-objects";
import { mountPlanOverview, setupInterceptors } from "../resources/PlanCypressResources";

describe("Offer", () => {
    const planName = "Plan 1";
    const tabName = "Offering";

    it("render offer of a commercial plan with offer items", () => {
        setupInterceptors();

        mountPlanOverview();

        planOverview.findDetailButton(planName).click();
        pageOverview.findTabItem(tabName).click();
        offerPage.findInformation().should("be.visible");
        offerPage.findRequestOfferingApprovalButton().should("be.visible");
        offerPage.findEditButton().should("be.visible");
        pageOverview.findByText("10").should("be.visible");
        pageOverview.findByText("Hour(s)").should("be.visible");
    });

    it("render offer of a commercial plan without offer items", () => {
        setupInterceptors({ offer: anyOffer({ commercialOfferItems: undefined }) });

        mountPlanOverview();

        planOverview.findDetailButton(planName).click();
        pageOverview.findTabItem(tabName).click();
        offerPage.findInformation().should("be.visible");
        offerPage.findAddButton().should("be.visible");
    });

    it("render request offer approval modal", () => {
        setupInterceptors();

        mountPlanOverview();

        planOverview.findDetailButton(planName).click();
        pageOverview.findTabItem(tabName).click();
        offerPage.findRequestOfferingApprovalButton().click();
        pageOverview.findByText("Requested offering approval successfully").should("exist");
    });

    it("Request offer approval button should not be displayed for approved offer", () => {
        setupInterceptors({ offer: anyOffer({ status: "APPROVED", commercialOfferItems: [anyOfferItem()] }) });

        mountPlanOverview();

        planOverview.findDetailButton(planName).click();
        pageOverview.findTabItem(tabName).click();
        offerPage.findRequestOfferingApprovalButton().should("not.exist");
    });

    it("edit offer button should be disabled for published plan", () => {
        setupInterceptors({
            plan: anyPlan({
                planName,
                status: "PUBLISHED",
            }),
        });

        mountPlanOverview();

        planOverview.findDetailButton(planName).click();
        pageOverview.findTabItem(tabName).click();
        offerPage.findEditButton().should("be.disabled");
    });

    it("render edit offer modal for a approved plan", () => {
        setupInterceptors({
            plan: anyPlan({
                planName,
                status: "APPROVED",
            }),
        });

        mountPlanOverview();

        planOverview.findDetailButton(planName).click();
        pageOverview.findTabItem(tabName).click();
        offerPage.findInformation().should("be.visible");
        offerPage.findEditButton().click();
        editOfferingModal.edit({ value: "210", unit: "HOURS" });
        offerPage.findNotification("Offer Runway Edited").should("exist");
    });

    it("render edit offer modal for a approved plan with offer status approved", () => {
        setupInterceptors({
            plan: anyPlan({
                planName,
                status: "APPROVED",
            }),
            offer: anyOffer({
                status: "APPROVED",
                commercialOfferItems: [anyOfferItem({ offerRunwayValue: 10, offerRunwayUnit: "HOURS" })],
            }),
        });

        mountPlanOverview();

        planOverview.findDetailButton(planName).click();
        pageOverview.findTabItem(tabName).click();
        offerPage.findInformation().should("be.visible");
        offerPage.findEditButton().click();
        editOfferingModal.edit({ value: "210", unit: "HOURS" });
        editOfferingModal.findConfirmationModal().should("exist");
        editOfferingModal.findEditButton().click();
        offerPage.findNotification("Offer Runway Edited").should("exist");
    });

    it("render modal for adding new commercial item against offer of a plan with wrong offer runway value", () => {
        setupInterceptors({
            plan: anyPlan({
                planName,
                status: "APPROVED",
            }),
            offer: anyOffer({
                status: "APPROVED",
                commercialOfferItems: [],
            }),
        });

        mountPlanOverview();

        planOverview.findDetailButton(planName).click();
        pageOverview.findTabItem(tabName).click();
        offerPage.findInformation().should("be.visible");
        offerPage.findAddButton().click();
        addOfferingModal.add({ value: "0", index: 1 });
        addOfferingModal.findError();
    });

    it("render modal for adding new commercial item against offer of a plan with true offer runway value", () => {
        setupInterceptors({
            plan: anyPlan({
                planName,
                status: "APPROVED",
            }),
            offer: anyOffer({
                status: "APPROVED",
                commercialOfferItems: [],
            }),
        });

        mountPlanOverview();

        planOverview.findDetailButton(planName).click();
        pageOverview.findTabItem(tabName).click();
        offerPage.findInformation().should("be.visible");
        offerPage.findAddButton().click();
        addOfferingModal.add({ value: "10", index: 1 });
        offerPage.findNotification("Offer Runway Added").should("exist");
    });

    it("render approve offer modal", () => {
        setupInterceptors({
            offer: anyOffer({
                status: "AWAITING_APPROVAL",
            }),
        });

        mountPlanOverview();

        planOverview.findDetailButton(planName).click();
        pageOverview.findTabItem(tabName).click();
        offerPage.findApproveOfferingButton().click();
        approveOfferModal.findHeading().should("be.visible");
        approveOfferModal.findSubheading().should("be.visible");

        approveOfferModal.findApproveButton().should("be.visible").click();
        pageOverview.findToastByText("Offering Definition Approved").should("be.visible");
    });

    it("render reject offer modal", () => {
        setupInterceptors({
            offer: anyOffer({
                status: "AWAITING_APPROVAL",
            }),
        });

        mountPlanOverview();

        planOverview.findDetailButton(planName).click();
        pageOverview.findTabItem(tabName).click();
        offerPage.findRejectOfferingButton().click();
        rejectOfferModal.findHeading().should("be.visible");
        rejectOfferModal.findSubheading().should("be.visible");
        rejectOfferModal.findCommentsInput().clear().type("comments");

        rejectOfferModal.findRejectButton().should("be.visible").click();
        pageOverview.findToastByText("Offering Definition Rejected").should("be.visible");
    });

    it("render request for approval of offering", () => {
        setupInterceptors();

        mountPlanOverview();

        planOverview.findDetailButton(planName).click();
        pageOverview.findTabItem(tabName).click();
        offerPage.findRequestOfferingApprovalButton().click();
        pageOverview.findToastByText("Requested offering approval successfully").should("be.visible");
    });
});
