import type {
    BooleanProperty,
    DateProperty,
    DateRangeProperty,
    NumberProperty,
    NumberRangeProperty,
    Property,
    SelectMultipleProperty,
    SelectProperty,
    TextProperty,
} from "@volocopter/filter-react";
import { format } from "date-fns";

const enterWorkflow = (label: string) => cy.findAllByText(label).first().click();
const leaveWorkflow = () => cy.get(`[aria-label="leave workflow"]`).click();

const enterSortingWorkflow = () => cy.findAllByText("Sorted By").first().click();

const setDate = (label: string, date: Date) => {
    cy.findByRole("textbox", { name: label }).click();
    cy.get(`.flatpickr-calendar.open [aria-label="Year"]`).type(format(date, "y"));
    cy.get(`.flatpickr-calendar.open [aria-label="Month"]`).select(format(date, "LLLL"));
    cy.get(`.flatpickr-calendar.open [aria-label="${format(date, "LLLL d, y")}"]`).type("{enter}");
};

export const FilterBarPageFragment = {
    filterBar: () => cy.findByRole("toolbar"),
    nullCheckbox: (propertyName: string) => cy.get(`input[name="null-${propertyName}"]`),
    comparisonOperatorTag: (comparisonOperatorLabel: string) => cy.findByText(comparisonOperatorLabel),
    inputPlaceholder: () => cy.findByText("Filter for something"),
    applyButton: () => cy.findByRole("button", { name: "apply" }),

    expandFilterBar: () => {
        FilterBarPageFragment.filterBar().click();
    },
    applyFilters: () => {
        FilterBarPageFragment.applyButton().click();
    },

    setNullCheckbox: (filter: Pick<Property, "propertyName" | "label">, comparisonOperatorLabel?: string) => {
        const { label, propertyName } = filter;
        enterWorkflow(label);
        if (comparisonOperatorLabel) FilterBarPageFragment.comparisonOperatorTag(comparisonOperatorLabel).click();
        FilterBarPageFragment.nullCheckbox(propertyName).click({ force: true });
        leaveWorkflow();
    },

    setNumberRangeMinValue: (filter: Pick<NumberRangeProperty, "label" | "minLabel">, minValue: number) => {
        const { minLabel, label } = filter;
        enterWorkflow(label);
        cy.findByRole("spinbutton", { name: minLabel }).clear().type(`${minValue}`);
        leaveWorkflow();
    },
    setNumberRangeMaxValue: (filter: Pick<NumberRangeProperty, "label" | "maxLabel">, maxValue: number) => {
        const { maxLabel, label } = filter;
        enterWorkflow(label);
        cy.findByRole("spinbutton", { name: maxLabel }).clear().type(`${maxValue}`);
        leaveWorkflow();
    },
    setNumberValue: (filter: Pick<NumberProperty, "label">, value: number) => {
        const { label } = filter;
        enterWorkflow(label);
        cy.findByRole("spinbutton", { name: label }).clear().type(`${value}`);
        leaveWorkflow();
    },
    setTextValue: (filter: Pick<TextProperty, "label">, value: string) => {
        const { label } = filter;

        enterWorkflow(label);
        cy.findByRole("textbox", { name: label }).clear().type(value);
        leaveWorkflow();
    },
    setSelectValue: (filter: Pick<SelectProperty, "label">, selectedOptionLabel: string) => {
        const { label } = filter;

        enterWorkflow(label);
        cy.findByText(selectedOptionLabel).click();
        leaveWorkflow();
    },
    setBooleanValue: (filter: Pick<BooleanProperty, "label">, selectedOptionLabel: string) =>
        FilterBarPageFragment.setSelectValue({ ...filter }, selectedOptionLabel),
    setSelectMultipleValues: (filter: Pick<SelectMultipleProperty, "label">, selectedOptionLabels: string[]) => {
        const { label } = filter;

        enterWorkflow(label);
        for (const label of selectedOptionLabels) {
            cy.findByText(label).click();
        }
        leaveWorkflow();
    },
    setDateValue: (filter: Pick<DateProperty, "label">, value: Date) => {
        const { label } = filter;

        enterWorkflow(label);
        setDate(label, value);
        leaveWorkflow();
    },
    setDateRangeMinValue: (filter: Pick<DateRangeProperty, "label" | "minLabel">, minValue: Date) => {
        const { minLabel, label } = filter;
        enterWorkflow(label);
        setDate(minLabel, minValue);
        leaveWorkflow();
    },
    setDateRangeMaxValue: (filter: Pick<DateRangeProperty, "label" | "maxLabel">, maxValue: Date) => {
        const { maxLabel, label } = filter;
        enterWorkflow(label);
        setDate(maxLabel, maxValue);
        leaveWorkflow();
    },

    setSortingValue: (selectedSortingOptionLabel: string, comparisonOperatorLabel?: string) => {
        enterSortingWorkflow();
        cy.findAllByText(selectedSortingOptionLabel).first().click();
        if (comparisonOperatorLabel) FilterBarPageFragment.comparisonOperatorTag(comparisonOperatorLabel).click();
        leaveWorkflow();
    },
};
