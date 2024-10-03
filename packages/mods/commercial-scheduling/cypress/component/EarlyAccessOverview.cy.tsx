import { anyEarlyAccess } from "@voloiq/commercial-scheduling-api/v1";
import {
    earlyAccessOverview,
    newEarlyAccessModal,
    pageOverview,
    promotionItemPage,
    promotionPage,
} from "../page-objects";
import { mountPromotion, setupEarlyAccessInterceptors } from "../resources/PromotionCypressResources";

describe("EarlyAccessOverview", () => {
    const name = "Early Access";
    it("render early access overview", () => {
        setupEarlyAccessInterceptors({ earlyAccess: anyEarlyAccess({ name }) });

        mountPromotion();

        pageOverview.findTabItem("Early Access").click();
        earlyAccessOverview.findHeading().should("be.visible");
        earlyAccessOverview.findInformation().should("be.visible");
        earlyAccessOverview.findNewButton().should("be.visible");
        earlyAccessOverview.findListItem(name).should("be.visible");
    });

    it("render upload new early access promotion", () => {
        setupEarlyAccessInterceptors({ earlyAccess: anyEarlyAccess({ name }) });

        mountPromotion();

        pageOverview.findTabItem("Early Access").click();
        earlyAccessOverview.findNewButton().click();
        const validFrom = new Date();
        const validTo = new Date();
        validTo.setDate(validFrom.getDate() + 1);
        newEarlyAccessModal.upload({
            name: "New Early Access",
            validFrom,
            validTo,
            codes: "EA001",
            regionIndex: 0,
            offerValue: "1",
            offerUnit: "Hour(s)",
        });
        cy.wait("@uploadEarlyAccess").its("response.statusCode").should("equal", 200);
    });

    it("render early access promotion codes list", () => {
        setupEarlyAccessInterceptors({ earlyAccess: anyEarlyAccess({ name }) });

        mountPromotion();
        promotionPage.findTabItem("Early Access").click();
        earlyAccessOverview.findHeading().should("be.visible");
        earlyAccessOverview.findInformation().should("be.visible");
        earlyAccessOverview.findNewButton().should("be.visible");
        earlyAccessOverview.findListItem(name).should("be.visible");
        earlyAccessOverview.findDetailButton(name).click();
        promotionItemPage.findHeading().should("be.visible");
    });
    it("render publish discount promotion ", () => {
        setupEarlyAccessInterceptors({ earlyAccess: anyEarlyAccess({ name }) });

        mountPromotion();
        promotionPage.findTabItem("Early Access").click();
        earlyAccessOverview.findHeading().should("be.visible");
        earlyAccessOverview.findInformation().should("be.visible");
        earlyAccessOverview.findNewButton().should("be.visible");
        earlyAccessOverview.findListItem(name).should("be.visible");
        earlyAccessOverview.findDetailButton(name).click();
        promotionItemPage.findHeading().should("be.visible");
        promotionItemPage.findPublishButton().click();
    });
});
