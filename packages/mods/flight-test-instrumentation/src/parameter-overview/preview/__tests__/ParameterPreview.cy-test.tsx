/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { UUID } from "uuidjs";
import { OverviewPage as OverviewPageCyFunctions } from "../../../../cypress/page-objects/overview";
import { ParameterPreview } from "../../../../cypress/page-objects/parameter-preview";
import { makeGetAllAircraftsInterceptor } from "../../../libs/fti-api/mocks/cypress/AircraftInterceptors";
import { makeGetAllAircraftZoneInterceptor } from "../../../libs/fti-api/mocks/cypress/AircraftZoneInterceptors";
import { makeGetAllAtaIspecsInterceptor } from "../../../libs/fti-api/mocks/cypress/AtaIspecInterceptor";
import {
    anyParameter,
    makeGetAllParameterInterceptor,
    makeGetParameterInterceptor,
    makePatchParameterStatusInterceptor,
} from "../../../libs/fti-api/mocks/cypress/ParameterInterceptors";
import { makeGetAllParameterSourceInterceptor } from "../../../libs/fti-api/mocks/cypress/ParameterSourceInterceptors";
import { makeGetAllSensorTypesInterceptor } from "../../../libs/fti-api/mocks/cypress/SensorTypeInterceptor";
import { makeGetAllUnitsInterceptor } from "../../../libs/fti-api/mocks/cypress/UnitInterceptors";
import { makeGetAllWorkgroupInterceptor } from "../../../libs/fti-api/mocks/cypress/WorkGroupInterceptors";
import { OverviewPage } from "../../OverviewPage";
import { renderWithPermissions } from "../../__tests__/handlers-with-jsx";

describe("The parameter preview page ", () => {
    beforeEach(() => {
        Cypress.on("uncaught:exception", (error) => !error.message.includes("ResizeObserver loop limit exceeded"));
        makeGetAllParameterInterceptor();
        makeGetAllAircraftsInterceptor();
        makeGetAllAircraftZoneInterceptor();
        makeGetAllWorkgroupInterceptor();
        makeGetAllAtaIspecsInterceptor();
        makeGetAllSensorTypesInterceptor();
        makeGetAllUnitsInterceptor();
        makeGetAllParameterSourceInterceptor();
        makeGetParameterInterceptor();
    });

    it("can show parameter values", () => {
        renderWithPermissions(["FlightTestInstrumentationEngineer"], <OverviewPage />);

        const testParameter = anyParameter();
        makeGetAllParameterInterceptor([testParameter]);
        cy.wait("@getAllParameter");

        OverviewPageCyFunctions.overviewListItems(testParameter.id).click();
        ParameterPreview.previewPanel().findByText(testParameter.requesterName).should("be.visible");
        ParameterPreview.previewPanel().findByText(testParameter.aircraftZone.label).should("be.visible");
        ParameterPreview.previewPanel().findByText(testParameter.sensorType!.label).should("be.visible");
        ParameterPreview.previewPanel().findByText(testParameter.ataIspec!.label).should("be.visible");
        ParameterPreview.previewPanel().findByText(testParameter.parameterSource!.label).should("be.visible");
        ParameterPreview.previewPanel().findByText(testParameter.unit!.label).should("be.visible");
        ParameterPreview.previewPanel().findByText(testParameter.minValue!).should("be.visible");
        ParameterPreview.previewPanel().findByText(testParameter.maxValue!).should("be.visible");
        ParameterPreview.previewPanel().findByText(testParameter.accuracy!).should("be.visible");
        ParameterPreview.previewPanel().findByText(testParameter.minimumSamplingFrequency!).should("be.visible");
        ParameterPreview.previewPanel().findByText(testParameter.description!).should("be.visible");
        ParameterPreview.previewPanel()
            .findByText(new RegExp(`^${testParameter.status}$`, "i"))
            .should("be.visible");
        ParameterPreview.editButton().should("be.visible");
        ParameterPreview.closeButton().click();
    });

    it("should show aircraft with different states", () => {
        renderWithPermissions(["FlightTestInstrumentationEngineer"], <OverviewPage />);

        const testParameter = anyParameter();
        makeGetAllParameterInterceptor([testParameter]);
        cy.wait("@getAllParameter");

        OverviewPageCyFunctions.overviewListItems(testParameter.id).click();
        ParameterPreview.previewPanel()
            .findByText(new RegExp(`^${testParameter.status}$`, "i"))
            .should("be.visible");
        ParameterPreview.previewPanel()
            .findByText(new RegExp(`^${testParameter.status}$`, "i"))
            .should("be.visible");
        ParameterPreview.previewPanel()
            .findByText(new RegExp(`^${testParameter.status}$`, "i"))
            .should("be.visible");
        ParameterPreview.previewPanel()
            .findByText(new RegExp(`^${testParameter.status}$`, "i"))
            .should("be.visible");
        ParameterPreview.previewPanel()
            .findByText(new RegExp(`^${testParameter.status}$`, "i"))
            .should("be.visible");
    });

    it("should show status change buttons, if user is allowed", () => {
        renderWithPermissions(["FlightTestInstrumentationEngineer"], <OverviewPage />);

        const testParameter = anyParameter();
        makeGetAllParameterInterceptor([testParameter]);
        cy.wait("@getAllParameter");

        OverviewPageCyFunctions.overviewListItems(testParameter.id).click();
        ParameterPreview.changeStatusButtons().should("have.length", 5);
        ParameterPreview.changeStatusButtons().should("be.enabled");
    });

    it("should not show status change button, if user is not allowed", () => {
        renderWithPermissions(["Engineer"], <OverviewPage />);

        const testParameter = anyParameter();
        makeGetAllParameterInterceptor([testParameter]);
        cy.wait("@getAllParameter");

        OverviewPageCyFunctions.overviewListItems(testParameter.id).first().click();
        ParameterPreview.changeStatusButtons().should("not.exist");
    });

    it("should disable all status change buttons and show tooltip, if parameter has not enough information", () => {
        renderWithPermissions(["FlightTestInstrumentationEngineer"], <OverviewPage />);

        const testParameter = anyParameter({ sensorType: undefined, ataIspec: undefined });
        makeGetAllParameterInterceptor([testParameter]);
        cy.wait("@getAllParameter");

        makeGetParameterInterceptor(testParameter);

        OverviewPageCyFunctions.overviewListItems(testParameter.id).click();
        ParameterPreview.changeStatusButtons().should("be.disabled");
        ParameterPreview.changeStatusButtons().first().parent().trigger("mouseover");
        cy.findByRole("tooltip").should("be.visible");
    });

    it("should show not show the tooltip if status button is enabled", () => {
        renderWithPermissions(["FlightTestInstrumentationEngineer"], <OverviewPage />);

        const testParameter = anyParameter();
        makeGetAllParameterInterceptor([testParameter]);
        cy.wait("@getAllParameter");

        OverviewPageCyFunctions.overviewListItems(testParameter.id).click();
        ParameterPreview.changeStatusButtons().first().trigger("mouseover");
        cy.findByRole("tooltip").should("not.exist");
    });

    it("allows users to update the parameter aircraft status for several aircrafts", () => {
        const testParameter = anyParameter();
        const testParameterAfterPatch1 = anyParameter({
            aircrafts: [
                {
                    id: UUID.generate(),
                    productLine: "VC",
                    aircraftType: "VC1-2",
                    msn: "001",
                    status: "FROZEN",
                },
                {
                    id: UUID.generate(),
                    productLine: "VC",
                    aircraftType: "VC1-2",
                    msn: "003",
                    status: "CANCELLED",
                },
            ],
        });
        const testParameterAfterPatch2 = anyParameter({
            aircrafts: [
                {
                    id: UUID.generate(),
                    productLine: "VC",
                    aircraftType: "VC1-2",
                    msn: "001",
                    status: "RELEASED",
                },
                {
                    id: UUID.generate(),
                    productLine: "VC",
                    aircraftType: "VC1-2",
                    msn: "003",
                    status: "CANCELLED",
                },
            ],
        });

        makePatchParameterStatusInterceptor();
        renderWithPermissions(["FlightTestInstrumentationEngineer"], <OverviewPage />);
        makeGetAllParameterInterceptor([testParameter]);
        cy.wait("@getAllParameter");

        OverviewPageCyFunctions.overviewListItems(testParameter.id).click();

        // First Status Change
        ParameterPreview.getAircraftCardByIndex(0)
            .findByText(new RegExp(`^${testParameter.aircrafts[0]?.status}$`, "i"))
            .should("be.visible");
        ParameterPreview.getAircraftCardByIndex(0)
            .findAllByRole("button", { name: /status button/i })
            .click();

        ParameterPreview.statusChangeModal().within(() => {
            ParameterPreview.statusSelectModal().click();
            cy.findByRole("button", { name: "Released" }).click();
            makeGetParameterInterceptor(testParameterAfterPatch1);
            ParameterPreview.doneButton().click();
        });

        cy.wait("@patchParameterStatus").its("request.body.status").should("eq", "RELEASED");
        cy.wait("@getParameter");

        ParameterPreview.getAircraftCardByIndex(0)
            .findByText(new RegExp(`^${testParameterAfterPatch1.aircrafts[0]?.status}$`, "i"))
            .should("be.visible");

        // Second Status Change
        ParameterPreview.getAircraftCardByIndex(1)
            .findByText(new RegExp(`^${testParameter.aircrafts[1]?.status}$`, "i"))
            .should("be.visible");
        ParameterPreview.getAircraftCardByIndex(1)
            .findAllByRole("button", { name: /status button/i })
            .click();

        ParameterPreview.statusChangeModal().within(() => {
            ParameterPreview.statusSelectModal().click();
            cy.findByRole("button", { name: "Draft" }).click();
            makeGetParameterInterceptor(testParameterAfterPatch2);
            ParameterPreview.doneButton().click();
        });

        cy.wait("@patchParameterStatus").its("request.body.status").should("eq", "CANCELLED");
        cy.wait("@getParameter");

        ParameterPreview.getAircraftCardByIndex(1)
            .findByText(new RegExp(`^${testParameterAfterPatch2.aircrafts[1]?.status}$`, "i"))
            .should("be.visible");
    });
});
