import { Select } from "./utils";

export const pricePage = {
    findInformation: () => cy.findByText(/here you find the pricing for your plan./i),
    findRequestPricingApprovalButton: () => cy.findByRole("button", { name: /request pricing approval/i }),
    findAllRoutes: () => cy.findByText(/all routes/i),
    findAddButton: () => cy.findByRole("button", { name: /add/i }),
    findEditButton: () => cy.findByRole("button", { name: /edit/i }),
    findApprovePricingButton: () => cy.findByRole("button", { name: /approve pricing/i }),
    findRejectPricingButton: () => cy.findByRole("button", { name: /reject pricing/i }),
    findPrice: () => cy.findByText(/price for all days/i),
};

export const addPriceModal = {
    findPriceInput: () => cy.findByRole("spinbutton", { name: "Standard Price:*" }),
    findCancelButton: () => cy.findByRole("button", { name: /cancel/i }),
    findAddButton: () => cy.findByRole("button", { name: /add/i }),
    add: (priceData: { price: string; currencyIndex: number }) => {
        const { price, currencyIndex } = priceData;
        addPriceModal.findPriceInput().clear().type(price);
        Select.selectByOptionIndex("Currency:", currencyIndex);
        addPriceModal.findAddButton().click();
    },
};

export const editPriceModal = {
    findPriceInput: () => cy.findByRole("spinbutton", { name: "Standard Price:*" }),
    findConfirmationModal: () => cy.findByText(/do you want to proceed with editing?/i),
    findCancelButton: () => cy.findByRole("button", { name: /cancel/i }),
    findSaveButton: () => cy.findByRole("button", { name: /save/i }),
    findEditButton: () => cy.findByRole("button", { name: /edit/i }),
    edit: (priceData: { price: string; currencyIndex: number }) => {
        const { price } = priceData;
        editPriceModal.findPriceInput().clear().type(price);
        editPriceModal.findSaveButton().click();
    },
};

export const approvePriceModal = {
    findHeading: () => cy.findByText(/information/i),
    findSubheading: () => cy.findByText(/approve pricing definition/i),
    findCancelButton: () => cy.findByRole("button", { name: /cancel/i }),
    findApproveButton: () => cy.findByRole("button", { name: /approve/i }),
};

export const rejectPriceModal = {
    findHeading: () => cy.findByText(/warning/i),
    findSubheading: () => cy.findByText(/rejecting pricing definition/i),
    findCommentsInput: () => cy.findByRole("textbox"),
    findCancelButton: () => cy.findByRole("button", { name: /cancel/i }),
    findRejectButton: () => cy.findByRole("button", { name: "Reject" }),
};
