import { anySignatureRecord } from "@voloiq/flight-test-definition-api/v1";
import { AppWithoutProvider as App } from "../../../src/App";
import {
    bulkPatchSignatureRecordsInterceptor,
    bulkPostSignatureRecordsInterceptor,
    getSignatureRecordsInterceptor,
} from "../../interceptors/approvalSignatory";
import { getAllAttachedFilesInterceptor } from "../../interceptors/attachedFilesInterceptors";
import { getAllDefinitionsByAtaInterceptor } from "../../interceptors/definitionsInterceptors";
import { getAllRevisionsInterceptor } from "../../interceptors/getAllRevisionsInterceptor";
import { getAllProceduresInterceptor } from "../../interceptors/proceduresInterceptors";
import {
    getAllTabCountersInterceptor,
    getDefinitionInterceptorV2,
    getDefinitionRevisionInterceptorV2,
} from "../../interceptors/v2/definitionsInterceptors";
import { DefinitionDetailsPage } from "../../pages/definition-details/definitionDetailsPageObject";
import { DefinitionCardPageFragment } from "../../pages/definition-overview/page-fragments/definitionCardPageFragment";
import {
    flightGroundTestPlanAuthoredFTE,
    flightGroundTestPlanReviewedEng,
    flightGroundTestPlanReviewedFTE,
    flightGroundTestPlanSignatureRecords,
    flightGroundTestPlanTechnicalApproval,
    flightTestDefinitionSafetyReleasedSRB,
    flightTestDefinitionSignatureRecords,
    testRequestApproved,
    testRequestAuthoredDE,
    testRequestReviewedCVE,
    testRequestReviewedFTE,
    testRequestSignatureRecords,
} from "./mockSignatureRecords";

describe("ApprovalSignatory", () => {
    beforeEach(() => {
        getAllTabCountersInterceptor();
        getAllDefinitionsByAtaInterceptor();
        getDefinitionInterceptorV2();
        getDefinitionRevisionInterceptorV2();
        getAllRevisionsInterceptor();
        getAllProceduresInterceptor();
        getAllAttachedFilesInterceptor();
        bulkPostSignatureRecordsInterceptor();
        bulkPatchSignatureRecordsInterceptor();
    });

    it("should display empty table cells if there are no values", () => {
        getSignatureRecordsInterceptor([]);

        cy.mount(<App />);
        DefinitionCardPageFragment.accordionButton().click();
        DefinitionCardPageFragment.detailsButton().click();
        DefinitionDetailsPage.approvalSignatoryTab().click();

        cy.findByRole("table", { name: "Test Request Approval Table" }).within(() => {
            cy.findByRole("row", { name: "Authored (DE) Row" }).within(() => {
                cy.findByRole("cell", { name: "Team" }).should("have.text", "-");
                cy.findByRole("cell", { name: "Role" }).should("have.text", "-");
                cy.findByRole("cell", { name: "Name" }).should("have.text", "-");
            });

            cy.findByRole("row", { name: "Reviewed (CVE) Row" }).within(() => {
                cy.findByRole("cell", { name: "Team" }).should("have.text", "-");
                cy.findByRole("cell", { name: "Role" }).should("have.text", "-");
                cy.findByRole("cell", { name: "Name" }).should("have.text", "-");
            });

            cy.findByRole("row", { name: "Reviewed (FTE) Row" }).within(() => {
                cy.findByRole("cell", { name: "Team" }).should("have.text", "-");
                cy.findByRole("cell", { name: "Role" }).should("have.text", "-");
                cy.findByRole("cell", { name: "Name" }).should("have.text", "-");
            });

            cy.findByRole("row", { name: "Approved Row" }).within(() => {
                cy.findByRole("cell", { name: "Team" }).should("have.text", "-");
                cy.findByRole("cell", { name: "Role" }).should("have.text", "-");
                cy.findByRole("cell", { name: "Name" }).should("have.text", "-");
            });
        });

        cy.findByRole("table", { name: "Flight/Ground Test Plan Approval Table" }).within(() => {
            cy.findByRole("row", { name: "Authored (FTE) Row" }).within(() => {
                cy.findByRole("cell", { name: "Team" }).should("have.text", "-");
                cy.findByRole("cell", { name: "Role" }).should("have.text", "-");
                cy.findByRole("cell", { name: "Name" }).should("have.text", "-");
            });

            cy.findByRole("row", { name: "Reviewed (Eng) Row" }).within(() => {
                cy.findByRole("cell", { name: "Team" }).should("have.text", "-");
                cy.findByRole("cell", { name: "Role" }).should("have.text", "-");
                cy.findByRole("cell", { name: "Name" }).should("have.text", "-");
            });

            cy.findByRole("row", { name: "Reviewed (FTE) Row" }).within(() => {
                cy.findByRole("cell", { name: "Team" }).should("have.text", "-");
                cy.findByRole("cell", { name: "Role" }).should("have.text", "-");
                cy.findByRole("cell", { name: "Name" }).should("have.text", "-");
            });

            cy.findByRole("row", { name: "Technical Approval Row" }).within(() => {
                cy.findByRole("cell", { name: "Team" }).should("have.text", "-");
                cy.findByRole("cell", { name: "Role" }).should("have.text", "-");
                cy.findByRole("cell", { name: "Name" }).should("have.text", "-");
            });
        });

        cy.findByRole("table", { name: "Flight Test Definition (FTD) Approval Table" }).within(() => {
            cy.findByRole("row", { name: "Safety Release (SRB) Row" }).within(() => {
                cy.findByRole("cell", { name: "Team" }).should("have.text", "-");
                cy.findByRole("cell", { name: "Role" }).should("have.text", "-");
                cy.findByRole("cell", { name: "Name" }).should("have.text", "-");
            });
        });
    });

    it("should allow user to set the approval signatory data for the first time - Test Request Approval section", () => {
        getSignatureRecordsInterceptor([]);

        cy.mount(<App />);
        DefinitionCardPageFragment.accordionButton().click();
        DefinitionCardPageFragment.detailsButton().click();
        DefinitionDetailsPage.approvalSignatoryTab().click();
        cy.wait("@getSignatureRecords");

        cy.findByRole("button", { name: "Edit Test Request Approval" }).click();
        cy.findByRole("row", { name: "Authored (DE) Row Form" }).within(() => {
            cy.findByRole("cell", { name: "Team" }).findByRole("textbox").type(testRequestAuthoredDE.team);
            cy.findByRole("cell", { name: "Role" }).findByRole("textbox").type(testRequestAuthoredDE.role);
            cy.findByRole("cell", { name: "Name" }).findByRole("textbox").type(testRequestAuthoredDE.name);
        });

        cy.findByRole("row", { name: "Reviewed (CVE) Row Form" }).within(() => {
            cy.findByRole("cell", { name: "Team" }).findByRole("textbox").type(testRequestReviewedCVE.team);
            cy.findByRole("cell", { name: "Role" }).findByRole("textbox").type(testRequestReviewedCVE.role);
            cy.findByRole("cell", { name: "Name" }).findByRole("textbox").type(testRequestReviewedCVE.name);
        });

        cy.findByRole("row", { name: "Reviewed (FTE) Row Form" }).within(() => {
            cy.findByRole("cell", { name: "Team" }).findByRole("textbox").type(testRequestReviewedFTE.team);
            cy.findByRole("cell", { name: "Role" }).findByRole("textbox").type(testRequestReviewedFTE.role);
            cy.findByRole("cell", { name: "Name" }).findByRole("textbox").type(testRequestReviewedFTE.name);
        });

        cy.findByRole("row", { name: "Approved Row Form" }).within(() => {
            cy.findByRole("cell", { name: "Team" }).findByRole("textbox").type(testRequestApproved.team);
            cy.findByRole("cell", { name: "Role" }).findByRole("textbox").type(testRequestApproved.role);
            cy.findByRole("cell", { name: "Name" }).findByRole("textbox").type(testRequestApproved.name);
        });

        getSignatureRecordsInterceptor(testRequestSignatureRecords);
        bulkPostSignatureRecordsInterceptor();
        cy.findByRole("button", { name: "Done" }).click();
        cy.wait("@bulkPostSignatureRecords");
        cy.wait("@getSignatureRecords");

        // Check if the data is displayed correctly
        cy.findByRole("table", { name: "Test Request Approval Table" }).within(() => {
            cy.findByRole("row", { name: "Authored (DE) Row" }).within(() => {
                cy.findByRole("cell", { name: "Team" }).should("have.text", testRequestAuthoredDE.team);
                cy.findByRole("cell", { name: "Role" }).should("have.text", testRequestAuthoredDE.role);
                cy.findByRole("cell", { name: "Name" }).should("have.text", testRequestAuthoredDE.name);
            });

            cy.findByRole("row", { name: "Reviewed (CVE) Row" }).within(() => {
                cy.findByRole("cell", { name: "Team" }).should("have.text", testRequestReviewedCVE.team);
                cy.findByRole("cell", { name: "Role" }).should("have.text", testRequestReviewedCVE.role);
                cy.findByRole("cell", { name: "Name" }).should("have.text", testRequestReviewedCVE.name);
            });

            cy.findByRole("row", { name: "Reviewed (FTE) Row" }).within(() => {
                cy.findByRole("cell", { name: "Team" }).should("have.text", testRequestReviewedFTE.team);
                cy.findByRole("cell", { name: "Role" }).should("have.text", testRequestReviewedFTE.role);
                cy.findByRole("cell", { name: "Name" }).should("have.text", testRequestReviewedFTE.name);
            });

            cy.findByRole("row", { name: "Approved Row" }).within(() => {
                cy.findByRole("cell", { name: "Team" }).should("have.text", testRequestApproved.team);
                cy.findByRole("cell", { name: "Role" }).should("have.text", testRequestApproved.role);
                cy.findByRole("cell", { name: "Name" }).should("have.text", testRequestApproved.name);
            });
        });
    });

    it("should allow user to set the approval signatory data for the first time - Flight/Ground Test Plan Approval section", () => {
        getSignatureRecordsInterceptor([]);

        cy.mount(<App />);
        DefinitionCardPageFragment.accordionButton().click();
        DefinitionCardPageFragment.detailsButton().click();
        DefinitionDetailsPage.approvalSignatoryTab().click();
        cy.wait("@getSignatureRecords");

        cy.findByRole("button", { name: "Edit Flight/Ground Test Plan Approval" }).click();
        cy.findByRole("row", { name: "Authored (FTE) Row Form" }).within(() => {
            cy.findByRole("cell", { name: "Team" }).findByRole("textbox").type(flightGroundTestPlanAuthoredFTE.team);
            cy.findByRole("cell", { name: "Role" }).findByRole("textbox").type(flightGroundTestPlanAuthoredFTE.role);
            cy.findByRole("cell", { name: "Name" }).findByRole("textbox").type(flightGroundTestPlanAuthoredFTE.name);
        });

        cy.findByRole("row", { name: "Reviewed (Eng) Row Form" }).within(() => {
            cy.findByRole("cell", { name: "Team" }).findByRole("textbox").type(flightGroundTestPlanReviewedEng.team);
            cy.findByRole("cell", { name: "Role" }).findByRole("textbox").type(flightGroundTestPlanReviewedEng.role);
            cy.findByRole("cell", { name: "Name" }).findByRole("textbox").type(flightGroundTestPlanReviewedEng.name);
        });

        cy.findByRole("row", { name: "Reviewed (FTE) Row Form" }).within(() => {
            cy.findByRole("cell", { name: "Team" }).findByRole("textbox").type(flightGroundTestPlanReviewedFTE.team);
            cy.findByRole("cell", { name: "Role" }).findByRole("textbox").type(flightGroundTestPlanReviewedFTE.role);
            cy.findByRole("cell", { name: "Name" }).findByRole("textbox").type(flightGroundTestPlanReviewedFTE.name);
        });

        cy.findByRole("row", { name: "Technical Approval Row Form" }).within(() => {
            cy.findByRole("cell", { name: "Team" })
                .findByRole("textbox")
                .type(flightGroundTestPlanTechnicalApproval.team);
            cy.findByRole("cell", { name: "Role" })
                .findByRole("textbox")
                .type(flightGroundTestPlanTechnicalApproval.role);
            cy.findByRole("cell", { name: "Name" })
                .findByRole("textbox")
                .type(flightGroundTestPlanTechnicalApproval.name);
        });

        getSignatureRecordsInterceptor(flightGroundTestPlanSignatureRecords);
        cy.findByRole("button", { name: "Done" }).click();
        cy.wait("@bulkPostSignatureRecords");
        cy.wait("@getSignatureRecords");

        // Check if the data is displayed correctly
        cy.findByRole("table", { name: "Flight/Ground Test Plan Approval Table" }).within(() => {
            cy.findByRole("row", { name: "Authored (FTE) Row" }).within(() => {
                cy.findByRole("cell", { name: "Team" }).should("have.text", flightGroundTestPlanAuthoredFTE.team);
                cy.findByRole("cell", { name: "Role" }).should("have.text", flightGroundTestPlanAuthoredFTE.role);
                cy.findByRole("cell", { name: "Name" }).should("have.text", flightGroundTestPlanAuthoredFTE.name);
            });

            cy.findByRole("row", { name: "Reviewed (Eng) Row" }).within(() => {
                cy.findByRole("cell", { name: "Team" }).should("have.text", flightGroundTestPlanReviewedEng.team);
                cy.findByRole("cell", { name: "Role" }).should("have.text", flightGroundTestPlanReviewedEng.role);
                cy.findByRole("cell", { name: "Name" }).should("have.text", flightGroundTestPlanReviewedEng.name);
            });

            cy.findByRole("row", { name: "Reviewed (FTE) Row" }).within(() => {
                cy.findByRole("cell", { name: "Team" }).should("have.text", flightGroundTestPlanReviewedFTE.team);
                cy.findByRole("cell", { name: "Role" }).should("have.text", flightGroundTestPlanReviewedFTE.role);
                cy.findByRole("cell", { name: "Name" }).should("have.text", flightGroundTestPlanReviewedFTE.name);
            });

            cy.findByRole("row", { name: "Technical Approval Row" }).within(() => {
                cy.findByRole("cell", { name: "Team" }).should("have.text", flightGroundTestPlanTechnicalApproval.team);
                cy.findByRole("cell", { name: "Role" }).should("have.text", flightGroundTestPlanTechnicalApproval.role);
                cy.findByRole("cell", { name: "Name" }).should("have.text", flightGroundTestPlanTechnicalApproval.name);
            });
        });
    });

    it("should allow user to set the approval signatory data for the first time - Flight Test Definition (FTD) Approval section", () => {
        getSignatureRecordsInterceptor([]);

        cy.mount(<App />);
        DefinitionCardPageFragment.accordionButton().click();
        DefinitionCardPageFragment.detailsButton().click();
        DefinitionDetailsPage.approvalSignatoryTab().click();
        cy.wait("@getSignatureRecords");

        cy.findByRole("button", { name: "Edit Flight Test Definition (FTD) Approval" }).click();
        cy.findByRole("row", { name: "Safety Release (SRB) Row Form" }).within(() => {
            cy.findByRole("cell", { name: "Team" })
                .findByRole("textbox")
                .type(flightTestDefinitionSafetyReleasedSRB.team);
            cy.findByRole("cell", { name: "Role" })
                .findByRole("textbox")
                .type(flightTestDefinitionSafetyReleasedSRB.role);
            cy.findByRole("cell", { name: "Name" })
                .findByRole("textbox")
                .type(flightTestDefinitionSafetyReleasedSRB.name);
        });

        getSignatureRecordsInterceptor(flightTestDefinitionSignatureRecords);
        cy.findByRole("button", { name: "Done" }).click();
        cy.wait("@bulkPostSignatureRecords");
        cy.wait("@getSignatureRecords");

        // Check if the data is displayed correctly
        cy.findByRole("table", { name: "Flight Test Definition (FTD) Approval Table" }).within(() => {
            cy.findByRole("row", { name: "Safety Release (SRB) Row" }).within(() => {
                cy.findByRole("cell", { name: "Team" }).should("have.text", flightTestDefinitionSafetyReleasedSRB.team);
                cy.findByRole("cell", { name: "Role" }).should("have.text", flightTestDefinitionSafetyReleasedSRB.role);
                cy.findByRole("cell", { name: "Name" }).should("have.text", flightTestDefinitionSafetyReleasedSRB.name);
            });
        });
    });

    it("should allow user to update the approval signatory data after it has already been set - Test Request Approval section", () => {
        getSignatureRecordsInterceptor(testRequestSignatureRecords);

        cy.mount(<App />);
        DefinitionCardPageFragment.accordionButton().click();
        DefinitionCardPageFragment.detailsButton().click();
        DefinitionDetailsPage.approvalSignatoryTab().click();
        cy.wait("@getSignatureRecords");

        const updatedTestRequestAuthoredDE = anySignatureRecord({ ...testRequestAuthoredDE, team: "Updated Team" });
        const updatedTestRequestReviewedCVE = anySignatureRecord({ ...testRequestReviewedCVE, role: "Updated Role" });

        cy.findByRole("button", { name: "Edit Test Request Approval" }).click();
        cy.findByRole("row", { name: "Authored (DE) Row Form" }).within(() => {
            cy.findByRole("cell", { name: "Team" })
                .findByRole("textbox")
                .clear()
                .type(updatedTestRequestAuthoredDE.team);
        });

        cy.findByRole("row", { name: "Reviewed (CVE) Row Form" }).within(() => {
            cy.findByRole("cell", { name: "Role" })
                .findByRole("textbox")
                .clear()
                .type(updatedTestRequestReviewedCVE.role);
        });

        const updatedSignatureRecords = [
            updatedTestRequestAuthoredDE,
            updatedTestRequestReviewedCVE,
            testRequestReviewedFTE,
            testRequestApproved,
        ];
        getSignatureRecordsInterceptor(updatedSignatureRecords);
        cy.findByRole("button", { name: "Done" }).click();
        cy.wait("@bulkPatchSignatureRecords");
        cy.wait("@getSignatureRecords");

        // Check if the data is displayed correctly
        cy.findByRole("table", { name: "Test Request Approval Table" }).within(() => {
            cy.findByRole("row", { name: "Authored (DE) Row" }).within(() => {
                cy.findByRole("cell", { name: "Team" }).should("have.text", updatedTestRequestAuthoredDE.team);
            });

            cy.findByRole("row", { name: "Reviewed (CVE) Row" }).within(() => {
                cy.findByRole("cell", { name: "Role" }).should("have.text", updatedTestRequestReviewedCVE.role);
            });
        });
    });

    it("should allow user to update the approval signatory data after it has already been set - Flight/Ground Test Plan Approval section", () => {
        getSignatureRecordsInterceptor([]);

        cy.mount(<App />);
        DefinitionCardPageFragment.accordionButton().click();
        DefinitionCardPageFragment.detailsButton().click();
        DefinitionDetailsPage.approvalSignatoryTab().click();
        cy.wait("@getSignatureRecords");

        const updatedFlightGroundTestPlanReviewedEng = anySignatureRecord({
            ...flightGroundTestPlanReviewedEng,
            name: "Updated Name",
        });
        const updatedFlightGroundTestPlanReviewedFTE = anySignatureRecord({
            ...flightGroundTestPlanReviewedFTE,
            role: "Updated Role",
        });

        cy.findByRole("button", { name: "Edit Flight/Ground Test Plan Approval" }).click();
        cy.findByRole("row", { name: "Reviewed (Eng) Row Form" }).within(() => {
            cy.findByRole("cell", { name: "Name" })
                .findByRole("textbox")
                .clear()
                .type(updatedFlightGroundTestPlanReviewedEng.name);
        });

        cy.findByRole("row", { name: "Reviewed (FTE) Row Form" }).within(() => {
            cy.findByRole("cell", { name: "Role" })
                .findByRole("textbox")
                .clear()
                .type(flightGroundTestPlanReviewedFTE.role);
        });

        const updatedSignatureRecords = [
            flightGroundTestPlanAuthoredFTE,
            updatedFlightGroundTestPlanReviewedEng,
            updatedFlightGroundTestPlanReviewedFTE,
            flightGroundTestPlanTechnicalApproval,
        ];
        getSignatureRecordsInterceptor(updatedSignatureRecords);
        cy.findByRole("button", { name: "Done" }).click();
        cy.wait("@bulkPatchSignatureRecords");
        cy.wait("@getSignatureRecords");

        // Check if the data is displayed correctly
        cy.findByRole("table", { name: "Flight/Ground Test Plan Approval Table" }).within(() => {
            cy.findByRole("row", { name: "Reviewed (Eng) Row" }).within(() => {
                cy.findByRole("cell", { name: "Name" }).should(
                    "have.text",
                    updatedFlightGroundTestPlanReviewedEng.name
                );
            });

            cy.findByRole("row", { name: "Reviewed (FTE) Row" }).within(() => {
                cy.findByRole("cell", { name: "Role" }).should(
                    "have.text",
                    updatedFlightGroundTestPlanReviewedFTE.role
                );
            });
        });
    });

    it("should allow user to update the approval signatory data after it has already been set - Flight Test Definition (FTD) Approval section", () => {
        getSignatureRecordsInterceptor(flightTestDefinitionSignatureRecords);

        const updatedFlightTestDefinitionSafetyReleasedSRB = anySignatureRecord({
            ...flightTestDefinitionSignatureRecords[0],
            name: "J. Doe",
        });

        cy.mount(<App />);
        DefinitionCardPageFragment.accordionButton().click();
        DefinitionCardPageFragment.detailsButton().click();
        DefinitionDetailsPage.approvalSignatoryTab().click();
        cy.wait("@getSignatureRecords");

        cy.findByRole("button", { name: "Edit Flight Test Definition (FTD) Approval" }).click();
        cy.findByRole("row", { name: "Safety Release (SRB) Row Form" }).within(() => {
            cy.findByRole("cell", { name: "Name" })
                .findByRole("textbox")
                .clear()
                .type(updatedFlightTestDefinitionSafetyReleasedSRB.name);
        });

        getSignatureRecordsInterceptor([updatedFlightTestDefinitionSafetyReleasedSRB]);
        cy.findByRole("button", { name: "Done" }).click();
        cy.wait("@bulkPatchSignatureRecords");
        cy.wait("@getSignatureRecords");

        // Check if the data is displayed correctly
        cy.findByRole("table", { name: "Flight Test Definition (FTD) Approval Table" }).within(() => {
            cy.findByRole("row", { name: "Safety Release (SRB) Row" }).within(() => {
                cy.findByRole("cell", { name: "Name" }).should(
                    "have.text",
                    updatedFlightTestDefinitionSafetyReleasedSRB.name
                );
            });
        });
    });
});
