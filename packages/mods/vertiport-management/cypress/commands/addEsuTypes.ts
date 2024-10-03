export const addEsuTypes = () => {
    cy.exec(
        `echo "INSERT INTO esu_type (id, created_by, created_time, name, updated_by, updated_time, valid_from, valid_to, manual_charging) VALUES ('0','testuser', current_timestamp, 'LOW-C-Rate ESU-Type-001', 'testuser', current_timestamp, current_timestamp, '2999-12-31 11:59:59.000', true); INSERT INTO esu_type (id, created_by, created_time, name, updated_by, updated_time, valid_from, valid_to, manual_charging) VALUES ('1','testuser', current_timestamp, 'LOW-C-Rate ESU-Type-002', 'testuser', current_timestamp, current_timestamp, '2999-12-31 11:59:59.000', true); INSERT INTO esu_type (id, created_by, created_time, name, updated_by, updated_time, valid_from, valid_to, manual_charging) VALUES ('2','testuser', current_timestamp, 'LOW-C-Rate ESU-Type-003', 'testuser', current_timestamp, current_timestamp, '2999-12-31 11:59:59.000', true); COMMIT;" | docker exec -i $(docker ps -f name=postgres-batman -q) psql -U postgres -d batman`
    );
};
