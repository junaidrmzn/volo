import { planOverview, scheduleItemOverview } from "../page-objects";
import { mountPlanOverview, setupInterceptors } from "../resources/PlanCypressResources";

describe("ScheduleItemOverview", () => {
    const planName = "Plan 1";

    it("render schedule items overview", () => {
        setupInterceptors();

        mountPlanOverview();

        planOverview.findDetailButton(planName).click();
        const flightNumber = "1111";
        scheduleItemOverview.findInformation().should("be.visible");
        scheduleItemOverview.findList().should("be.visible");
        scheduleItemOverview.findListItem(flightNumber).should("be.visible");
        scheduleItemOverview.findVertiportCode(flightNumber, "DEP").should("be.visible");
        scheduleItemOverview.findVertiportCode(flightNumber, "ARR").should("be.visible");
        scheduleItemOverview.findStatus(flightNumber, "Draft").should("be.visible");
        scheduleItemOverview.findActionsButton(flightNumber).should("be.visible");
        scheduleItemOverview.findDetailsButton(flightNumber).should("be.visible");
    });
});
