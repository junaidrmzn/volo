import { Select, dateTimePicker } from "./utils";

export const earlyAccessOverview = {
    findHeading: () => cy.findByRole("heading", { name: "Early Access" }),
    findInformation: () => cy.findByText("Here you find all Early Access Promotions."),
    findNewButton: () => cy.findByRole("button", { name: "New" }),
    findList: () => cy.findByLabelText("early accesses"),
    findListItem: (name: string) => earlyAccessOverview.findList().findByLabelText(name),
    findActionsButton: (name: string) =>
        earlyAccessOverview.findListItem(name).findByRole("button", { name: "actions" }),
    findDetailButton: (name: string) => earlyAccessOverview.findListItem(name).findByRole("button", { name: "detail" }),
};

export const earlyAccessModal = {
    findPromotionNameInput: () => cy.findByRole("textbox", { name: "Promotion Name:*" }),
    findValidFromInput: () => cy.findByRole("textbox", { name: "Valid From:*" }),
    findValidToInput: () => cy.findByRole("textbox", { name: "Valid To:*" }),
    findearlyAccessCodeListInput: () => cy.findByRole("textbox", { name: "Access Code List:*" }),
    findOfferRunwayInput: () => cy.findByRole("spinbutton", { name: "Offer Runway Extension:*" }),
    findCancelButton: () => cy.findByRole("button", { name: "Cancel" }),
    findUploadButton: () => cy.findByRole("button", { name: "Upload" }),
};

export const newEarlyAccessModal = {
    upload: (options: {
        name: string;
        validFrom: Date;
        validTo: Date;
        codes: string;
        regionIndex: number;
        offerValue: string;
        offerUnit: string;
    }) => {
        const { name, validFrom, validTo, codes, regionIndex, offerValue, offerUnit } = options;
        earlyAccessModal.findPromotionNameInput().type(name);
        earlyAccessModal.findValidFromInput().click();
        dateTimePicker.selectDate(validFrom);
        earlyAccessModal.findValidToInput().click();
        dateTimePicker.selectDate(validTo);
        earlyAccessModal.findearlyAccessCodeListInput().click({ force: true });
        earlyAccessModal.findearlyAccessCodeListInput().type(codes);
        Select.selectByOptionIndex("Region:*", regionIndex);
        earlyAccessModal.findOfferRunwayInput().type(offerValue);
        cy.findByText("Select Unit").click();
        cy.findByRole("button", { name: offerUnit }).click();

        earlyAccessModal.findUploadButton().click();
    },
};
