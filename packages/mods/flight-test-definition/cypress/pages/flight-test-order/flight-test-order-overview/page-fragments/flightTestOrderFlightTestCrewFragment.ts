export const FlightTestOrderFlightTestCrewFragment = {
    // The text field selectors below need to be used in a 'within' function of a specific selector for a row in the table.
    // If one uses them outside of a within clause, they will select fields from the first row in the table.
    roleRowTextField: () => cy.findByRole("textbox", { name: "Role:*" }),
    nameRowTextField: () => cy.findByRole("textbox", { name: "Name:*" }),
    addCrewAndOccupantsButton: () => cy.findByRole("button", { name: "Add Crew & Occupants" }),
    doneButton: () => cy.findByRole("button", { name: "Done" }),
};
