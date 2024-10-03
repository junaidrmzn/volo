import { anyCrewRole } from "../../libs/test-fixtures/anyCrewRole";
import { CrewRoleOverview } from "../../src/crewRole/CrewRoleOverview";
import {
    deleteCrewRoleInterceptor,
    getAllCrewRolesInterceptor,
    getCrewRoleInterceptor,
    getCrewRoleWithEntriesInterceptor,
} from "../interceptors/crewRoleInterceptors";
import { CrewRoleOverviewPage } from "../page-objects/crew-role/crewRoleOverviewPageObject";
import { CrewRolePreviewPageFragment } from "../page-objects/crew-role/crewRolePreviewPageFragment";
import { DeleteCrewRoleModalPageFragment } from "../page-objects/crew-role/deleteCrewRoleModalPageFragment";
import { FilterBarCrewRoleFragment } from "../page-objects/crew-role/filterBarCrewRolePageFragment";

describe("CrewRoleOverview", () => {
    it("User can delete crew roles", () => {
        const crewRole = anyCrewRole();
        getAllCrewRolesInterceptor([crewRole]);
        getCrewRoleWithEntriesInterceptor(crewRole);
        cy.mount(<CrewRoleOverview />);

        getCrewRoleInterceptor(crewRole);

        CrewRoleOverviewPage.crewRoleCard("PIL").click();
        deleteCrewRoleInterceptor(crewRole.id);
        getAllCrewRolesInterceptor([]);
        CrewRolePreviewPageFragment.deleteButton().click();
        DeleteCrewRoleModalPageFragment.deleteButton().click();
        CrewRoleOverviewPage.noEntriesFoundHeading().should("be.visible");
    });

    // TODO: fix the sorting issue and enable the test again

    it.skip("User can sort the crew role list ", () => {
        const crewRolesList = [
            {
                roleKey: "MCH",
            },
            {
                roleKey: "PIL",
            },
            {
                roleKey: "ATT",
            },
        ].map((crewRole) => anyCrewRole(crewRole));
        getAllCrewRolesInterceptor(crewRolesList);
        cy.mount(<CrewRoleOverview />);

        FilterBarCrewRoleFragment.sorting({ sortingOption: "Role Key" });
        getAllCrewRolesInterceptor(
            crewRolesList.sort((item1, item2) => {
                if (item1.roleKey < item2.roleKey) return -1;
                return item1.roleKey > item2.roleKey ? 1 : 0;
            })
        );

        CrewRoleOverviewPage.crewRoleCard("ATT").should("be.visible");
    });

    it("User can filter crew role", () => {
        const crewRolesList = [
            {
                roleKey: "PIL",
                validFrom: "2022-01-03T00:00:00Z",
            },
            {
                roleKey: "MCH",
                validFrom: "2023-01-01T00:00:00Z",
            },
            {
                roleKey: "ATT",
                validFrom: "2020-01-01T00:00:00Z",
            },
        ].map((crewRole) => anyCrewRole(crewRole));
        getAllCrewRolesInterceptor(crewRolesList);
        cy.mount(<CrewRoleOverview />);
        getAllCrewRolesInterceptor(crewRolesList.slice(0, 1));
        FilterBarCrewRoleFragment.filter({
            validFromStart: "2022-01-01T00:00:00Z",
            validFromEnd: "2022-01-04T00:00:00Z",
        });
        CrewRoleOverviewPage.crewRoleCard("PIL").should("be.visible");
    });
});
