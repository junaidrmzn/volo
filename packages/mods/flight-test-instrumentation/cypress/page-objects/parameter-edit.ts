import { Select } from "./select";

export const ParameterEditPage = {
    saveButton: () => cy.findByRole("button", { name: /save/i }),
    backToListButton: () => cy.findByRole("button", { name: /return to list/i }),

    selectAircraftButton: () => cy.findByRole("button", { name: "Add Aircraft" }),
    selectAircraftField: () => cy.findByLabelText("Aircraft"),
    selectAircraftByIndex: (index: number) => Select.selectByOptionIndex("Aircraft", index),

    aircraftZoneSelect: () => cy.findByLabelText("Aircraft Zone:*"),
    selectAircraftZoneByIndex: (index: number) => Select.selectByOptionIndex("Aircraft Zone:*", index),

    workgroupSelect: () => cy.findByLabelText("Workgroup:*"),
    selectWorkgroupByIndex: (index: number) => Select.selectByOptionIndex("Workgroup:*", index),

    sensorTypeSelect: () => cy.findByLabelText("Sensor Type:"),
    selectSensorTypeByIndex: (index: number) => Select.selectByOptionIndex("Sensor Type:", index),

    ataIspecSelect: () => cy.findByLabelText("ATA iSpec 2200:"),
    selectAtaIspecByIndex: (index: number) => Select.selectByOptionIndex("ATA iSpec 2200:", index),

    parameterSourceSelect: () => cy.findByLabelText("Parameter Source:"),
    selectParameterSourceByIndex: (index: number) => Select.selectByOptionIndex("Parameter Source:", index),

    unitSelect: () => cy.findByLabelText("Unit:"),
    selectUnitByIndex: (index: number) => Select.selectByOptionIndex("Unit:", index),

    shortDescriptionInput: () => cy.findByLabelText("Short Description:*"),
    minValueNumberInput: () => cy.findByLabelText("Min. Value:"),
    maxValueNumberInput: () => cy.findByLabelText("Max. Value:"),
    accuracyNumberInput: () => cy.findByLabelText("Accuracy:"),
    minSamplingFrequencyNumberInput: () => cy.findByLabelText("Min. Sampling Frequency:"),
    descriptionTextArea: () => cy.findByLabelText("Description:"),
    isSafetyOfFlightCriticalCheckbox: () => cy.findByLabelText("Safety of Flight (SoF) Critical:"),

    checkButton: () => cy.findByLabelText("Check Button"),
};
