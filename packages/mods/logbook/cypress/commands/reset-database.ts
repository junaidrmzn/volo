export const resetDatabase = () => {
    cy.task("query", {
        query: `TRUNCATE TABLE aircraft, log_crew_member, crew_member, location, software_config, log_file, log CASCADE`,
    });
};
