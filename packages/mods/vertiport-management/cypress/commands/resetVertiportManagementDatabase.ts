export const resetVertiportManagementDatabase = () => {
    cy.exec(
        `echo "TRUNCATE TABLE vertiport CASCADE" | docker exec -i $(docker ps -f name=postgres -q) psql -U postgres -d voloiq-vertiport-api`
    );
};
