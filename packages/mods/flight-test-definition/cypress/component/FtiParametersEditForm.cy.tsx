import { v4 as uuidV4 } from "uuid";
import {
    FTILink,
    anyFtiLink,
    anyFtiParameter,
    anyParameterGroup,
    anyParameterGroupMapping,
} from "@voloiq/flight-test-definition-api/v1";
import { DefinitionEditSessionIdProvider } from "../../src/definition-overview/definition-details/definition-edit-session-id-context/DefinitionEditSessionIdProvider";
import { FtiParametersEditModal } from "../../src/definition-overview/definition-details/flight-test-request/fti-parameters/FtiParametersEditModal";
import {
    bulkAddLinkedFtiParameterInterceptor,
    bulkDeleteLinkedFtiParameterInterceptor,
    bulkEditLinkedFtiParameterInterceptor,
    getAllAircraftZonesInterceptor,
    getAllInstrumentationParametersInterceptor,
    getAllWorkgroupsInterceptor,
} from "../interceptors/ftiParameterInterceptors";
import {
    deleteParameterGroupsInterceptor,
    getAllParameterGroupsInterceptor,
    postParameterGroupsInterceptor,
} from "../interceptors/parameterGroupInterceptors";
import { FilterBarFtiParameterPageFragment } from "../pages/definition-details/fti-parameter/FilterBarFtiParameterPageFragment";
import { LinkFtiParametersModal } from "../pages/definition-details/fti-parameter/linkFtiParametersModalPageFragment";

const testParameter1 = anyFtiParameter({
    shortDescription: "testParameter1",
    ftiCode: "ftiCode1",
    isSafetyOfFlightCritical: true,
});
const testParameter2 = anyFtiParameter({ shortDescription: "testParameter2", ftiCode: "ftiCode2" });
const testParameter3 = anyFtiParameter({ shortDescription: "testParameter3", ftiCode: "ftiCode3" });
const testParameter4 = anyFtiParameter({ shortDescription: "testParameter4", ftiCode: "ftiCode4" });

const parameterLink1 = anyFtiLink({ instrumentationId: testParameter1.id, instrumentationParameter: testParameter1 });
const parameterLink2 = anyFtiLink({ instrumentationId: testParameter2.id, instrumentationParameter: testParameter2 });
const parameterLink3 = anyFtiLink({ instrumentationId: testParameter3.id, instrumentationParameter: testParameter3 });

const parameterGroupMapping1 = anyParameterGroupMapping({ parameterId: testParameter1.id });
const parameterGroupMapping2 = anyParameterGroupMapping({ parameterId: testParameter2.id });
const parameterGroupMapping3 = anyParameterGroupMapping({ parameterId: testParameter3.id });
const parameterGroup1 = anyParameterGroup({
    name: "Parameter Group 1",
    parameterGroupMapping: [parameterGroupMapping1, parameterGroupMapping2, parameterGroupMapping3],
});
const parameterGroup2 = anyParameterGroup({
    name: "Parameter Group 2",
    parameterGroupMapping: [parameterGroupMapping1, parameterGroupMapping2],
});

describe("Fti Parameters Edit From", () => {
    const renderWithProvider = (ftiLinks: FTILink[] = [parameterLink1, parameterLink2]) => {
        cy.mountTestPoint(
            <DefinitionEditSessionIdProvider>
                <FtiParametersEditModal definitionId={uuidV4()} ftiLinks={ftiLinks} onClose={() => {}} isOpen />
            </DefinitionEditSessionIdProvider>
        );
    };

    beforeEach(() => {
        getAllInstrumentationParametersInterceptor([testParameter1, testParameter2, testParameter3, testParameter4]);
        getAllParameterGroupsInterceptor([parameterGroup1, parameterGroup2]);
        getAllAircraftZonesInterceptor();
        getAllWorkgroupsInterceptor();
        postParameterGroupsInterceptor();
    });

    it("The user can save selected fti parameters", () => {
        renderWithProvider();
        LinkFtiParametersModal.selectedTitle(2).should("be.visible");
        LinkFtiParametersModal.saveAsParameterGroupButton().click();
        LinkFtiParametersModal.saveAsParameterGroupNameInput().type("groupName");
        LinkFtiParametersModal.saveAsParameterGroupSaveButton().click();

        cy.wait("@postParameterGroups").as("postParameterGroupsResult");

        cy.get("@postParameterGroupsResult").its("request.body.name").should("eq", "groupName");

        cy.get("@postParameterGroupsResult")
            .its("request.body.parameterGroupMapping")
            .should("have.length", 2)
            .should(
                "deep.include",
                ...[parameterLink1, parameterLink2].map((parameterLink) => ({
                    essential: parameterLink.desirability === "ESSENTIAL",
                    parameterId: parameterLink.instrumentationId,
                }))
            );
    });

    it("The user can delete selected parameter groups", () => {
        deleteParameterGroupsInterceptor();

        renderWithProvider();
        LinkFtiParametersModal.selectedTitle(2).should("be.visible");
        LinkFtiParametersModal.parameterGroupSelect().click();
        cy.findByRole("button", { name: /parameter group 2/i }).click();

        getAllParameterGroupsInterceptor([parameterGroup1]);
        LinkFtiParametersModal.deleteParameterGroupButton().click();
        cy.wait("@deleteParameterGroups").its("request.url").should("contain", parameterGroup2.id);
        cy.wait("@getAllParameterGroups");

        LinkFtiParametersModal.parameterGroupSelect().click();
        cy.findByRole("button", { name: /parameter group 2/i }).should("not.exist");
    });

    it("The user can select a parameter group to preselect included fti parameters", () => {
        deleteParameterGroupsInterceptor();

        renderWithProvider();

        LinkFtiParametersModal.selectedTitle(2).should("be.visible");

        cy.findByText(testParameter1.shortDescription).should("exist");
        cy.findByText(testParameter2.shortDescription).should("exist");
        cy.findByText(testParameter3.shortDescription).should("not.exist");
        cy.findAllByRole("status", { name: "Safety of Flight Critical" }).its("length").should("eq", 1);

        LinkFtiParametersModal.parameterGroupSelect().click();
        cy.findByRole("button", { name: /parameter group 2/i }).click();

        LinkFtiParametersModal.selectedTitle(2).should("be.visible");

        cy.findByText(testParameter1.shortDescription).should("exist");
        cy.findByText(testParameter2.shortDescription).should("exist");

        LinkFtiParametersModal.parameterGroupSelect().click();
        cy.findByRole("button", { name: /parameter group 1/i }).click();

        LinkFtiParametersModal.selectedTitle(3).should("be.visible");

        cy.findByText(testParameter1.shortDescription).should("exist");
        cy.findByText(testParameter2.shortDescription).should("exist");
        cy.findByText(testParameter3.shortDescription).should("exist");
    });

    it("The user can apply filter to FTI parameters", () => {
        renderWithProvider();
        FilterBarFtiParameterPageFragment.filter({ shortDescription: "EPU", ftiCode: "ftiCode1" });
        cy.findByRole("button", { name: "EPU" }).should("be.visible");
    });

    it("The user can select a parameter group and add an additional parameter ", () => {
        deleteParameterGroupsInterceptor();
        bulkAddLinkedFtiParameterInterceptor();
        bulkDeleteLinkedFtiParameterInterceptor();
        bulkEditLinkedFtiParameterInterceptor();

        renderWithProvider();

        LinkFtiParametersModal.parameterGroupSelect().click();
        cy.findByRole("button", { name: /parameter group 2/i }).click();

        LinkFtiParametersModal.selectedTitle(2).should("be.visible");

        LinkFtiParametersModal.searchIndication().should("exist");
        FilterBarFtiParameterPageFragment.filter({ ftiCode: "ftiCode3" });
        LinkFtiParametersModal.workgroupButton("EPU").click();

        LinkFtiParametersModal.selectFtiParameterCheckbox(testParameter3.ftiCode ?? "").should("not.be.checked");

        LinkFtiParametersModal.selectFtiParameterCheckbox(testParameter3.ftiCode ?? "").click({ force: true });

        LinkFtiParametersModal.selectedTitle(3).should("exist");

        LinkFtiParametersModal.doneButton().click();

        // create added parameter as fti links
        cy.wait("@bulkPostLinkedFtiParameter")
            .its("request.body")
            .should(
                "deep.include",
                ...[testParameter3].map((testParameter) => ({
                    instrumentationId: testParameter.id,
                    desirability: "ESSENTIAL",
                }))
            );

        // patch fti links to be essential
        cy.wait("@bulkPatchLinkedFtiParameter")
            .its("request.body")
            .should(
                "deep.include",
                ...[parameterLink1, parameterLink2].map((parameterLink) => ({
                    id: parameterLink.id,
                    desirability: "ESSENTIAL",
                }))
            );

        // delete nothing
        cy.get("@bulkDeleteLinkedFtiParameter").should("not.exist");
    });

    it("If the user is selecting parameters, the selection of a group will overwrite the previous selection", () => {
        deleteParameterGroupsInterceptor();
        bulkAddLinkedFtiParameterInterceptor();
        bulkDeleteLinkedFtiParameterInterceptor();
        bulkEditLinkedFtiParameterInterceptor();

        renderWithProvider([parameterLink3]);

        LinkFtiParametersModal.selectedTitle(1).should("exist");

        LinkFtiParametersModal.searchIndication().should("exist");

        FilterBarFtiParameterPageFragment.filter({ ftiCode: "ftiCode1" });
        getAllInstrumentationParametersInterceptor([testParameter1]);
        LinkFtiParametersModal.workgroupButton("EPU").click();

        LinkFtiParametersModal.selectFtiParameterCheckbox(testParameter1.ftiCode ?? "").should("not.be.checked");

        LinkFtiParametersModal.selectFtiParameterCheckbox(testParameter1.ftiCode ?? "").click({ force: true });

        LinkFtiParametersModal.selectedTitle(2).should("exist");

        LinkFtiParametersModal.parameterGroupSelect().click();
        cy.findByRole("button", { name: /parameter group 1/i }).click();

        LinkFtiParametersModal.selectedTitle(3).should("exist");

        cy.findAllByRole("status", { name: "Safety of Flight Critical" }).its("length").should("eq", 2);

        LinkFtiParametersModal.doneButton().click();

        // create added parameter as fti links
        cy.wait("@bulkPostLinkedFtiParameter")
            .its("request.body")
            .should(
                "deep.include",
                ...[testParameter1, testParameter2].map((testParameter) => ({
                    desirability: "ESSENTIAL",
                    instrumentationId: testParameter.id,
                }))
            );
    });
});
