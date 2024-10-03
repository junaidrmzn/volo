export const addVertiport = () => {
    cy.exec(
        `echo "INSERT INTO vertiport (id,created,created_by,last_update,name,public_from,public_to,updated_by,valid_from,valid_to,abbreviation,address_line1,address_line2,city,country,state,zip_code,data_model_version,elevation,iata_code,icao_code,height,latitude,longitude,fato_blocking_time_post,fato_blocking_time_pre,fatos,mgt_post_battery_swap,mgt_post_passenger_handling,mgt_post_pilot_briefing,mgt_post_vtol_handling,mgt_pre_battery_swap,mgt_pre_passenger_handling,mgt_pre_pilot_briefing,mgt_pre_vtol_handling,stands,popularity,time_zone,region_id) VALUES ('60af6c1c-3f32-4e0d-bf2e-9abf39c74a9f','2022-01-01T00:00Z','testdata-script','2022-01-26T00:00Z','Versailles','2023-07-01T00:00Z','2030-01-01T00:00Z','testdata-script','2022-01-01T00:00Z','2030-01-01T00:00Z','Versailles','Place d'Armes','1','Paris','France','Versailles','78000','0','20','XVE','null','30','48.804722','2.13416','1200','1200','1','300','300','300','300','300','300','300','300','2','0.5','Europe/Paris','63c90da4-1e0c-4482-9cef-467501686edd'); COMMIT;" | docker exec -i $(docker ps -f name=postgres -q) psql -U postgres -d vertiport`
    );
};
