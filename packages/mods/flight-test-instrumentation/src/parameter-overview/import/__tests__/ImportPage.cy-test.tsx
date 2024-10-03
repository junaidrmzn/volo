import "cypress-file-upload";
import { ImportPage } from "..";
import { ParameterImportPage } from "../../../../cypress/page-objects/parameter-import";
import { makeGetAllAircraftsInterceptor } from "../../../libs/fti-api/mocks/cypress/AircraftInterceptors";
import { makePostParameterImportInterceptor } from "../../../libs/fti-api/mocks/cypress/ParameterInterceptors";
import { renderWithPermissions } from "../../__tests__/handlers-with-jsx";

describe("CSV File Import", () => {
    beforeEach(() => {
        cy.clearAllLocalStorage();
        Cypress.on("uncaught:exception", (error) => !error.message.includes("ResizeObserver loop limit exceeded"));
        makeGetAllAircraftsInterceptor();
        makePostParameterImportInterceptor();
    });

    it("it should show the validation when clicking on Import Button", () => {
        renderWithPermissions(["FlightTestInstrumentationEngineer"], <ImportPage />);

        cy.wait("@getAllAircrafts");

        ParameterImportPage.importButton().click();
        ParameterImportPage.validationErrorOption().should("be.visible");
        ParameterImportPage.validationErrorAttachment().should("be.visible");
    });

    it("uploads and imports successfully a CSV file with one selected aircraft", () => {
        renderWithPermissions(["FlightTestInstrumentationEngineer"], <ImportPage />);

        cy.wait("@getAllAircrafts");

        ParameterImportPage.selectAircraftByIndex(0);

        ParameterImportPage.attachmentInput().attachFile("mock.csv", { force: true });
        cy.contains("mock.csv").should("be.visible");

        ParameterImportPage.importButton().click();

        cy.wait("@postParameterImportCSV").its("response.statusCode").should("eq", 201);
    });

    it("uploads and imports successfully a CSV file with more than one selected aircrafts", () => {
        makeGetAllAircraftsInterceptor();
        renderWithPermissions(["FlightTestInstrumentationEngineer"], <ImportPage />);

        cy.wait("@getAllAircrafts");

        ParameterImportPage.selectAircraftByIndex(0);
        ParameterImportPage.selectAircraftByIndex(1);
        ParameterImportPage.selectAircraftByIndex(3);
        ParameterImportPage.header().first().click();

        ParameterImportPage.attachmentInput().attachFile("mock.csv", { force: true });
        cy.contains("mock.csv").should("be.visible");

        ParameterImportPage.importButton().click();

        cy.wait("@postParameterImportCSV").its("response.statusCode").should("eq", 201);
    });
});
