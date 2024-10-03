import { dateTimeInputStyles } from "@volocopter/date-time-input-react";
import { Box, ThemeProvider } from "@volocopter/design-library-react";
import { filterStyles } from "@volocopter/filter-react";
import { truncatedListStyles } from "@volocopter/truncated-list-react";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { DateTimeInputLocaleProvider } from "@voloiq/date-time-input";
import { LocalFeatureFlagsProvider } from "@voloiq/feature-flags";
import { I18nProvider } from "@voloiq/i18n";
import { FilterBarPageFragment } from "@voloiq/resource-overview-cypress-page-objects";
import { MemoryRouter, ParametersCacheProvider } from "@voloiq/routing";
import { ResourceOverview } from "../../../src/ResourceOverview";
import { anyPagination } from "../../../src/list/__tests__/anyListMachineConfig";
import { renderListItemWithId } from "../../../src/utils/renderListItemWithId";
import {
    anyFilterBarMachineConfig,
    anyFilterBarWithSortingConfigMachineConfig,
    booleanProperty,
    dateProperty,
    dateRangeProperty,
    nullableTextProperty,
    numberProperty,
    numberRangeProperty,
    selectMultipleProperty,
    selectProperty,
    textProperty,
} from "./anyFilterBarMachineConfig";

const Providers = (props: PropsWithChildren<{}>) => {
    const { children } = props;
    return (
        <ThemeProvider overrides={[dateTimeInputStyles, truncatedListStyles, filterStyles]}>
            <LocalFeatureFlagsProvider configurationOverride={{ "resource-overview-new-filter": { enabled: true } }}>
                <LocalAuthenticationProvider>
                    <I18nProvider>
                        <DateTimeInputLocaleProvider>
                            <ParametersCacheProvider>
                                <MemoryRouter>
                                    <Box height="100vh">{children}</Box>
                                </MemoryRouter>
                            </ParametersCacheProvider>
                        </DateTimeInputLocaleProvider>
                    </I18nProvider>
                </LocalAuthenticationProvider>
            </LocalFeatureFlagsProvider>
        </ThemeProvider>
    );
};

describe("ResourceOverview with Filter (ver2)", () => {
    it("applies filters to resource list", () => {
        const fetchAllResources = cy
            .stub()
            .as("fetchAllResources")
            .resolves({ data: [{ id: "1" }], pagination: anyPagination() });
        const testStateMachineConfig = anyFilterBarMachineConfig({ fetchAllResources });

        cy.mount(
            <Providers>
                <ResourceOverview machineConfig={testStateMachineConfig}>
                    <ResourceOverview.ListItem>{renderListItemWithId}</ResourceOverview.ListItem>
                </ResourceOverview>
            </Providers>
        );
        FilterBarPageFragment.expandFilterBar();

        FilterBarPageFragment.setNumberValue(numberProperty, 42);

        FilterBarPageFragment.setNumberRangeMinValue(numberRangeProperty, 3);
        FilterBarPageFragment.setNumberRangeMaxValue(numberRangeProperty, 7);

        FilterBarPageFragment.setTextValue(textProperty, "Beautiful");

        FilterBarPageFragment.setSelectValue(selectProperty, "Amelia Earhart");
        FilterBarPageFragment.setSelectMultipleValues(selectMultipleProperty, ["Emmanuel Macron", "Olaf Scholz"]);
        FilterBarPageFragment.setBooleanValue(booleanProperty, "serviceable");

        FilterBarPageFragment.setDateValue(dateProperty, new Date("2023-07-04"));

        FilterBarPageFragment.setDateRangeMinValue(dateRangeProperty, new Date("2023-07-05"));
        FilterBarPageFragment.setDateRangeMaxValue(dateRangeProperty, new Date("2023-07-06"));

        FilterBarPageFragment.setNullCheckbox(nullableTextProperty);

        FilterBarPageFragment.applyFilters();

        cy.findByText(numberRangeProperty.label).should("be.visible");
        cy.get("@fetchAllResources").should("be.calledTwice");
        cy.get("@fetchAllResources").should(
            "be.calledWith",
            Cypress.sinon.match({
                filterSet: {
                    filters: [
                        Cypress.sinon.match({
                            type: "number",
                            displayName: "Passenger Weight",
                            propertyName: "passengerWeight",
                            value: 42,
                            isActive: true,
                        }),
                        Cypress.sinon.match({
                            type: "numberRange",
                            displayName: "Flight Duration",
                            propertyName: "flightDuration",
                            fromValue: "3",
                            toValue: "7",
                            isActive: true,
                        }),
                        Cypress.sinon.match({
                            type: "text",
                            displayName: "Description",
                            propertyName: "description",
                            value: "Beautiful",
                            isActive: true,
                        }),
                        Cypress.sinon.match({
                            type: "select",
                            displayName: "Pilot",
                            propertyName: "pilot",
                            value: { value: "ameliaEarhart", label: "Amelia Earhart" },
                            isActive: true,
                        }),
                        Cypress.sinon.match({
                            type: "multiSelect",
                            displayName: "Passengers",
                            propertyName: "passengers",
                            values: [
                                { value: "emmanuelMacron", label: "Emmanuel Macron" },
                                { value: "olafScholz", label: "Olaf Scholz" },
                            ],
                            isActive: true,
                        }),
                        Cypress.sinon.match({
                            type: "boolean",
                            displayName: "Serviceability",
                            propertyName: "serviceability",
                            value: true,
                            isActive: true,
                        }),
                        Cypress.sinon.match({
                            type: "range",
                            displayName: "Date Created",
                            propertyName: "created",
                            fromDate: "2023-07-04T12:00:00.000Z",
                            toDate: "2023-07-04T12:00:00.000Z",
                            isActive: true,
                        }),
                        Cypress.sinon.match({
                            type: "range",
                            displayName: "Date Modified",
                            propertyName: "modified",
                            fromDate: "2023-07-05T12:00:00.000Z",
                            toDate: "2023-07-06T12:00:00.000Z",
                            isActive: true,
                        }),
                        Cypress.sinon.match({
                            type: "text",
                            displayName: "LEON ID",
                            propertyName: "leonId",
                            isActive: true,
                            isNull: true,
                        }),
                    ],
                },
            })
        );
    });

    it("applies filters with sorting config to resource list", () => {
        const fetchAllResources = cy
            .stub()
            .as("fetchAllResources")
            .resolves({ data: [{ id: "1" }], pagination: anyPagination() });
        const testStateMachineConfig = anyFilterBarWithSortingConfigMachineConfig({ fetchAllResources });

        cy.mount(
            <Providers>
                <ResourceOverview machineConfig={testStateMachineConfig}>
                    <ResourceOverview.ListItem>{renderListItemWithId}</ResourceOverview.ListItem>
                </ResourceOverview>
            </Providers>
        );
        FilterBarPageFragment.expandFilterBar();

        FilterBarPageFragment.setNumberValue(numberProperty, 42);

        FilterBarPageFragment.setNumberRangeMinValue(numberRangeProperty, 3);
        FilterBarPageFragment.setNumberRangeMaxValue(numberRangeProperty, 7);

        FilterBarPageFragment.setTextValue(textProperty, "Beautiful");

        FilterBarPageFragment.setSelectValue(selectProperty, "Amelia Earhart");
        FilterBarPageFragment.setSelectMultipleValues(selectMultipleProperty, ["Emmanuel Macron", "Olaf Scholz"]);
        FilterBarPageFragment.setBooleanValue(booleanProperty, "serviceable");

        FilterBarPageFragment.setDateValue(dateProperty, new Date("2023-07-04"));

        FilterBarPageFragment.setDateRangeMinValue(dateRangeProperty, new Date("2023-07-05"));
        FilterBarPageFragment.setDateRangeMaxValue(dateRangeProperty, new Date("2023-07-06"));

        FilterBarPageFragment.setNullCheckbox(nullableTextProperty);

        FilterBarPageFragment.setSortingValue("Created By");

        FilterBarPageFragment.applyFilters();

        cy.findByText(numberRangeProperty.label).should("be.visible");
        cy.get("@fetchAllResources").should("be.calledTwice");
        cy.get("@fetchAllResources").should(
            "be.calledWith",
            Cypress.sinon.match({
                filterSet: {
                    filters: [
                        Cypress.sinon.match({
                            type: "number",
                            displayName: "Passenger Weight",
                            propertyName: "passengerWeight",
                            value: 42,
                            isActive: true,
                        }),
                        Cypress.sinon.match({
                            type: "numberRange",
                            displayName: "Flight Duration",
                            propertyName: "flightDuration",
                            fromValue: "3",
                            toValue: "7",
                            isActive: true,
                        }),
                        Cypress.sinon.match({
                            type: "text",
                            displayName: "Description",
                            propertyName: "description",
                            value: "Beautiful",
                            isActive: true,
                        }),
                        Cypress.sinon.match({
                            type: "select",
                            displayName: "Pilot",
                            propertyName: "pilot",
                            value: { value: "ameliaEarhart", label: "Amelia Earhart" },
                            isActive: true,
                        }),
                        Cypress.sinon.match({
                            type: "multiSelect",
                            displayName: "Passengers",
                            propertyName: "passengers",
                            values: [
                                { value: "emmanuelMacron", label: "Emmanuel Macron" },
                                { value: "olafScholz", label: "Olaf Scholz" },
                            ],
                            isActive: true,
                        }),
                        Cypress.sinon.match({
                            type: "boolean",
                            displayName: "Serviceability",
                            propertyName: "serviceability",
                            value: true,
                            isActive: true,
                        }),
                        Cypress.sinon.match({
                            type: "range",
                            displayName: "Date Created",
                            propertyName: "created",
                            fromDate: "2023-07-04T12:00:00.000Z",
                            toDate: "2023-07-04T12:00:00.000Z",
                            isActive: true,
                        }),
                        Cypress.sinon.match({
                            type: "range",
                            displayName: "Date Modified",
                            propertyName: "modified",
                            fromDate: "2023-07-05T12:00:00.000Z",
                            toDate: "2023-07-06T12:00:00.000Z",
                            isActive: true,
                        }),
                        Cypress.sinon.match({
                            type: "text",
                            displayName: "LEON ID",
                            propertyName: "leonId",
                            isActive: true,
                            isNull: true,
                        }),
                    ],
                },
                sortingConfiguration: {
                    selectedOption: "createdBy",
                    selectedOrder: "ASC",
                },
            })
        );
    });

    it("does not display the filter without the canRead permission", () => {
        const testStateMachineConfig = anyFilterBarMachineConfig(undefined, undefined, {
            canRead: false,
        });

        cy.mount(
            <Providers>
                <ResourceOverview machineConfig={testStateMachineConfig}>
                    <ResourceOverview.ListItem>{renderListItemWithId}</ResourceOverview.ListItem>
                </ResourceOverview>
            </Providers>
        );

        cy.findByText("You do not have permission to access the requested page").should("be.visible");
    });

    it("restores filters from local storage", () => {
        window.localStorage.setItem(
            "Resource",
            JSON.stringify({
                "numberRange-flightDurationRangeFrom": JSON.stringify({ value: "3", comparisonOperator: "between" }),
            })
        );

        const fetchAllResources = cy
            .stub()
            .as("fetchAllResources")
            .resolves({ data: [{ id: "1" }], pagination: anyPagination() });
        const testStateMachineConfig = anyFilterBarMachineConfig({ fetchAllResources });

        cy.mount(
            <Providers>
                <ResourceOverview machineConfig={testStateMachineConfig}>
                    <ResourceOverview.ListItem>{renderListItemWithId}</ResourceOverview.ListItem>
                </ResourceOverview>
            </Providers>
        );

        cy.findByText(numberRangeProperty.label).should("be.visible");
        cy.get("@fetchAllResources").should("be.calledOnce");

        cy.get("@fetchAllResources").should(
            "be.calledWith",
            Cypress.sinon.match({
                filterSet: {
                    filters: [
                        Cypress.sinon.match({
                            type: "numberRange",
                            displayName: "Flight Duration",
                            propertyName: "flightDuration",
                            fromValue: "3",
                            isActive: true,
                        }),
                    ],
                },
            })
        );
    });

    it("restores filters and sorting from local storage", () => {
        window.localStorage.setItem(
            "Resource",
            JSON.stringify({
                "numberRange-flightDurationRangeFrom": JSON.stringify({ value: "3", comparisonOperator: "between" }),
                orderBy: JSON.stringify({ value: "createdBy", comparisonOperator: "asc" }),
            })
        );

        const fetchAllResources = cy
            .stub()
            .as("fetchAllResources")
            .resolves({ data: [{ id: "1" }], pagination: anyPagination() });
        const testStateMachineConfig = anyFilterBarWithSortingConfigMachineConfig({ fetchAllResources });

        cy.mount(
            <Providers>
                <ResourceOverview machineConfig={testStateMachineConfig}>
                    <ResourceOverview.ListItem>{renderListItemWithId}</ResourceOverview.ListItem>
                </ResourceOverview>
            </Providers>
        );

        cy.findByText(numberRangeProperty.label).should("be.visible");
        cy.get("@fetchAllResources").should("be.calledOnce");

        cy.get("@fetchAllResources").should(
            "be.calledWith",
            Cypress.sinon.match({
                filterSet: {
                    filters: [
                        Cypress.sinon.match({
                            type: "numberRange",
                            displayName: "Flight Duration",
                            propertyName: "flightDuration",
                            fromValue: "3",
                            isActive: true,
                        }),
                    ],
                },
                sortingConfiguration: {
                    selectedOption: "createdBy",
                    selectedOrder: "ASC",
                },
            })
        );
    });
});
