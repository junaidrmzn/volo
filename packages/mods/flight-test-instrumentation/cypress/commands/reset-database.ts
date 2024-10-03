export const resetDatabase = () => {
    cy.task("query", {
        query: `TRUNCATE TABLE parameter CASCADE`,
    });
};
