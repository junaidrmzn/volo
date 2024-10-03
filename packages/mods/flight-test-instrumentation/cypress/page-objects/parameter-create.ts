import { Select } from "./select";

export const ParameterCreatePage = {
    header: () => cy.findByRole("heading", { name: /new fti parameter/i }),
    headers: () => cy.findAllByRole("heading", { name: /new fti parameter/i }),
    saveButton: () => cy.findByRole("button", { name: /save/i }),
    addButton: () => cy.findByRole("button", { name: /add/i }),
    deleteButtons: () => cy.findAllByRole("button", { name: /delete/i }),
    duplicateButtons: () => cy.findAllByRole("button", { name: /duplicate/i }),
    backToListButton: () => cy.findByRole("button", { name: /return to list/i }),

    aircraftSelect: () => cy.findByLabelText("Aircraft:*"),
    selectAircraftByIndex: (index: number) => Select.selectByOptionIndex("Aircraft:*", index),
    selectAircraftByIndexFromForm: (formIndex: number, index: number) => {
        Select.selectAllByOptionIndex(formIndex, "Aircraft:*", index);
    },
    aircraftZoneSelect: () => cy.findByLabelText("Aircraft Zone:*"),
    selectAircraftZoneByIndex: (index: number) => Select.selectByOptionIndex("Aircraft Zone:*", index),
    selectAircraftZoneByIndexFromForm: (formIndex: number, index: number) => {
        Select.selectAllByOptionIndex(formIndex, "Aircraft Zone:*", index);
    },

    workgroupSelect: () => cy.findByLabelText("Workgroup:*"),
    selectWorkgroupByIndex: (index: number) => Select.selectByOptionIndex("Workgroup:*", index),
    selectWorkgroupByIndexFromForm: (formIndex: number, index: number) => {
        Select.selectAllByOptionIndex(formIndex, "Workgroup:*", index);
    },

    sensorTypeSelect: () => cy.findByLabelText("Sensor Type:"),
    selectSensorTypeByIndex: (index: number) => Select.selectByOptionIndex("Sensor Type:", index),

    ataIspecSelect: () => cy.findByLabelText("ATA iSpec 2200:"),
    selectAtaIspecByIndex: (index: number) => Select.selectByOptionIndex("ATA iSpec 2200:", index),

    parameterSourceSelect: () => cy.findByLabelText("Parameter Source:"),
    selectParameterSourceByIndex: (index: number) => Select.selectByOptionIndex("Parameter Source:", index),

    unitSelect: () => cy.findByLabelText("Unit:"),
    selectUnitByIndex: (index: number) => Select.selectByOptionIndex("Unit:", index),

    shortDescriptionInput: () => cy.findByLabelText("Short Description:*"),
    shortDescriptionInputByIndex: (formIndex: number) => {
        return cy.findAllByLabelText("Short Description:*").eq(formIndex);
    },
    minValueNumberInput: () => cy.findByLabelText("Min. Value:"),
    maxValueNumberInput: () => cy.findByLabelText("Max. Value:"),
    accuracyNumberInput: () => cy.findByLabelText("Accuracy:"),
    minSamplingFrequencyNumberInput: () => cy.findByLabelText("Min. Sampling Frequency:"),
    descriptionTextArea: () => cy.findByLabelText("Description:"),
    createParametersAddList: () => cy.findByRole("list", { name: /create parameters add list/i }),
    createParametersAddListElements: () => ParameterCreatePage.createParametersAddList().findAllByRole("listitem"),
    addListElementHeaderByIndex: (index: number) =>
        ParameterCreatePage.createParametersAddListElements()
            .eq(index)
            .findByRole("heading", { name: /new fti parameter/i }),
    bulkListElementHeaderByIndex: (index: number) => ParameterCreatePage.headers().eq(index),
    isSafetyOfFlightCriticalCheckbox: () => cy.findByLabelText("Safety of Flight (SoF) Critical:"),
};
