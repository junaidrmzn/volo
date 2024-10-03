export const addLocations = () => {
    cy.exec(
        `echo "INSERT INTO location (id, created_by , created_time, name, updated_by, updated_time, valid_from, valid_to) VALUES ('0','testuser', current_timestamp, 'somewhere', 'testuser', current_timestamp, current_timestamp, '2999-12-31 11:59:59.000'); INSERT INTO location (id, created_by , created_time, name, updated_by, updated_time, valid_from, valid_to) VALUES ('1','testuser', current_timestamp, 'somewhere else', 'testuser', current_timestamp, current_timestamp, '2999-12-31 11:59:59.000'); COMMIT;" | docker exec -i $(docker ps -f name=postgres-batman -q) psql -U postgres -d batman`
    );
};
