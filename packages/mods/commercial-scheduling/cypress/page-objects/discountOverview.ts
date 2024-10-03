import { Select, dateTimePicker } from "./utils";

export const discountOverview = {
    findHeading: () => cy.findByRole("heading", { name: "Discounts" }),
    findInformation: () => cy.findByText("Here you find all Discount Promotions."),
    findNewButton: () => cy.findByRole("button", { name: "New" }),
    findList: () => cy.findByLabelText("discounts"),
    findListItem: (name: string) => discountOverview.findList().findByLabelText(name),
    findActionsButton: (name: string) => discountOverview.findListItem(name).findByRole("button", { name: "actions" }),
    findDetailButton: (name: string) => discountOverview.findListItem(name).findByRole("button", { name: "detail" }),
};

export const discountModal = {
    findPromotionNameInput: () => cy.findByRole("textbox", { name: "Promotion Name:*" }),
    findValidFromInput: () => cy.findByRole("textbox", { name: "Valid From:*" }),
    findValidToInput: () => cy.findByRole("textbox", { name: "Valid To:*" }),
    findDiscountCodeListInput: () => cy.findByRole("textbox", { name: "Discount Code List:*" }),
    findReducitonInput: (name: "Amount" | "Percentage") => cy.findByRole("radio", { name }),
    findValueInput: () => cy.findByRole("spinbutton", { name: "Value:*" }),
    findCancelButton: () => cy.findByRole("button", { name: "Cancel" }),
    findUploadButton: () => cy.findByRole("button", { name: "Upload" }),
};

export const newDiscountModal = {
    upload: (options: {
        name: string;
        validFrom: Date;
        validTo: Date;
        codes: string;
        regionIndex: number;
        reduction?: "Amount" | "Percentage";
        currencyIndex?: number;
        value: string;
    }) => {
        const { name, validFrom, validTo, codes, regionIndex, reduction, currencyIndex, value } = options;
        discountModal.findPromotionNameInput().type(name);
        discountModal.findValidFromInput().click();
        dateTimePicker.selectDate(validFrom);
        discountModal.findValidToInput().click();
        dateTimePicker.selectDate(validTo);
        discountModal.findDiscountCodeListInput().click({ force: true });
        discountModal.findDiscountCodeListInput().type(codes);
        Select.selectByOptionIndex("Region:*", regionIndex);
        if (reduction) discountModal.findReducitonInput(reduction).check({ force: true });
        if (currencyIndex !== undefined) Select.selectByOptionIndex("Currency:*", currencyIndex);
        discountModal.findValueInput().type(value);
        discountModal.findUploadButton().click();
    },
};
