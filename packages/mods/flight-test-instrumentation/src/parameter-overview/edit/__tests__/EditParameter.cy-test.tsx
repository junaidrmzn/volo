import { UUID } from "uuidjs";
import { OverviewPage as OverviewPageCyFunctions } from "../../../../cypress/page-objects/overview";
import { ParameterEditPage } from "../../../../cypress/page-objects/parameter-edit";
import { ParameterPreview } from "../../../../cypress/page-objects/parameter-preview";
import { makeGetAllAircraftsInterceptor } from "../../../libs/fti-api/mocks/cypress/AircraftInterceptors";
import {
    anyAircraftZone,
    makeGetAllAircraftZoneInterceptor,
} from "../../../libs/fti-api/mocks/cypress/AircraftZoneInterceptors";
import { anyAtaIspec, makeGetAllAtaIspecsInterceptor } from "../../../libs/fti-api/mocks/cypress/AtaIspecInterceptor";
import {
    anyParameter,
    makeGetAllParameterInterceptor,
    makeGetParameterInterceptor,
    makePatchParameterInterceptor,
} from "../../../libs/fti-api/mocks/cypress/ParameterInterceptors";
import {
    anyParameterSource,
    makeGetAllParameterSourceInterceptor,
} from "../../../libs/fti-api/mocks/cypress/ParameterSourceInterceptors";
import {
    anySensorType,
    makeGetAllSensorTypesInterceptor,
} from "../../../libs/fti-api/mocks/cypress/SensorTypeInterceptor";
import { anyUnit, makeGetAllUnitsInterceptor } from "../../../libs/fti-api/mocks/cypress/UnitInterceptors";
import {
    anyWorkgroup,
    makeGetAllWorkgroupInterceptor,
} from "../../../libs/fti-api/mocks/cypress/WorkGroupInterceptors";
import { OverviewPage } from "../../OverviewPage";
import { renderWithPermissions } from "../../__tests__/handlers-with-jsx";

const testAircraftZone = anyAircraftZone();
const testWorkgroup = anyWorkgroup();
const testAtaIspecs = anyAtaIspec();
const testSensorType = anySensorType();
const testUnit = anyUnit();
const testParameterSource = anyParameterSource();

const testParameter = anyParameter({
    aircrafts: [
        {
            id: UUID.generate(),
            productLine: "VC",
            aircraftType: "VC1-2",
            msn: "001",
            status: "RELEASED",
        },
    ],
    aircraftZone: testAircraftZone,
    workgroup: testWorkgroup,
    ataIspec: testAtaIspecs,
    sensorType: testSensorType,
    unit: testUnit,
    parameterSource: testParameterSource,
});

describe("The edit parameter page ", () => {
    beforeEach(() => {
        Cypress.on("uncaught:exception", (error) => !error.message.includes("ResizeObserver loop limit exceeded"));
        makeGetAllAircraftsInterceptor();
        makeGetAllAircraftZoneInterceptor([testAircraftZone]);
        makeGetAllWorkgroupInterceptor([testWorkgroup]);
        makeGetAllAtaIspecsInterceptor([testAtaIspecs]);
        makeGetAllSensorTypesInterceptor([testSensorType]);
        makeGetAllUnitsInterceptor([testUnit]);
        makeGetAllParameterSourceInterceptor([testParameterSource]);
        makeGetParameterInterceptor(testParameter);
        makePatchParameterInterceptor();
        makeGetAllParameterInterceptor([testParameter]);
    });

    it("can not edit parameter fields if aircraft has a status of released", () => {
        makeGetParameterInterceptor(anyParameter({ ...testParameter, status: "RELEASED" }));
        renderWithPermissions(["FlightTestInstrumentationEngineer"], <OverviewPage />);

        OverviewPageCyFunctions.overviewListItems(testParameter.id).first().click();
        ParameterPreview.editButton().click();

        cy.findByLabelText("Parameter Info Card").should("be.visible");
    });

    it("can assign multiple aircrafts to a parameter", () => {
        makeGetParameterInterceptor(anyParameter({ ...testParameter, status: "REQUESTED" }));
        renderWithPermissions(["FlightTestInstrumentationEngineer"], <OverviewPage />);

        OverviewPageCyFunctions.overviewListItems(testParameter.id).first().click();
        ParameterPreview.editButton().click();

        ParameterEditPage.selectAircraftButton().click();
        ParameterEditPage.selectAircraftField().click();
        ParameterEditPage.selectAircraftByIndex(0);
        ParameterEditPage.checkButton().click();
        ParameterEditPage.saveButton().click();
        cy.wait("@patchParameter").its("response.statusCode").should("eq", 200);
    });

    it("can edit a parameter", () => {
        makeGetParameterInterceptor(
            anyParameter({
                ...testParameter,
                aircrafts: [
                    {
                        id: UUID.generate(),
                        productLine: "VC",
                        aircraftType: "VC1-2",
                        msn: "001",
                        status: "DRAFT",
                    },
                ],
            })
        );
        renderWithPermissions(["FlightTestInstrumentationEngineer"], <OverviewPage />);

        OverviewPageCyFunctions.overviewListItems(testParameter.id).first().click();
        ParameterPreview.editButton().click();

        ParameterEditPage.accuracyNumberInput().type("2");
        ParameterEditPage.isSafetyOfFlightCriticalCheckbox().check({ force: true });
        ParameterEditPage.saveButton().click();

        cy.wait("@patchParameter").its("response.statusCode").should("equal", 200);
    });
});
