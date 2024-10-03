import { anyDefinition, anyDefinitionByGroup } from "@voloiq/flight-test-definition-api/v2";
import { DefinitionOverview } from "../../src/definition-overview/DefinitionOverview";
import { getAllDefinitionsByAtaInterceptor } from "../interceptors/definitionsInterceptors";
import { addDefinitionInterceptorV2 } from "../interceptors/v2/definitionsInterceptors";
import { DefinitionOverviewPage } from "../pages/definition-overview/definitionOverviewPageObject";
import { DefinitionCardPageFragment } from "../pages/definition-overview/page-fragments/definitionCardPageFragment";
import { FilterBarDefinitionPageFragment } from "../pages/definition-overview/page-fragments/filterBarDefinitionPageFragment";
import { DefinitionSteps } from "../steps/definitionStepObject";

describe("DefinitionOverview", () => {
    it("User can add a definition", () => {
        const definitionInsert = {
            title: "FCS Commission flight Integration",
        };
        const definition = anyDefinition(definitionInsert);
        const definitionByGroup = anyDefinitionByGroup({ value: [definitionInsert] });

        getAllDefinitionsByAtaInterceptor([]);
        addDefinitionInterceptorV2();

        cy.mount(<DefinitionOverview />);

        DefinitionOverviewPage.addButton().click();
        getAllDefinitionsByAtaInterceptor([definitionByGroup]);
        DefinitionSteps.addDefinition(definition);
        DefinitionCardPageFragment.accordionButton().click();
        DefinitionOverviewPage.definitionCard(`FTD ${definition.ftdId}`).should("be.visible");
    });

    it("User can filter definitions", () => {
        const definitionList = [
            {
                title: "FCS Commission flight Integration off",
                ftdId: "FTD-V21-27-041-A11",
            },
            {
                title: "FCS Commission flight Integration",
            },
        ].map((definition) => anyDefinitionByGroup({ value: [definition] }));
        getAllDefinitionsByAtaInterceptor(definitionList);

        cy.mount(<DefinitionOverview />);

        getAllDefinitionsByAtaInterceptor(definitionList.slice(0, 1));
        const definitionFilter = { title: "FCS Commission flight Integration off" };
        FilterBarDefinitionPageFragment.filter(definitionFilter);
        DefinitionCardPageFragment.accordionButton().click();
        DefinitionOverviewPage.definitionCard("FTD FTD-V21-27-041-A11").should("be.visible");
    });
});
