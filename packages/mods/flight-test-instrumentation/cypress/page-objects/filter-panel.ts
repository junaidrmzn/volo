import type { ParameterStatusEnum } from "@voloiq-typescript-api/fti-types";
import { Select } from "./select";

export const FilterPanel = {
    filterPanel: () => cy.findByTestId("filter-sidePanel"),
    applyButton: () => FilterPanel.filterPanel().findByRole("button", { name: "Apply" }),
    cancelButton: () => FilterPanel.filterPanel().findByRole("button", { name: "Cancel" }),
    backButton: () =>
        FilterPanel.filterPanel().findByRole("button", {
            name: "Back",
        }),

    filterTagList: () => FilterPanel.filterPanel().findByRole("list", { name: /filter tag list/i }),
    filterTagListItems: () => FilterPanel.filterTagList().findAllByRole("listitem"),

    aircraftSelect: () => FilterPanel.filterPanel().findByRole("combobox", { name: "Aircraft" }),
    selectAircraft: (optionName: string) => {
        Select.selectByOptionName("Aircraft", optionName);
    },

    aircraftZoneSelect: () => FilterPanel.filterPanel().findByRole("combobox", { name: "Aircraft zone" }),
    selectAircraftZone: (optionName: string) => {
        Select.selectByOptionName("Aircraft zone", optionName);
    },

    requesterNameInput: () => FilterPanel.filterPanel().findByLabelText(/requester name/i),

    statusSelect: () => FilterPanel.filterPanel().findByLabelText(/status/i),
    selectStatus: (optionName: ParameterStatusEnum) => {
        Select.selectByOptionName("Aircraft zone", optionName);
    },

    shortDescriptionInput: () => FilterPanel.filterPanel().findByLabelText(/short description/i),

    descriptionInput: () => FilterPanel.filterPanel().findByLabelText(/description/i),

    ftiCodeInput: () => FilterPanel.filterPanel().findByLabelText(/fti code/i),

    workgroupSelect: () => cy.findByLabelText(/workgroup/i),
    selectWorkgroup: (optionName: string) => {
        Select.selectByOptionName("Workgroup", optionName);
    },

    parameterSourceSelect: () => cy.findByLabelText(/parameter source/i),
    selectParameterSource: (optionName: string) => {
        Select.selectByOptionName("Parameter source", optionName);
    },

    ataIspecSelect: () => cy.findByLabelText(/ata ispec 2200/i),
    selectAtaIspec: (optionName: string) => {
        Select.selectByOptionName("ATA iSpec 2200", optionName);
    },

    unitSelect: () => cy.findByLabelText(/unit/i),
    selectUnit: (optionName: string) => {
        Select.selectByOptionName("Unit", optionName);
    },

    minValueGroup: () => FilterPanel.filterPanel().findByRole("group", { name: /min\. value/i }),
    minValueFrom: () => FilterPanel.minValueGroup().findByRole("spinbutton", { name: /from/i }),
    minValueTo: () => FilterPanel.minValueGroup().findByRole("spinbutton", { name: /to/i }),

    maxValueGroup: () => FilterPanel.filterPanel().findByRole("group", { name: /max\. value/i }),
    maxValueFrom: () => FilterPanel.maxValueGroup().findByRole("spinbutton", { name: /from/i }),
    maxValueTo: () => FilterPanel.maxValueGroup().findByRole("spinbutton", { name: /to/i }),

    accuracyGroup: () => FilterPanel.filterPanel().findByRole("group", { name: /accuracy/i }),
    accuracyFrom: () => FilterPanel.accuracyGroup().findByRole("spinbutton", { name: /from/i }),
    accuracyTo: () => FilterPanel.accuracyGroup().findByRole("spinbutton", { name: /to/i }),

    minSamplingFrequencyGroup: () =>
        FilterPanel.filterPanel().findByRole("group", { name: /min\. sampling frequency/i }),
    minSamplingFrequencyFrom: () => FilterPanel.minSamplingFrequencyGroup().findByRole("spinbutton", { name: /from/i }),
    minSamplingFrequencyTo: () => FilterPanel.minSamplingFrequencyGroup().findByRole("spinbutton", { name: /to/i }),
};
