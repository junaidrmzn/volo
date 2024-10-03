export const missionActions = {
    popover: () => cy.findByRole("dialog"),
    closeButton: () => cy.findByRole("button", { name: "Close" }),
    assignAircraftButton: () => cy.findByRole("button", { name: "Assign Aircraft" }),
    assignPilotButton: () => cy.findByRole("button", { name: "Assign Pilot" }),
    assignCrewMemberButton: () => cy.findByRole("button", { name: "Assign Crew" }),
    updateScheduleButton: () => cy.findByRole("button", { name: "Update Schedule" }),
    divertMissionButton: () => cy.findByRole("button", { name: "Divert Mission" }),
    cancelButton: () => cy.findByRole("button", { name: "Cancel Mission" }),
    assignArrivalFatoButton: () => cy.findByRole("button", { name: "Assign Arrival FATO" }),
    assignArrivalStandButton: () => cy.findByRole("button", { name: "Assign Arrival Stand" }),
    acceptButton: () => cy.findByRole("button", { name: "Accept Mission" }),
};
