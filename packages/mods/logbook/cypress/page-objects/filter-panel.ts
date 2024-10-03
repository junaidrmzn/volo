import { Select } from "./select";

export const FilterPanel = {
    filterPanel: () => cy.findByTestId("filter-sidePanel"),
    applyButton: () => cy.findByRole("button", { name: "Apply" }),
    cancelButton: () => cy.findByRole("button", { name: "Cancel" }),
    backButton: () =>
        cy.findByRole("button", {
            name: "Back",
        }),

    filterTags: () => cy.findByRole("list", { name: "Filter Tags" }),

    fromDatePicker: () => cy.findByLabelText("From"),
    toDatePicker: () => cy.findByLabelText("To"),

    aircraftSelect: () => cy.findByRole("combobox", { name: "Aircraft" }),
    selectAircraft: (optionName: string) => {
        Select.selectByOptionName("Aircraft", optionName);
    },

    locationSelect: () => cy.findByRole("combobox", { name: "Location" }),
    selectLocation: (optionName: string) => {
        Select.selectByOptionName("Location", optionName);
    },

    pilotSelect: () => cy.findByRole("combobox", { name: "Pilot" }),
    selectPilot: (optionName: string) => {
        Select.selectByOptionName("Pilot", optionName);
    },

    supervisorSelect: () => cy.findByRole("combobox", { name: "Supervisor" }),
    selectSupervisor: (optionName: string) => {
        Select.selectByOptionName("Supervisor", optionName);
    },

    maxVelocity: () => cy.findByRole("group", { name: "Flight Duration (s)" }),
    maxVelocityFrom: () =>
        cy.findByRole("group", { name: "Flight Duration (s)" }).findByRole("spinbutton", { name: /from/i }),
    maxVelocityTo: () =>
        cy.findByRole("group", { name: "Flight Duration (s)" }).findByRole("spinbutton", { name: /to/i }),
};
