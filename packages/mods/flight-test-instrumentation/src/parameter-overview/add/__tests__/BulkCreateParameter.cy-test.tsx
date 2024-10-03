import { OverviewPage as OverviewPageCyFunctions } from "../../../../cypress/page-objects/overview";
import { ParameterCreatePage } from "../../../../cypress/page-objects/parameter-create";
import { makeGetAllAircraftsInterceptor } from "../../../libs/fti-api/mocks/cypress/AircraftInterceptors";
import { makeGetAllAircraftZoneInterceptor } from "../../../libs/fti-api/mocks/cypress/AircraftZoneInterceptors";
import { makeGetAllAtaIspecsInterceptor } from "../../../libs/fti-api/mocks/cypress/AtaIspecInterceptor";
import {
    anyParameter,
    makeGetAllParameterInterceptor,
    makePostParameterInterceptor,
} from "../../../libs/fti-api/mocks/cypress/ParameterInterceptors";
import { makeGetAllParameterSourceInterceptor } from "../../../libs/fti-api/mocks/cypress/ParameterSourceInterceptors";
import { makeGetAllSensorTypesInterceptor } from "../../../libs/fti-api/mocks/cypress/SensorTypeInterceptor";
import { makeGetAllUnitsInterceptor } from "../../../libs/fti-api/mocks/cypress/UnitInterceptors";
import { makeGetAllWorkgroupInterceptor } from "../../../libs/fti-api/mocks/cypress/WorkGroupInterceptors";
import { OverviewPage } from "../../OverviewPage";
import { renderWithPermissions } from "../../__tests__/handlers-with-jsx";

const fillForm = () => {
    ParameterCreatePage.selectAircraftByIndex(0);
    ParameterCreatePage.selectAircraftZoneByIndex(0);
    ParameterCreatePage.selectWorkgroupByIndex(0);
    ParameterCreatePage.shortDescriptionInput().type("short description");
    ParameterCreatePage.selectSensorTypeByIndex(0);
    ParameterCreatePage.selectAtaIspecByIndex(0);
    ParameterCreatePage.selectParameterSourceByIndex(0);
    ParameterCreatePage.selectUnitByIndex(0);
    ParameterCreatePage.minValueNumberInput().type("10");
    ParameterCreatePage.maxValueNumberInput().type("13");
    ParameterCreatePage.accuracyNumberInput().type("1");
    ParameterCreatePage.minSamplingFrequencyNumberInput().type("1");
    ParameterCreatePage.isSafetyOfFlightCriticalCheckbox().check({ force: true });
    ParameterCreatePage.descriptionTextArea().type("description");
};

const fillNthForm = (formIndex: number) => {
    ParameterCreatePage.selectAircraftByIndexFromForm(formIndex, 0);
    ParameterCreatePage.selectAircraftByIndexFromForm(formIndex, 3);
    ParameterCreatePage.selectAircraftZoneByIndexFromForm(formIndex, 0);
    ParameterCreatePage.selectWorkgroupByIndexFromForm(formIndex, 0);
    ParameterCreatePage.shortDescriptionInputByIndex(formIndex).type("another short description");
};

describe("The create parameter page", () => {
    beforeEach(() => {
        cy.clearAllLocalStorage();
        Cypress.on("uncaught:exception", (error) => !error.message.includes("ResizeObserver loop limit exceeded"));
        makeGetAllParameterInterceptor();
        makeGetAllAircraftsInterceptor();
        makeGetAllAircraftZoneInterceptor();
        makeGetAllWorkgroupInterceptor();
        makeGetAllAtaIspecsInterceptor();
        makeGetAllSensorTypesInterceptor();
        makeGetAllUnitsInterceptor();
        makeGetAllParameterSourceInterceptor();
        makePostParameterInterceptor();
    });

    it("can create one new parameter", () => {
        makeGetAllParameterInterceptor([anyParameter()]);

        renderWithPermissions(["FlightTestInstrumentationEngineer"], <OverviewPage />);
        cy.wait("@getAllParameter");

        OverviewPageCyFunctions.addButton().click();

        ParameterCreatePage.header().should("contain.text", "New FTI Parameter 1");
        fillForm();

        ParameterCreatePage.saveButton().click();

        cy.wait("@postParameter").its("response.statusCode").should("eq", 201);
    });

    it("can create multiple new parameters", () => {
        makeGetAllParameterInterceptor([anyParameter()]);

        renderWithPermissions(["FlightTestInstrumentationEngineer"], <OverviewPage />);
        cy.wait("@getAllParameter");

        OverviewPageCyFunctions.addButton().click();
        ParameterCreatePage.header().should("contain.text", "New FTI Parameter 1");

        fillForm();

        ParameterCreatePage.addButton().click();

        ParameterCreatePage.bulkListElementHeaderByIndex(0).should("contain.text", "New FTI Parameter 1");
        ParameterCreatePage.bulkListElementHeaderByIndex(1).should("contain.text", "New FTI Parameter 2");

        fillNthForm(1);

        ParameterCreatePage.saveButton().click();

        cy.wait("@postParameter").its("response.statusCode").should("eq", 201);
    });

    it("can remove added parameters before saving", () => {
        makeGetAllParameterInterceptor([anyParameter()]);

        renderWithPermissions(["FlightTestInstrumentationEngineer"], <OverviewPage />);
        cy.wait("@getAllParameter");

        OverviewPageCyFunctions.addButton().click();
        ParameterCreatePage.header().should("contain.text", "New FTI Parameter 1");

        fillForm();

        ParameterCreatePage.addButton().click();

        ParameterCreatePage.bulkListElementHeaderByIndex(0).should("contain.text", "New FTI Parameter 1");
        ParameterCreatePage.bulkListElementHeaderByIndex(1).should("contain.text", "New FTI Parameter 2");

        fillNthForm(1);

        ParameterCreatePage.addButton().click();

        ParameterCreatePage.bulkListElementHeaderByIndex(0).should("contain.text", "New FTI Parameter 1");
        ParameterCreatePage.bulkListElementHeaderByIndex(1).should("contain.text", "New FTI Parameter 2");
        ParameterCreatePage.bulkListElementHeaderByIndex(2).should("contain.text", "New FTI Parameter 3");

        fillNthForm(2);
        ParameterCreatePage.headers().should("have.length", 3);

        ParameterCreatePage.deleteButtons().eq(2).click();

        ParameterCreatePage.headers().should("have.length", 2);
        ParameterCreatePage.bulkListElementHeaderByIndex(0).should("contain.text", "New FTI Parameter 1");
        ParameterCreatePage.bulkListElementHeaderByIndex(1).should("contain.text", "New FTI Parameter 2");

        ParameterCreatePage.saveButton().click();
        cy.wait("@postParameter").its("response.statusCode").should("eq", 201);
    });

    it("can duplicate a parameter", () => {
        makeGetAllParameterInterceptor([anyParameter()]);

        renderWithPermissions(["FlightTestInstrumentationEngineer"], <OverviewPage />);
        cy.wait("@getAllParameter");

        OverviewPageCyFunctions.addButton().click();

        ParameterCreatePage.header().should("contain.text", "New FTI Parameter 1");
        fillNthForm(0);
        cy.findAllByLabelText("Short Description:*").eq(0).invoke("val").should("eq", "another short description");
        cy.findAllByLabelText("Short Description:*").eq(1).should("not.exist");

        ParameterCreatePage.duplicateButtons().eq(0).click();

        cy.findAllByLabelText("Short Description:*").eq(0).invoke("val").should("eq", "another short description");
        cy.findAllByLabelText("Short Description:*").eq(1).invoke("val").should("eq", "another short description");
    });

    it("can check delete, duplicate and submit button functionality", () => {
        makeGetAllParameterInterceptor([anyParameter()]);

        renderWithPermissions(["FlightTestInstrumentationEngineer"], <OverviewPage />);
        cy.wait("@getAllParameter");

        OverviewPageCyFunctions.addButton().click();

        ParameterCreatePage.saveButton().should("be.disabled");
        ParameterCreatePage.duplicateButtons().should("be.disabled");
        ParameterCreatePage.deleteButtons().should("be.disabled");

        ParameterCreatePage.selectAircraftByIndex(0);
        ParameterCreatePage.selectAircraftZoneByIndex(0);
        ParameterCreatePage.selectWorkgroupByIndex(0);
        ParameterCreatePage.shortDescriptionInput().type("short description");

        ParameterCreatePage.saveButton().should("be.enabled");
        ParameterCreatePage.duplicateButtons().should("be.enabled");

        ParameterCreatePage.duplicateButtons().click();

        ParameterCreatePage.deleteButtons().should("be.enabled");
    });
});
