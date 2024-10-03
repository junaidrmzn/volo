export const flightStatusBar = {
    routeValidationStatus: (requiredStatus: "VALID" | "INVALID" | "NOT VALIDATED") => cy.contains("p", requiredStatus),
};
