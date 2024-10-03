import { anyTestPointParameter } from "@voloiq/flight-test-definition-api/v1";
import { ParameterOverview } from "../../src/parameter-overview/ParameterOverview";
import {
    createParameterInterceptor,
    deleteParameterInterceptor,
    getAllParametersInterceptor,
    getParameterInterceptor,
    updateParameterInterceptor,
} from "../interceptors/parametersInterceptors";
import { AddParameterPage } from "../pages/add-parameter/addParameterFormPageObject";
import { EditParameterPage } from "../pages/edit-parameter/editParameterFormPageObject";
import { FilterBarParameterPageFragment } from "../pages/parameter-overview/FilterBarParameterPageFragment";
import { DeleteParameterModalPageFragment } from "../pages/parameter-overview/deleteParameterModalPageFragment";
import { ParameterOverviewPage } from "../pages/parameter-overview/parameterOverviewPageObject";
import { ParameterPreviewPageFragment } from "../pages/parameter-overview/parameterPreviewPageFragment";

describe("ParameterOverview", () => {
    it("User can add, edit, and delete a parameter", () => {
        const parameterInsert = {
            name: "Altitude",
            acronym: "α",
            unit: "m",
            isActive: true,
        };
        const parameter = anyTestPointParameter(parameterInsert);
        const parameterUpdate = { name: "Pressure Altitude" };
        const updatedParameter = { ...parameter, ...parameterUpdate };
        const inactiveParameter = { ...updatedParameter, isActive: false };

        getAllParametersInterceptor([]);
        createParameterInterceptor();
        updateParameterInterceptor();
        deleteParameterInterceptor();

        cy.mount(<ParameterOverview />);

        ParameterOverviewPage.addButton().click();

        getAllParametersInterceptor([parameter]);
        AddParameterPage.add(parameterInsert);

        getParameterInterceptor(parameter);
        ParameterOverviewPage.parameterCard("Altitude").click();

        ParameterPreviewPageFragment.editButton().click();

        getAllParametersInterceptor([updatedParameter]);
        getParameterInterceptor(updatedParameter);
        EditParameterPage.edit(parameterUpdate);
        ParameterOverviewPage.parameterCard("Pressure Altitude").should("be.visible");

        ParameterOverviewPage.parameterCard("Pressure Altitude").click();
        getAllParametersInterceptor([inactiveParameter]);
        getParameterInterceptor(inactiveParameter);
        ParameterPreviewPageFragment.setInactiveButton().click();
        ParameterOverviewPage.inactiveBadge().should("be.visible");
        ParameterOverviewPage.parameterCard("Pressure Altitude").within(() => {
            ParameterOverviewPage.inactiveBadge().should("be.visible");
        });

        getAllParametersInterceptor([]);
        ParameterPreviewPageFragment.deleteButton().click();
        DeleteParameterModalPageFragment.deleteButton().click();
        ParameterOverviewPage.noEntriesFoundHeading().should("be.visible");
    });

    it("User can filter parameter", () => {
        const parametersList = [
            {
                name: "Pressure Altitude",
            },
            {
                name: "Altitude 1",
            },
            {
                name: "Altitude 2",
            },
        ].map((parameter) => anyTestPointParameter(parameter));
        const parameterFilter = { name: "Pressure Altitude" };

        getAllParametersInterceptor(parametersList);

        cy.mount(<ParameterOverview />);

        getAllParametersInterceptor(parametersList.slice(0, 1));
        FilterBarParameterPageFragment.filter(parameterFilter);
        ParameterOverviewPage.parameterCard("Pressure Altitude").should("be.visible");
    });
});
