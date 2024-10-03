import type {
    Aircraft,
    AircraftCreate,
    AircraftType,
    AircraftTypeCreate,
} from "@voloiq-typescript-api/aircraft-management-types";
import type { ResponseEnvelope } from "@voloiq/service";

export const resetAircraftManagementDatabase = () => {
    cy.exec(
        `echo "TRUNCATE TABLE aircraft, aircraft_type CASCADE" | docker exec -i $(docker ps -f name=aircraft_mgmt_postgres -q) psql -U postgres -d aircraft_mgmt`
    );
};

export const createAircraftType = (aircraftType: AircraftTypeCreate) => {
    cy.request<ResponseEnvelope<AircraftType>>(
        "POST",
        "http://localhost:9080/v1/aircraft-management/aircraft-types",
        aircraftType
    );
};

export const createAircraft = (aircraft: AircraftCreate) => {
    cy.request<ResponseEnvelope<Aircraft>>("POST", "http://localhost:9080/v1/aircraft-management/aircraft", aircraft);
};
