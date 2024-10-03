import { CrewConfiguration, Service } from "@voloiq-typescript-api/aircraft-management-types";
import { add, startOfToday } from "date-fns";
import { anyAircraft, anyWorkOrder } from "@voloiq/aircraft-management-api/v1";
import { anyAircraftReservation } from "../../lib/text-fixtures/anyAircraftReservation";
import { anyAircraftType } from "../../lib/text-fixtures/anyAircraftType";
import { anyVertiport } from "../../lib/text-fixtures/anyVertiport";
import { AircraftOverview } from "../../src/aircraft/AircraftOverview";
import {
    addAircraftInterceptor,
    aircraftReservationsInterceptor,
    bulkEditAircraftInterceptors,
    deleteAircraftInterceptor,
    editAircraftInterceptor,
    getAircraftInterceptor,
    getAllAircraftTypesInterceptors,
    getAllAircraftWorkOrdersInterceptor,
    getAllAircraftsInterceptors,
    getAllHomebasesInterceptors,
} from "../interceptors/aircraftInterceptors";
import { aircraftAdd } from "../page-objects/aircraftAddPageObject";
import { aircraftBulkEdit } from "../page-objects/aircraftBulkEditPageObject";
import { aircraftDetails } from "../page-objects/aircraftDetailPageObjects";
import { aircraftEdit } from "../page-objects/aircraftEditPageObject";
import { aircraftOverview } from "../page-objects/aircraftOverviewPageObject";
import { aircraftPreviewPageFragment } from "../page-objects/aircraftPreviewPageFragment";
import { dateTimePicker } from "../page-objects/dateTimePickerPageObject";
import { deleteAircraftModalPageFragment } from "../page-objects/deleteAircraftModalPageFragment";
import { FilterBarAircraftPageFragment } from "../page-objects/filterBarAircraftPageFragment";
import { Select } from "../page-objects/select";

describe("AircraftOverview", () => {
    it("User can add an aircraft", () => {
        getAllAircraftsInterceptors([]);
        getAllAircraftTypesInterceptors([anyAircraftType()]);
        getAllHomebasesInterceptors([anyVertiport()]);
        cy.mount(<AircraftOverview />);
        aircraftOverview.addButton().click();
        aircraftAdd.add({
            msn: "000",
            aircraftRegistration: "E2E_000",
            service: Service.PASSENGER,
            aircraftType: "orange",
            validTo: add(startOfToday(), { days: 6 }),
            homebase: "Airfield \\(BRU - EDTC\\)",
            crewConfiguration: CrewConfiguration.CREWED,
        });
        addAircraftInterceptor();
        aircraftAdd.saveButton().click();
    });

    it("User can add an aircraft with only required fields", () => {
        getAllAircraftsInterceptors([]);
        getAllAircraftTypesInterceptors([anyAircraftType()]);
        getAllHomebasesInterceptors([anyVertiport()]);
        cy.mount(<AircraftOverview />);
        aircraftOverview.addButton().click();
        aircraftAdd.add({
            msn: "000",
            service: Service.PASSENGER,
            aircraftType: "orange",
            crewConfiguration: CrewConfiguration.CREWED,
        });
        addAircraftInterceptor();
        aircraftAdd.saveButton().click();
        cy.wait("@createAircraft").then((interception) => {
            expect(interception?.response?.statusCode).to.equal(201);
        });
    });

    it("User can edit an existing aircraft", () => {
        getAllAircraftsInterceptors([anyAircraft()]);

        const aircraft = anyAircraft();
        getAircraftInterceptor(aircraft);
        getAllAircraftTypesInterceptors([anyAircraftType()]);
        getAllHomebasesInterceptors([anyVertiport()]);
        cy.mount(<AircraftOverview />);

        aircraftOverview.aircraftCard("12345").click();

        aircraftOverview.editButton().click();

        aircraftEdit.edit({
            validFrom: add(startOfToday(), { days: 3 }),
            validTo: add(startOfToday(), { days: 6 }),
            homebase: "Airfield \\(BRU - EDTC\\)",
        });

        aircraftEdit.saveButton().as("saveBtn");
        cy.get("@saveBtn").click();
        editAircraftInterceptor(aircraft);
        cy.get("@editAircraftInterceptor");
    });

    it("User can filter aircrafts", () => {
        const aircraftList = [
            {
                msn: "iloveorange",
                name: "orange",
                id: "ce118b6e-d8e1-11e7-9296-cec278b6b50a",
                synchronizedWithLeon: true,
            },
            {
                msn: "ilovered",
                name: "orange 1",
                id: "ce118b6e-d8e1-11e7-9296-cec278b6b50b",
                synchronizedWithLeon: false,
            },
        ].map((aircraft) => anyAircraft(aircraft));
        getAllAircraftsInterceptors(aircraftList);
        getAllAircraftTypesInterceptors([anyAircraftType()]);
        getAllHomebasesInterceptors([anyVertiport()]);

        cy.get("@getAllAircraftsInterceptors");
        cy.get("@getAllAircraftTypesInterceptors");
        cy.get("@getAllHomebasesInterceptors");

        cy.mount(<AircraftOverview />);
        getAllAircraftsInterceptors(aircraftList.slice(0, 1));
        FilterBarAircraftPageFragment.filter({ msn: "iloveorange", leonId: true, comparisonOperatorLabel: "is not" });
        aircraftOverview.aircraftCard("iloveorange").should("be.visible");
    });

    it("User can add past validFrom date on edit an existing aircraft", () => {
        getAllAircraftsInterceptors([anyAircraft()]);

        const aircraft = anyAircraft();
        getAircraftInterceptor(aircraft);
        getAllAircraftTypesInterceptors([anyAircraftType()]);
        getAllHomebasesInterceptors([anyVertiport()]);
        cy.mount(<AircraftOverview />);

        aircraftOverview.aircraftCard("12345").click();

        aircraftOverview.editButton().click();

        aircraftEdit.edit({
            validFrom: add(startOfToday(), { days: -1 }),
            validTo: add(startOfToday(), { days: 6 }),
            homebase: "Airfield \\(BRU - EDTC\\)",
        });

        aircraftEdit.saveButton().as("saveBtn");
        cy.get("@saveBtn").click();
        editAircraftInterceptor(aircraft);
        cy.get("@editAircraftInterceptor");
    });

    it("User can see aircraft events on the time grid", () => {
        const aircraft = anyAircraft();

        getAllAircraftsInterceptors([aircraft]);
        getAllAircraftWorkOrdersInterceptor(aircraft.id, [anyWorkOrder()]);

        const aircraftReservations = anyAircraftReservation({
            reservations: [
                {
                    id: "127fc68a-9ec9-4a6d-9975-683725203327",
                    reservationType: "MISSION",
                    startDateTime: `${add(new Date(), { hours: 3 }).toISOString()}`,
                    endDateTime: `${add(new Date(), { hours: 5 }).toISOString()}`,
                    alternativeIdentifier: "VC-01",
                },
            ],
        });
        getAircraftInterceptor(aircraft);
        getAllAircraftTypesInterceptors([anyAircraftType()]);
        getAllHomebasesInterceptors([anyVertiport()]);
        aircraftReservationsInterceptor([aircraftReservations]);
        cy.mount(<AircraftOverview />);

        aircraftOverview.aircraftCard("12345").click();

        aircraftDetails.detailsButton().click();

        cy.findByRole("button", { name: "Now" }).click();
        cy.findByLabelText("Scroll right").click().click();
        cy.findByText("VC-01");
    });

    it("User can view aircraft list with unknown crew configuration", () => {
        getAllAircraftsInterceptors([anyAircraft({ crewConfiguration: "UNKNOWN" })]);
        getAllAircraftTypesInterceptors([anyAircraftType()]);
        getAllHomebasesInterceptors([anyVertiport()]);
        cy.mount(<AircraftOverview />);

        aircraftOverview.aircraftCard("12345").should("be.visible");
    });

    it("User can delete aircraft", () => {
        getAllAircraftsInterceptors([anyAircraft()]);

        const aircraft = anyAircraft();
        getAircraftInterceptor(aircraft);
        getAllAircraftTypesInterceptors([anyAircraftType()]);
        getAllHomebasesInterceptors([anyVertiport()]);
        cy.mount(<AircraftOverview />);

        aircraftOverview.aircraftCard("12345").click();
        deleteAircraftInterceptor(aircraft.id);
        getAllAircraftsInterceptors([]);
        aircraftPreviewPageFragment.deleteButton().click();
        deleteAircraftModalPageFragment.deleteButton().click();
        aircraftOverview.noEntriesFoundHeading().should("be.visible");
    });

    it("User can edit an existing aircraft from detail page", () => {
        getAllAircraftsInterceptors([anyAircraft()]);

        const aircraft = anyAircraft();
        const aircraftReservations = anyAircraftReservation();
        getAircraftInterceptor(aircraft);
        getAllAircraftTypesInterceptors([anyAircraftType()]);
        getAllHomebasesInterceptors([anyVertiport()]);
        aircraftReservationsInterceptor([aircraftReservations]);
        getAllAircraftWorkOrdersInterceptor(aircraft.id, [anyWorkOrder()]);
        cy.mount(<AircraftOverview />);

        aircraftOverview.aircraftCard("12345").click();

        aircraftPreviewPageFragment.detailsButton().click();
        aircraftDetails.editButton().click();
        aircraftEdit.edit({
            validFrom: add(startOfToday(), { days: 3 }),
            validTo: add(startOfToday(), { days: 6 }),
            homebase: "Airfield \\(BRU - EDTC\\)",
        });

        aircraftEdit.saveButton().as("saveBtn");
        cy.get("@saveBtn").click();
        editAircraftInterceptor(aircraft);
        cy.get("@editAircraftInterceptor");
    });

    it("should not display bulk edit button when no filters are applied", () => {
        getAllAircraftsInterceptors([anyAircraft()]);

        const aircraft = anyAircraft();
        getAircraftInterceptor(aircraft);
        getAllAircraftTypesInterceptors([anyAircraftType()]);
        getAllHomebasesInterceptors([anyVertiport()]);
        cy.mount(<AircraftOverview />);

        aircraftBulkEdit.bulkEditButton().should("not.exist");
    });

    it("renders bulk edit modal and select edit properties", () => {
        getAllAircraftsInterceptors([anyAircraft()]);
        const date = "2024-01-01 12:00";
        const aircraft = anyAircraft();
        getAircraftInterceptor(aircraft);
        getAllAircraftTypesInterceptors([anyAircraftType()]);
        getAllHomebasesInterceptors([anyVertiport()]);
        cy.mount(<AircraftOverview />);

        FilterBarAircraftPageFragment.filter({ msn: "iloveorange", leonId: true, comparisonOperatorLabel: "is not" });
        aircraftBulkEdit.bulkEditButton().click({ force: true });

        aircraftBulkEdit.selectLabelText("Bulk Edit - Aircraft").should("be.visible");
        aircraftBulkEdit.selectLabelText("Edit Properties").should("be.checked");
        aircraftBulkEdit.selectLabelText("Archive").should("not.be.checked");

        Select.selectByOptionName("Property:", "Valid from");
        aircraftBulkEdit.selectLabelText("Change to:").click({ force: true });
        dateTimePicker.selectDate(new Date(date));
        aircraftBulkEdit.doneButton().click();

        aircraftBulkEdit.selectLabelText("Confirm - Multi Edit").should("be.visible");
        aircraftBulkEdit.selectAllText("Valid from").should("be.visible");
        aircraftBulkEdit.selectText("to").should("be.visible");
        aircraftBulkEdit.selectAllText(date).should("be.visible");
        aircraftBulkEdit.selectText("Are you sure? You can’t undo this action afterwards.").should("be.visible");

        bulkEditAircraftInterceptors(aircraft);
        aircraftBulkEdit.confirmButton().click();
        cy.get("@bulkEditAircraftInterceptors");

        aircraftBulkEdit.selectLabelText("Confirm - Multi Edit").should("not.exist");
        aircraftBulkEdit.selectLabelText("Bulk Edit - Aircraft").should("not.exist");
    });
});
