export const resetBatteryManagementDatabase = () => {
    cy.exec(
        `echo "TRUNCATE TABLE esu, esu_aud, battery, battery_aud, esu_type, esu_type_aud, vtol_type, vtol_type_aud, location, location_aud CASCADE" | docker exec -i $(docker ps -f name=postgres-batman -q) psql -U postgres -d batman`
    );
};
