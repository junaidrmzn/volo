import { anyDiscount } from "@voloiq/commercial-scheduling-api/v1";
import { discountOverview, newDiscountModal, pageOverview, promotionItemPage, promotionPage } from "../page-objects";
import { mountPromotion, setupDiscountInterceptors } from "../resources/PromotionCypressResources";

describe("DiscountOverview", () => {
    const name = "Discount";

    it("render discount overview", () => {
        setupDiscountInterceptors({ discount: anyDiscount({ name }) });

        mountPromotion();

        pageOverview.findTabItem("Discounts").click();
        discountOverview.findHeading().should("be.visible");
        discountOverview.findInformation().should("be.visible");
        discountOverview.findNewButton().should("be.visible");
        discountOverview.findListItem(name).should("be.visible");
    });

    it("render add new discount modal", () => {
        setupDiscountInterceptors({ discount: anyDiscount({ name }) });

        mountPromotion();

        pageOverview.findTabItem("Discounts").click();
        discountOverview.findNewButton().click();
        const validFrom = new Date();
        const validTo = new Date();
        validTo.setDate(validFrom.getDate() + 1);
        newDiscountModal.upload({
            name: "New Discount",
            validFrom,
            validTo,
            codes: "DC001",
            regionIndex: 0,
            currencyIndex: 0,
            value: "100",
        });
        cy.wait("@uploadDiscount").its("response.statusCode").should("equal", 200);
    });

    it("render discount promotion codes list", () => {
        setupDiscountInterceptors({ discount: anyDiscount({ name }) });

        mountPromotion();
        promotionPage.findTabItem("Discounts").click();
        discountOverview.findHeading().should("be.visible");
        discountOverview.findInformation().should("be.visible");
        discountOverview.findNewButton().should("be.visible");
        discountOverview.findListItem(name).should("be.visible");
        discountOverview.findDetailButton(name).click();
        promotionItemPage.findHeading().should("be.visible");
    });

    it("render discount promotion code validate modal", () => {
        setupDiscountInterceptors({ discount: anyDiscount({ name }) });

        mountPromotion();
        promotionPage.findTabItem("Discounts").click();
        discountOverview.findHeading().should("be.visible");
        discountOverview.findInformation().should("be.visible");
        discountOverview.findNewButton().should("be.visible");
        discountOverview.findListItem(name).should("be.visible");
        discountOverview.findDetailButton(name).click();
        promotionItemPage.findHeading().should("be.visible");
        promotionItemPage.findAction("promo001").click();
        promotionItemPage.findModal().should("be.visible");
    });

    it("render publish discount promotion ", () => {
        setupDiscountInterceptors({ discount: anyDiscount({ name }) });

        mountPromotion();
        promotionPage.findTabItem("Discounts").click();
        discountOverview.findHeading().should("be.visible");
        discountOverview.findInformation().should("be.visible");
        discountOverview.findNewButton().should("be.visible");
        discountOverview.findListItem(name).should("be.visible");
        discountOverview.findDetailButton(name).click();
        promotionItemPage.findHeading().should("be.visible");

        promotionItemPage.findPublishButton().click();
    });
});
