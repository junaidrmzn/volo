export const waypointsPanel = {
    waypointDetailsButton: (waypointName: string) => cy.findByRole("button", { name: waypointName }),
};
