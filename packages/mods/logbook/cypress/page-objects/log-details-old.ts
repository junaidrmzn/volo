export const LogDetailsPage = {
    generalTab: () => cy.findByRole("tab", { name: "General" }),
    filesTab: () => cy.findByRole("tab", { name: "Files" }),
    timeOfFlightInput: () => cy.findByLabelText("Time of Flight:*"),
    aircraftSelect: () => cy.findByLabelText("Aircraft:*"),
    fcSoftwareInput: () => cy.findByLabelText("FC Software:*"),
    locationSelect: () => cy.findByLabelText("Location:*"),
    crewPilotSelect: () => cy.findByLabelText("Pilots:"),
    crewSupervisorSelect: () => cy.findByLabelText("Supervisors:"),
    remarksInput: () => cy.findByLabelText("Remarks:"),
    noFilesMessage: () => cy.findByText("No files available"),
};
