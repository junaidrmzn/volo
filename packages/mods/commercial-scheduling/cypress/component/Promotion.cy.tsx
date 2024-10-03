import { pageOverview } from "../page-objects";
import { mountPromotion, setupDiscountInterceptors } from "../resources/PromotionCypressResources";

describe("Promotion", () => {
    it("render promotion with discounts and early access tabs", () => {
        setupDiscountInterceptors();

        mountPromotion();

        pageOverview.findTabs().should("be.visible");
        pageOverview.findTabItem("Discounts").should("be.visible");
        pageOverview.findTabItem("Early Access").should("be.visible");
    });
});
