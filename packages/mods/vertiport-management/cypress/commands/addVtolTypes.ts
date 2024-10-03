export const addVtolTypes = () => {
    cy.exec(
        `echo "INSERT INTO vtol_type (id, created_by, created_time, name, updated_by, updated_time, valid_from, valid_to) VALUES ('0','testuser', current_timestamp, 'VC1', 'testuser', current_timestamp, current_timestamp, '2999-12-31 11:59:59.000'); INSERT INTO vtol_type (id, created_by, created_time, name, updated_by, updated_time, valid_from, valid_to) VALUES ('2','testuser', current_timestamp, 'VD2', 'testuser', current_timestamp, current_timestamp, '2999-12-31 11:59:59.000'); COMMIT;" | docker exec -i $(docker ps -f name=postgres-batman -q) psql -U postgres -d batman`
    );
};
