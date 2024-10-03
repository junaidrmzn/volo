import { MSNModel, MasterModel, TestTypeEnum } from "@voloiq-typescript-api/ftd-types/dist";
import { RiskLevel } from "@voloiq/flight-test-definition-api/v1";
import {
    FlightTestDefinitionRequestStatus,
    FlightTestDefinitionStatus,
    anyDefinitionByGroup,
} from "@voloiq/flight-test-definition-api/v2";
import { AppWithoutProvider as App } from "../../src/App";
import { getAllAttachedFilesInterceptor } from "../interceptors/attachedFilesInterceptors";
import { getAllDefinitionsByAtaInterceptor } from "../interceptors/definitionsInterceptors";
import { getAllRevisionsInterceptor } from "../interceptors/getAllRevisionsInterceptor";
import {
    ApiError,
    getAllTabCountersInterceptor,
    getDefinitionInterceptorV2,
    updateDefinitionErrorInterceptorV2,
    updateDefinitionInterceptorV2,
} from "../interceptors/v2/definitionsInterceptors";
import { DefinitionDetailsPage } from "../pages/definition-details/definitionDetailsPageObject";
import { DefinitionCardPageFragment } from "../pages/definition-overview/page-fragments/definitionCardPageFragment";

const errorMessage: ApiError = {
    id: "fce2f0a7-10d7-4897-acfd-5083a32b50f8",
    timestamp: "2024-05-13T11:10:40.262232Z",
    code: 400,
    message: "Bad Request.",
    status: "INVALID_ARGUMENT",
    details: [
        "Cannot move an incomplete Flight Test Request out of Draft! The following required field(s) are empty: ['atleast 1 manual or windchill requirement', 'atleast 1 associated Test Hazard Assessment', 'Approval Signatory data incomplete']",
    ],
};

const definitionPatchResponseBody = (status: string) => {
    return {
        data: {
            title: "New Definition",
            summary: "Test",
            scope: "Test",
            testArticle: "Test",
            masterModel: "2X" as MasterModel,
            msn: "03" as MSNModel,
            ata: 2,
            testNumber: 323,
            revision: "A43",
            testType: "GROUND" as TestTypeEnum,
            id: "86fe5742-61ab-4bfe-91a1-4534992084b4",
            requesterName: "ABC",
            inactive: false,
            createTime: "2023-09-06T12:07:51.393828Z",
            updateTime: "2024-05-14T07:38:25.219456Z",
            status: "DRAFT" as FlightTestDefinitionStatus,
            requestStatus: status as FlightTestDefinitionRequestStatus,
            ftdId: "FTD-VC2-02-323-A43",
            isReadyForRevision: false,
            releasedRevisions: [],
            highestRiskLevel: "MEDIUM" as RiskLevel,
        },
    };
};

const createDefinitionData = (
    requestStatus?: FlightTestDefinitionRequestStatus,
    status?: FlightTestDefinitionStatus
) => {
    const definitionList = [
        {
            title: "FCS Commission flight Integration off",
            ftdId: "FTD-V21-27-041-A11",
            status: status || "DRAFT",
            requestStatus,
        },
    ].map((definition) => anyDefinitionByGroup({ value: [definition] }));
    getAllDefinitionsByAtaInterceptor(definitionList);
    const definition = definitionList.shift()?.value.shift();
    getDefinitionInterceptorV2({ ...definition });
};

const openStatusModalAndTriggerStatusDropdown = (requestStatus: string) => {
    createDefinitionData(requestStatus.toUpperCase() as FlightTestDefinitionRequestStatus);
    DefinitionDetailsPage.actionsButton().click();
    DefinitionDetailsPage.changeStatusButton().click();
    cy.findByLabelText("Status").click();
};

const changeRequestStatusAndCheckResponse = (requestStatus: string) => {
    const requestStatusDisplayName = requestStatus === "Safety Approval" ? "Safety Release" : requestStatus;
    cy.findByRole("dialog").within(() => {
        cy.findByText(requestStatusDisplayName).click();
    });
    updateDefinitionInterceptorV2(definitionPatchResponseBody(requestStatus.toUpperCase()));

    cy.findByRole("button", { name: "Done" }).click();
    cy.wait("@patchDefinitionV2").then((interception) => {
        expect(interception?.response?.statusCode).to.eq(200);
        expect(interception?.response?.body.data.requestStatus).to.eq(requestStatus.toUpperCase());
    });
};

describe("DefinitionStatusChange", () => {
    beforeEach(() => {
        getAllAttachedFilesInterceptor([]);
        getAllRevisionsInterceptor();
        getAllTabCountersInterceptor();
    });

    it("User can see the Draft badge in Definition Overview and Detail", () => {
        getAllDefinitionsByAtaInterceptor();
        getDefinitionInterceptorV2();

        cy.mount(<App />);

        DefinitionCardPageFragment.accordionButton().click();
        cy.findByText("Draft").should("be.visible");
        DefinitionCardPageFragment.detailsButton().click();
        cy.findAllByText("Draft").should("have.length", 2);
    });

    it("User can see the different badges in Detail for request and definition status", () => {
        const status = "Approved";
        const requestStatus = "Flight Test Review";

        createDefinitionData(
            requestStatus.toUpperCase() as FlightTestDefinitionRequestStatus,
            status.toUpperCase() as FlightTestDefinitionStatus
        );

        cy.mount(<App />);

        DefinitionCardPageFragment.accordionButton().click();
        cy.findByText("Released").should("be.visible");
        DefinitionCardPageFragment.detailsButton().click();
        cy.findByText("Released").should("be.visible");
        cy.findByText("Flight Test Review").should("be.visible");
    });

    it("User gets an error message, saying which data is missing to change the status", () => {
        getAllDefinitionsByAtaInterceptor();
        getDefinitionInterceptorV2();

        cy.mount(<App />);

        DefinitionCardPageFragment.accordionButton().click();
        cy.findByText("Draft").should("be.visible");
        DefinitionCardPageFragment.detailsButton().click();
        cy.findAllByText("Draft").should("have.length", 2);
        DefinitionDetailsPage.actionsButton().click();
        DefinitionDetailsPage.changeStatusButton().click();

        cy.findByLabelText("Status").click();
        cy.findByText("Flight Test Review").click();
        updateDefinitionErrorInterceptorV2(errorMessage);
        cy.findByRole("button", { name: "Done" }).click();
        cy.wait("@patchDefinitionErrorV2").then((interception) => {
            expect(interception?.response?.statusCode).to.eq(400);
            expect(interception?.response?.body.error).to.have.property("details");
        });
    });

    it("User can change the status from Draft to Flight Test Review", () => {
        getAllDefinitionsByAtaInterceptor();
        getDefinitionInterceptorV2();

        cy.mount(<App />);

        DefinitionCardPageFragment.accordionButton().click();
        DefinitionCardPageFragment.detailsButton().click();
        openStatusModalAndTriggerStatusDropdown("Flight Test Review");
        cy.findByText("Engineering Review").should("not.exist");
        cy.findByText("Technical Approval").should("not.exist");
        cy.findByText("Safety Release").should("not.exist");
        changeRequestStatusAndCheckResponse("Flight Test Review");
    });

    it("User can change the status from Flight Test Review to Engineering Review", () => {
        const requestStatus = "Flight Test Review";
        createDefinitionData(requestStatus.toUpperCase() as FlightTestDefinitionRequestStatus);

        cy.mount(<App />);

        DefinitionCardPageFragment.accordionButton().click();
        DefinitionCardPageFragment.detailsButton().click();
        openStatusModalAndTriggerStatusDropdown("Engineering Review");
        cy.findByRole("dialog").within(() => {
            cy.findByText("Draft").should("be.visible");
            cy.findByText("Technical Approval").should("not.exist");
            cy.findByText("Safety Release").should("not.exist");
        });
        changeRequestStatusAndCheckResponse("Engineering Review");
    });

    it("User can change the status from Engineering Review to Technical Approval", () => {
        const requestStatus = "Engineering Review";
        createDefinitionData(requestStatus.toUpperCase() as FlightTestDefinitionRequestStatus);

        cy.mount(<App />);

        DefinitionCardPageFragment.accordionButton().click();
        DefinitionCardPageFragment.detailsButton().click();
        openStatusModalAndTriggerStatusDropdown("Technical Approval");
        cy.findByRole("dialog").within(() => {
            cy.findByText("Draft").should("be.visible");
            cy.findByText("Flight Test Review").should("be.visible");
            cy.findByText("Safety Release").should("not.exist");
        });

        changeRequestStatusAndCheckResponse("Technical Approval");
    });

    it("User can change the status from Technical Approval to Safety Approval", () => {
        const requestStatus = "Technical Approval";
        createDefinitionData(requestStatus.toUpperCase() as FlightTestDefinitionRequestStatus);

        cy.mount(<App />);

        DefinitionCardPageFragment.accordionButton().click();
        DefinitionCardPageFragment.detailsButton().click();
        openStatusModalAndTriggerStatusDropdown("Safety Approval");
        cy.findByRole("dialog").within(() => {
            cy.findByText("Draft").should("be.visible");
            cy.findByText("Flight Test Review").should("be.visible");
            cy.findByText("Engineering Review").should("be.visible");
        });

        changeRequestStatusAndCheckResponse("Safety Approval");
    });

    it("User can change the status from Technical Approval back to Draft", () => {
        const requestStatus = "Technical Approval";
        createDefinitionData(requestStatus.toUpperCase() as FlightTestDefinitionRequestStatus);

        cy.mount(<App />);

        DefinitionCardPageFragment.accordionButton().click();
        DefinitionCardPageFragment.detailsButton().click();
        openStatusModalAndTriggerStatusDropdown("Draft");
        cy.findByRole("dialog").within(() => {
            cy.findByText("Draft").should("be.visible");
            cy.findByText("Flight Test Review").should("be.visible");
            cy.findByText("Engineering Review").should("be.visible");
        });

        changeRequestStatusAndCheckResponse("Draft");
    });

    it("User cannot change the status from Safety Approval to something else", () => {
        const requestStatus = "Safety Approval";
        createDefinitionData(requestStatus.toUpperCase() as FlightTestDefinitionRequestStatus);

        cy.mount(<App />);

        DefinitionCardPageFragment.accordionButton().click();
        DefinitionCardPageFragment.detailsButton().click();
        openStatusModalAndTriggerStatusDropdown("Safety Approval");
        cy.findByRole("dialog").within(() => {
            cy.findByText("Draft").should("not.exist");
            cy.findByText("Flight Test Review").should("not.exist");
            cy.findByText("Engineering Review").should("not.exist");
        });
    });
});
