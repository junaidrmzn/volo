export const routesPanel = {
    routeButton: (routeName: string) => cy.findByRole("gridcell", { name: routeName }),
    routeBackButton: () => cy.findByRole("button", { name: "Route Details Back" }),
    routeOptionValidationStatus: (requiredStatus: "Valid" | "Invalid") => cy.contains("span", requiredStatus),
};
