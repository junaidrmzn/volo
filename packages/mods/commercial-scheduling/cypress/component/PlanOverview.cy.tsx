import { anyPlan } from "@voloiq/commercial-scheduling-api/v1";
import {
    editPlanModal,
    pageOverview,
    planDetail,
    planModal,
    planOverview,
    publishPlanModal,
    uploadPlanModal,
} from "../page-objects";
import { mountPlanOverview, setupInterceptors } from "../resources/PlanCypressResources";

describe("PlanOverview", () => {
    const planName = "Plan 1";

    it("render plans overview", () => {
        setupInterceptors();

        mountPlanOverview();

        planOverview.findHeading().should("be.visible");
        planOverview.findSubheading().should("be.visible");
        planOverview.findInformation().should("be.visible");
        planOverview.findList().should("be.visible");
        planOverview.findListItem(planName).should("be.visible");
        planOverview.findStatus(planName, "Draft").should("be.visible");
        planOverview.findActionsButton(planName).should("be.visible");
        planOverview.findDetailButton(planName).should("be.visible");
    });

    it("render the plan actions popover", () => {
        setupInterceptors();

        mountPlanOverview();

        planOverview.findActionsButton(planName).click();
        planOverview.findArchiveButton().should("be.visible");
        planOverview.findEditButton().should("be.visible");
        planOverview.findDeleteButton().should("be.visible");
    });

    it("archive plan button should be disabled for a non draft plan", () => {
        setupInterceptors({ plan: anyPlan({ planName: "Approved Plan", status: "APPROVED" }) });

        mountPlanOverview();

        planOverview.findActionsButton("Approved Plan").click();
        planOverview.findArchiveButton().should("be.disabled");
    });

    it("delete plan button should be disabled for published plan", () => {
        setupInterceptors({ plan: anyPlan({ planName: "Published Plan", status: "PUBLISHED" }) });

        mountPlanOverview();

        planOverview.findActionsButton("Published Plan").click();
        planOverview.findDeleteButton().should("be.disabled");
    });

    it("render the upload new commercial plan modal", () => {
        setupInterceptors();

        mountPlanOverview();

        planOverview.findUploadNewPlanButton().click();
        planModal.findUploadButton().should("be.visible");
        planModal.findCancelButton().should("be.visible");
        planModal.findPlanNameInput().should("be.visible");
        uploadPlanModal.findCsvFileInput().should("be.exist");
        uploadPlanModal.upload("Plan Name");
        planModal.findCancelButton().should("be.disabled");
    });

    it("render the edit commercial plan modal", () => {
        setupInterceptors();

        mountPlanOverview();

        planOverview.findActionsButton(planName).click();
        planOverview.findEditButton().click();
        planModal.findEditButton().should("be.visible");
        planModal.findCancelButton().should("be.visible");
        planModal.findPlanNameInput().should("be.visible");
        editPlanModal.findNumbersOfMissionsInPlanInput().should("be.visible");
        editPlanModal.findStartDateInput().should("be.visible");
        editPlanModal.findEndDateInput().should("be.visible");
        editPlanModal.edit("Edited Plan Name");
        planModal.findPlanNameInput().should("not.exist");
    });

    it("archive a draft plan", () => {
        setupInterceptors();

        mountPlanOverview();

        planOverview.findActionsButton(planName).click();
        planOverview.findArchiveButton().click();
        cy.wait("@editPlan").its("response.statusCode").should("equal", 200);
    });

    it("delete a non published plan", () => {
        setupInterceptors();

        mountPlanOverview();

        planOverview.findActionsButton(planName).click();
        planOverview.findDeleteButton().click();
        cy.wait("@deletePlan").its("response.statusCode").should("equal", 204);
    });

    it("navigate to the plan detail page", () => {
        setupInterceptors();

        mountPlanOverview();

        planOverview.findDetailButton(planName).click();
        pageOverview.findByText(planName);
    });

    it("tabs should be disabled for a commercial plan with no offers and no price", () => {
        setupInterceptors({ plan: anyPlan({ planName, hasSchedule: false, hasPrice: false, hasOffer: false }) });

        mountPlanOverview();

        planOverview.findDetailButton(planName).click();
        pageOverview.findTabItem("Offering").should("be.disabled");
        pageOverview.findTabItem("Pricing").should("be.disabled");
        pageOverview.findTabItem("Plan").should("be.disabled");
    });

    it("user can publish plan to customer and airline", () => {
        setupInterceptors({ plan: anyPlan({ planName, status: "APPROVED", hasOffer: true, hasPrice: true }) });

        mountPlanOverview();

        planOverview.findDetailButton(planName).click();
        pageOverview.findTabItem("Plan").click();
        planDetail.findPublishPlanButton().click();
        publishPlanModal.findHeading().should("be.visible");
        publishPlanModal.findQuestion().should("be.visible");
        publishPlanModal.findPublishButton().click();
        publishPlanModal.findSuccessToast().should("be.visible");
    });
});
