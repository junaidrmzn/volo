import { Select } from "./select";

export const ParameterImportPage = {
    importButton: () => cy.findByRole("button", { name: /import/i }),
    aircraftSelect: () => cy.findByLabelText("Aircraft:*"),
    validationErrorOption: () => cy.findByText("Please select an option"),
    validationErrorAttachment: () => cy.findByText("Please select an attachment"),
    selectAircraftByIndex: (index: number) => Select.selectByOptionIndex("Aircraft:*", index),
    selectAircraftByIndexFromForm: (formIndex: number, index: number) => {
        Select.selectAllByOptionIndex(formIndex, "Aircraft:*", index);
    },
    attachmentInput: () => cy.get('input[type="file"]'),
    header: () => cy.get("h3"),
};
