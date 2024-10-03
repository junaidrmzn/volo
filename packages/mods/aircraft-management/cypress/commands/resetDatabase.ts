export const resetAircraftManagementDatabase = () => {
    cy.exec(
        `echo "TRUNCATE TABLE aircraft, aircraft_type CASCADE" | docker exec -i $(docker ps -f name=aircraft_mgmt_postgres -q) psql -U postgres -d aircraft_mgmt`
    );
};
