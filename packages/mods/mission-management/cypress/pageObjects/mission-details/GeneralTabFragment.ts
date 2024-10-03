export const generalTab = {
    generalActionButton: () => cy.findAllByRole("button", { name: "General Popover" }).first(),
    aircraftAssignmentActionButton: () => cy.findByRole("button", { name: "Aircraft Popover" }),
    pilotAssignmentActionButton: () => cy.findByRole("button", { name: "Pilot Popover" }),
    crewMemberAssignmentActionButton: () => cy.findByRole("button", { name: "Crew Member Popover" }),
    assignAircraftButton: () => cy.findByRole("button", { name: "Assign Aircraft" }),
    assignPilotButton: () => cy.findByRole("button", { name: "Assign Pilot" }),
    assignCrewMemberButton: () => cy.findByRole("button", { name: "Assign Crew" }),
    updateScheduleButton: () => cy.findByRole("button", { name: "Update Schedule" }),
};
