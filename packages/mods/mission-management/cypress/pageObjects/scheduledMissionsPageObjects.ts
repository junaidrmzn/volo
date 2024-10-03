export const scheduledMissions = {
    todayButton: () => cy.findByText("Today"),
    tomorrowButton: () => cy.findByText("Tomorrow"),
    customButton: () => cy.findByText("Custom"),
    goToDateTextbox: () => cy.findByRole("textbox", { name: "Go-To Date:*" }),
    goButton: () => cy.findByRole("button", { name: "Go" }),

    aircraftTYpeNameLabel: (aircraftTYpeName: string) => cy.findByText(aircraftTYpeName),
};
