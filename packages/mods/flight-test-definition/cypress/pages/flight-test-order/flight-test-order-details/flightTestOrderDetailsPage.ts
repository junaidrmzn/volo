export const FlightTestOrderDetailsPage = {
    testMissionTab: () => cy.findByRole("tab", { name: "Test Mission" }),
    aircraftReleaseTab: () => cy.findByRole("tab", { name: "Aircraft Release for Flight" }),
    testMissionGeneralTab: () => cy.findByRole("tab", { name: "General" }),
    testPointSelectionTab: () => cy.findByRole("tab", { name: "Test Points Selection" }),
    editGeneralInformation: () => cy.findByRole("button", { name: "Edit General Information" }),
    editTestAircraft: () => cy.findByRole("button", { name: "Edit Test Aircraft" }),
    editAircraftConfiguration: () => cy.findByRole("button", { name: "Edit Aircraft Configuration" }),
    editTestMission: () => cy.findByRole("button", { name: "Edit Test Mission" }),
    editCrewAndOccupants: () => cy.findByRole("button", { name: "Edit Crew & Occupants" }),
    editConfigurations: () => cy.findByRole("button", { name: "Edit Configurations" }),
    editAircraftReleaseGeneralInformation: () => cy.findByRole("button", { name: "Edit General Information" }),
    configurationInfoRows: () => cy.findAllByRole("group", { name: "Configuration Info" }),
    addTestPointSequencesButton: () => cy.findAllByRole("button", { name: "Add Test Point Sequences" }).first(),
    editTestPointSequencesButton: () => cy.findByRole("button", { name: "Edit Test Point Sequences" }),
    deleteButton: () => cy.findByRole("button", { name: "Delete" }),
    exportAsPdfButton: () => cy.findByRole("button", { name: "Export" }),
    testCardDetailsButton: (cardNumber: number = 1) =>
        cy
            .findByRole("button", { name: `Test Points Sequence #${cardNumber}` })
            .siblings()
            .findByLabelText("Details"),

    updateStatusButton: () => cy.findByLabelText("Update Status Button"),
    declineButton: () => cy.findByRole("button", { name: "Decline" }),
    declineRequestButton: () => cy.findByRole("button", { name: "Decline Request" }),
    confirmButton: (buttonLabel: string) => cy.findByRole("button", { name: buttonLabel }),
    checkStatus: (label: string) => cy.findByLabelText(label),
    checkConfirmationToast: (message: string) =>
        cy.get(".chakra-toast").filter(`:contains(${message})`).should("be.visible"),
    generalInformationHeadline: () => cy.findAllByText("General Information").filter("p"),
    testMissionAndWeatherHeadline: () => cy.findAllByText("Test Mission & Weather").filter("p"),
    checkWithinNavigationIfVisibleOrNot: (visibleId: string, notVisibleId: string) => {
        cy.findByRole("tablist", { name: "Navigation Bar" }).within(() => {
            cy.findByText(visibleId).click();
            cy.findByText(visibleId).should("have.attr", "aria-selected", "true");
            cy.findByText(notVisibleId).should("have.attr", "aria-selected", "false");
        });
    },
    clickAnchorLink: (headline: string) =>
        cy.findByRole("tablist", { name: "Navigation Bar" }).within(() => {
            cy.findByText(headline).click();
        }),
};
