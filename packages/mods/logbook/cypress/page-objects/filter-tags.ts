export const FilterTags = {
    findFilterByAriaLabel: (ariaLabel: string) => cy.findByRole("listitem", { name: ariaLabel }),
    closeFilterTag: (tagAriaLabel: string) =>
        FilterTags.findFilterByAriaLabel(tagAriaLabel).within(() => {
            cy.findByRole("button", { name: "close" }).click();
        }),
    findFlightDateFilter: () => FilterTags.findFilterByAriaLabel("Log Filter Tags : Flight date"),
    findFlightDateRangeFilter: (start: string, end: string) =>
        FilterTags.findFlightDateFilter().within(() => {
            cy.findAllByText(`${start} - ${end} UTC`);
        }),
};
