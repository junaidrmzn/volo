import { Select } from "./utils";

export const offerPage = {
    findInformation: () => cy.findByText(/here you find the offering for your plan./i),
    findRequestOfferingApprovalButton: () => cy.findByRole("button", { name: /request offering approval/i }),
    findAddButton: () => cy.findByRole("button", { name: /add/i }),
    findApproveOfferingButton: () => cy.findByRole("button", { name: /approve offering/i }),
    findRejectOfferingButton: () => cy.findByRole("button", { name: /reject offering/i }),
    findEditButton: () => cy.findByRole("button", { name: /edit/i }),
    findNotification: (text: string) => cy.findByText(new RegExp(`^${text}$`, "i")),
};

export const editOfferingModal = {
    findofferRunwayValueInput: () => cy.findByRole("spinbutton", { name: "Enter Number:*" }),
    findConfirmationModal: () => cy.findByText(/do you want to proceed with editing?/i),
    findEditButton: () => cy.findByRole("button", { name: /edit/i }),
    edit: (runway: { value: string; unit: string }) => {
        const { value } = runway;
        editOfferingModal.findofferRunwayValueInput().clear().type(value);
        editOfferingModal.findEditButton().click();
    },
};

export const addOfferingModal = {
    findofferRunwayValueInput: () => cy.findByRole("spinbutton", { name: "Enter Number:*" }),
    findofferRunwayUnitInput: () => cy.findByRole("combobox", { name: "Days:*" }),
    findError: () => cy.findByText(/enter number must be greater than or equal to 1/i),
    findAddButton: () => cy.findByRole("button", { name: /add/i }),
    add: (runway: { value: string; index: number }) => {
        const { value, index } = runway;
        addOfferingModal.findofferRunwayValueInput().clear().type(value);
        Select.selectByOptionIndex("Days:*", index);
        addOfferingModal.findAddButton().click();
    },
};

export const approveOfferModal = {
    findHeading: () => cy.findByText(/information/i),
    findSubheading: () => cy.findByText(/approve offering definition/i),
    findCancelButton: () => cy.findByRole("button", { name: /cancel/i }),
    findApproveButton: () => cy.findByRole("button", { name: /approve/i }),
};

export const rejectOfferModal = {
    findHeading: () => cy.findByText(/warning/i),
    findSubheading: () => cy.findByText(/rejecting offering definition/i),
    findCommentsInput: () => cy.findByRole("textbox"),
    findCancelButton: () => cy.findByRole("button", { name: /cancel/i }),
    findRejectButton: () => cy.findByRole("button", { name: "Reject" }),
};
