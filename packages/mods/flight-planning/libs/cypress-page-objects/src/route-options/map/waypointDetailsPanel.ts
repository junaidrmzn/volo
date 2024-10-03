export const waypointDetailsPanel = {
    routeSegmentsTab: () => cy.findByRole("tab", { name: "Route Segments" }),
    turnButton: () => cy.findByRole("button", { name: "Turn" }),
    radiusInputField: () => cy.findByRole("spinbutton", { name: "Radius (m)" }),
    saveButton: () => cy.findByRole("button", { name: "Save" }),
    waypointBackButton: () => cy.findByRole("button", { name: "Waypoint Details Back" }),
    nameInputField: () => cy.get('input[name="name"]'),
    altitudeInputField: () => cy.findByRole("spinbutton", { name: "Altitude (ft):*" }),
};
