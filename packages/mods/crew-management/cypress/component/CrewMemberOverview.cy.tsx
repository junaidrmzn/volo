import { anyAircraftType } from "../../libs/test-fixtures/anyAircraftType";
import {
    anyCrewMember,
    anyCrewMemberInsert,
    anyCrewMemberWithAssignment,
} from "../../libs/test-fixtures/anyCrewMember";
import { anyCrewMembersBlockingTimes } from "../../libs/test-fixtures/anyCrewMembersBlockingTimes";
import { anyCrewRole } from "../../libs/test-fixtures/anyCrewRole";
import { anyRegion } from "../../libs/test-fixtures/anyRegion";
import { CrewMemberOverview } from "../../src/crewMember/CrewMemberOverview";
import {
    getAllCrewMembersBlockingTimesInterceptor,
    getCrewMemberBlockingTimesInterceptor,
} from "../interceptors/crewCalendarInterceptors";
import {
    aircraftTypesListWithEntriesInterceptor,
    bulkEditCrewMembersInterceptors,
    createCrewMemberInterceptor,
    deleteCrewMemberInterceptor,
    getAllCrewMembersInterceptor,
    getCrewMemberInterceptor,
    getCrewMemberWithAssignmentsInterceptor,
    regionsListWithEntriesInterceptor,
    updateCrewMemberInterceptor,
    updateCrewMemberWithAssignmentsInterceptor,
} from "../interceptors/crewMemberInterceptors";
import { getAllCrewRolesInterceptor } from "../interceptors/crewRoleInterceptors";
import { CrewMemberAddPage } from "../page-objects/crew-member/crewMemberAddPageObject";
import { crewMemberBulkEdit } from "../page-objects/crew-member/crewMemberBulkEditPageObject";
import { CrewMemberDetailPage } from "../page-objects/crew-member/crewMemberDetailPageObject";
import { CrewMemberEditPage } from "../page-objects/crew-member/crewMemberEditPageObject";
import { CrewMemberOverviewPage } from "../page-objects/crew-member/crewMemberOverviewPageObject";
import { CrewMemberPreviewPageFragment } from "../page-objects/crew-member/crewMemberPreviewPageFragment";
import { DeleteCrewMemberModalPageFragment } from "../page-objects/crew-member/deleteMemberRoleModalPageFragment";
import { FilterBarCrewMemberPageFragment } from "../page-objects/crew-member/filterBarCrewMemberPageFragment";
import { Select } from "../page-objects/select";

describe("CrewMemberOverview", () => {
    beforeEach(() => {
        getAllCrewMembersBlockingTimesInterceptor([]);
        getCrewMemberBlockingTimesInterceptor([]);
        updateCrewMemberInterceptor();
        updateCrewMemberWithAssignmentsInterceptor();
        aircraftTypesListWithEntriesInterceptor([]);
        getCrewMemberWithAssignmentsInterceptor(anyCrewMemberWithAssignment({ hrId: undefined }));
    });

    it("User can delete crew members", () => {
        const crewRole = anyCrewRole();
        getAllCrewRolesInterceptor([crewRole]);
        const region = anyRegion({
            name: "iloveorange",
        });
        regionsListWithEntriesInterceptor([region]);
        const crewMember = anyCrewMember();
        getAllCrewMembersInterceptor([crewMember]);
        getCrewMemberInterceptor(crewMember);
        cy.mount(<CrewMemberOverview />);
        CrewMemberOverviewPage.crewMemberCard("2679f481-1517-4df6-a8e9-debe126fb5a0").click();

        deleteCrewMemberInterceptor();
        getAllCrewMembersInterceptor([]);
        CrewMemberPreviewPageFragment.deleteButton().click();
        DeleteCrewMemberModalPageFragment.deleteButton().click();
        CrewMemberOverviewPage.noEntriesFoundHeading().should("be.visible");
    });

    it("User cannot add an invalid weight in crew member", () => {
        const crewRole = anyCrewRole();
        getAllCrewRolesInterceptor([crewRole]);
        const region = anyRegion({
            name: "iloveorange",
        });
        regionsListWithEntriesInterceptor([region]);
        getAllCrewMembersInterceptor([]);
        cy.mount(<CrewMemberOverview />);
        CrewMemberOverviewPage.addButton().click();
        const crewMemberInsert = anyCrewMemberInsert({ weight: 400, homeBase: "iloveorange" });
        CrewMemberAddPage.add(crewMemberInsert);
        createCrewMemberInterceptor();
        CrewMemberAddPage.saveButton().click();
        CrewMemberAddPage.valueMustBelow200ErrorText().should("be.visible");
    });

    it("User can sort the crew member list ", () => {
        const crewRole = anyCrewRole();
        getAllCrewRolesInterceptor([crewRole]);
        const region = anyRegion({
            name: "iloveorange",
        });
        regionsListWithEntriesInterceptor([region]);
        const crewMemberList = [
            {
                id: "2679f481-1517-4df6-a8e9-debe126fb5a0",
                firstName: "Simon",
                surName: "Bayer",
                homeBase: "2679f481-1517-4df6-a8e9-debe126fb5a0",
            },
            {
                id: "3679f481-1517-4df6-a8e9-debe126fb5a0",
                firstName: "Bayer",
                surName: "Symon",
                homeBase: "3679f481-1517-4df6-a8e9-debe126fb5a0",
            },
            {
                id: "4679f481-1517-4df6-a8e9-debe126fb5a0",
                firstName: "Z Simon",
                surName: "Z Bayer",
                homeBase: "4679f481-1517-4df6-a8e9-debe126fb5a0",
            },
        ].map((crewMember) => anyCrewMember(crewMember));
        getAllCrewMembersInterceptor(crewMemberList);
        cy.mount(<CrewMemberOverview />);

        FilterBarCrewMemberPageFragment.sorting({ sortingOption: "Last name" });
        getAllCrewMembersInterceptor(
            crewMemberList.sort((item1, item2) => {
                if (item1.surName && item2.surName && item1.surName > item2.surName) return -1;
                return item1.surName && item2.surName && item1.surName < item2.surName ? 1 : 0;
            })
        );
        CrewMemberOverviewPage.crewMemberCard("2679f481-1517-4df6-a8e9-debe126fb5a0").should("be.visible");
        FilterBarCrewMemberPageFragment.sorting({ sortingOption: "Last name", comparisonOperatorLabel: "Descending" });
        getAllCrewMembersInterceptor(
            crewMemberList.sort((item1, item2) => {
                if (item1.surName && item2.surName && item1.surName < item2.surName) return -1;
                return item1.surName && item2.surName && item1.surName > item2.surName ? 1 : 0;
            })
        );
        CrewMemberOverviewPage.crewMemberCard("4679f481-1517-4df6-a8e9-debe126fb5a0").should("be.visible");
    });

    it("User can filter crew member", () => {
        const crewRole = anyCrewRole();
        getAllCrewRolesInterceptor([crewRole]);
        const region = anyRegion({
            name: "iloveorange",
        });
        regionsListWithEntriesInterceptor([region]);
        const crewMembersList = [
            {
                id: "2679f481-1517-4df6-a8e9-debe126fb5a0",
                firstName: "Simon",
            },
            {
                id: "3679f481-1517-4df6-a8e9-debe126fb5a0",
                firstName: "Bayer",
            },
            {
                id: "4679f481-1517-4df6-a8e9-debe126fb5a0",
                firstName: "Z Simon",
            },
        ].map((crewMember) => anyCrewMember(crewMember));
        getAllCrewMembersInterceptor(crewMembersList);
        cy.mount(<CrewMemberOverview />);
        getAllCrewMembersInterceptor(crewMembersList.slice(0, 1));
        FilterBarCrewMemberPageFragment.filter({ firstName: "Simon" });
        CrewMemberOverviewPage.crewMemberCard("2679f481-1517-4df6-a8e9-debe126fb5a0").should("be.visible");
    });

    it("User can visit all crew member tabs", () => {
        const crewRole = anyCrewRole();
        getAllCrewRolesInterceptor([crewRole]);
        const region = anyRegion({
            name: "iloveorange",
        });
        regionsListWithEntriesInterceptor([region]);
        const crewMember = anyCrewMember();
        getAllCrewMembersInterceptor([crewMember]);
        getCrewMemberInterceptor(crewMember);
        const aircraftType = anyAircraftType();
        aircraftTypesListWithEntriesInterceptor([aircraftType]);
        cy.mount(<CrewMemberOverview />);

        CrewMemberOverviewPage.crewMemberCard("2679f481-1517-4df6-a8e9-debe126fb5a0").click();
        CrewMemberPreviewPageFragment.detailsButton().click();
        CrewMemberDetailPage.generalTab().click();
        CrewMemberDetailPage.rolesTab().click();
        CrewMemberDetailPage.otherTab().click();
        CrewMemberDetailPage.returnToListButton().click();
    });

    it("User can see time scheduler row label in crew member detail", () => {
        const crewRole = anyCrewRole();
        getAllCrewRolesInterceptor([crewRole]);
        const region = anyRegion({
            name: "iloveorange",
        });
        regionsListWithEntriesInterceptor([region]);
        const crewMember = anyCrewMember();
        getAllCrewMembersInterceptor([crewMember]);
        getCrewMemberInterceptor(crewMember);
        const aircraftType = anyAircraftType();
        aircraftTypesListWithEntriesInterceptor([aircraftType]);
        cy.mount(<CrewMemberOverview />);

        CrewMemberOverviewPage.crewMemberCard("2679f481-1517-4df6-a8e9-debe126fb5a0").click();
        CrewMemberPreviewPageFragment.detailsButton().click();
        CrewMemberDetailPage.generalTab().click();
        CrewMemberDetailPage.rolesTab().click();
        const crewMemberBlockingTimes = anyCrewMembersBlockingTimes({ surname: "Simon" });
        getAllCrewMembersBlockingTimesInterceptor([crewMemberBlockingTimes]);
        if (crewMember.homebaseName) {
            cy.contains(crewMember.homebaseName).should("be.visible");
        }
        if (crewMember.surName) {
            cy.findByLabelText(crewMember.surName).should("be.visible");
        }
    });

    it("User can edit crew member from detail page", () => {
        const crewRole = anyCrewRole();
        getAllCrewRolesInterceptor([crewRole]);
        const region = anyRegion({
            name: "iloveorange",
        });
        regionsListWithEntriesInterceptor([region]);
        const crewMember = anyCrewMember({ hrId: undefined });

        const crewMemberWithAssignment = anyCrewMemberWithAssignment({ hrId: undefined });
        getCrewMemberBlockingTimesInterceptor(crewMemberWithAssignment);
        getAllCrewMembersInterceptor([crewMember]);
        getCrewMemberInterceptor(crewMember);
        getCrewMemberWithAssignmentsInterceptor(crewMemberWithAssignment);
        const aircraftType = anyAircraftType();
        aircraftTypesListWithEntriesInterceptor([aircraftType]);
        updateCrewMemberWithAssignmentsInterceptor(crewMemberWithAssignment);
        cy.mount(<CrewMemberOverview />);

        CrewMemberOverviewPage.crewMemberCard("2679f481-1517-4df6-a8e9-debe126fb5a0").click();
        CrewMemberPreviewPageFragment.detailsButton().click();
        updateCrewMemberInterceptor();
        CrewMemberDetailPage.editButton().click();
        const updatedCrewMemeber = anyCrewMemberInsert({ homeBase: "iloveorange" });
        CrewMemberEditPage.edit(updatedCrewMemeber);
    });

    it("should not display bulk edit button when no filters are applied", () => {
        const crewRole = anyCrewRole();
        getAllCrewRolesInterceptor([crewRole]);
        const region = anyRegion({
            name: "iloveorange",
        });
        regionsListWithEntriesInterceptor([region]);
        const crewMembersList = [
            {
                id: "2679f481-1517-4df6-a8e9-debe126fb5a0",
                firstName: "Ahmad",
            },
            {
                id: "4679f481-1517-4df6-a8e9-debe126fb5a0",
                firstName: "Ahmad C",
            },
        ].map((crewMember) => anyCrewMember(crewMember));
        getAllCrewMembersInterceptor(crewMembersList);
        cy.mount(<CrewMemberOverview />);
        getAllCrewMembersInterceptor(crewMembersList.slice(0, 1));

        crewMemberBulkEdit.bulkEditButton().should("not.exist");
    });

    it("renders bulk edit modal and select edit properties", () => {
        const date = "2024-01-01 12:00";

        const crewRole = anyCrewRole();
        getAllCrewRolesInterceptor([crewRole]);
        const region = anyRegion({
            name: "iloveorange",
        });
        regionsListWithEntriesInterceptor([region]);
        const crewMembersList = [
            {
                id: "2679f481-1517-4df6-a8e9-debe126fb5a0",
                firstName: "Ahmad",
            },
            {
                id: "4679f481-1517-4df6-a8e9-debe126fb5a0",
                firstName: "Ahmad C",
            },
        ].map((crewMember) => anyCrewMember(crewMember));
        getAllCrewMembersInterceptor(crewMembersList);
        cy.mount(<CrewMemberOverview />);

        FilterBarCrewMemberPageFragment.filter({ firstName: "Simon" });

        crewMemberBulkEdit.bulkEditButton().click({ force: true });

        crewMemberBulkEdit.selectLabelText("Bulk Edit - Crew Members").should("be.visible");
        crewMemberBulkEdit.selectLabelText("Edit Properties").should("be.checked");
        crewMemberBulkEdit.selectLabelText("Archive").should("not.be.checked");

        Select.selectByOptionName("Property:", "Valid from", false);
        crewMemberBulkEdit.selectLabelText("Change to:").click({ force: true });
        crewMemberBulkEdit.selectDate(new Date(date));
        crewMemberBulkEdit.doneButton().click();

        crewMemberBulkEdit.selectLabelText("Confirm - Multi Edit").should("be.visible");
        crewMemberBulkEdit.selectAllText("Valid from").should("be.visible");
        crewMemberBulkEdit.selectText("to").should("be.visible");
        crewMemberBulkEdit.selectAllText(date).should("be.visible");
        crewMemberBulkEdit.selectText("Are you sure? You can’t undo this action afterwards.").should("be.visible");

        bulkEditCrewMembersInterceptors(crewMembersList);
        crewMemberBulkEdit.confirmButton().click();
        cy.get("@bulkEditCrewMembersInterceptors");

        crewMemberBulkEdit.selectLabelText("Confirm - Multi Edit").should("not.exist");
        crewMemberBulkEdit.selectLabelText("Bulk Edit - Crew Members").should("not.exist");
    });
});
