export const missionDetail = {
    backButton: () => cy.findByRole("button", { name: "Back" }),
    generalTab: () => cy.findByRole("tab", { name: "Overview" }),
    assignmentsTab: () => cy.findByRole("tab", { name: "Assignments" }),
    dispatcherNotesTab: () => cy.findByRole("tab", { name: "Dispatcher Notes" }),
    groundOperationsTab: () => cy.findByRole("tab", { name: "Ground OPs" }),
    weatherTab: () => cy.findByRole("tab", { name: "Weather" }),
    addMessageButton: () => cy.findByRole("button", { name: "Add Note" }),
    messageTextbox: () => cy.findByRole("textbox", { name: "Message:*" }),

    popover: (roleName: string) => cy.findByLabelText(roleName).click(),
    assignResourceButton: (name: string) => cy.findByRole("button", { name }).click(),
};
