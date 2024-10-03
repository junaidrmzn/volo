export const addBatteries = () => {
    cy.exec(
        `echo "INSERT INTO battery (id, created_by, created_time, name, updated_by, updated_time, valid_from, valid_to, act_status, technical_status, first_usage_time, flight_permits, last_charge_time, max_cell_voltage, max_charging_time, min_cell_voltage, nr_charging_cycles, nr_esu, nr_usage_cycles, weight, bat_type_id, location_entity_id) VALUES ('0', 'testuser', current_timestamp, 'Battery00001', 'testuser', current_timestamp, current_timestamp, '2999-12-31 23:59:59.000', 'PO', 'SV', current_timestamp, 'MN', current_timestamp, '4.199', '90', '4.195', '100', '9', '5', '300.3', '2', '0'); COMMIT;" | docker exec -i $(docker ps -f name=postgres-batman -q) psql -U postgres -d batman`
    );
};
