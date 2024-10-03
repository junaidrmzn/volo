import { dateTimeInputStyles } from "@volocopter/date-time-input-react";
import { Box, ThemeProvider } from "@volocopter/design-library-react";
import { filterStyles } from "@volocopter/filter-react";
import { truncatedListStyles } from "@volocopter/truncated-list-react";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { DateTimeInputLocaleProvider } from "@voloiq/date-time-input";
import { LocalFeatureFlagsProvider } from "@voloiq/feature-flags";
import { I18nProvider } from "@voloiq/i18n";
import { MemoryRouter, ParametersCacheProvider } from "@voloiq/routing";
import { ResourceOverview } from "../../../src/ResourceOverview";
import filterTranslations from "../../../src/filter-bar/translations/resourceFilter.en.translations.json";
import { anyPagination } from "../../../src/list/__tests__/anyListMachineConfig";
import { renderListItemWithId } from "../../../src/utils/renderListItemWithId";
import {
    ameliaEarhart,
    anyFilterMachineConfig,
    filterMachineConfigWithAsyncOptions,
    flightDurationFilter,
} from "./anyFilterMachineConfig";

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
        const testStateMachineConfig = anyFilterMachineConfig({ fetchAllResources });

        cy.mount(
            <Providers>
                <ResourceOverview machineConfig={testStateMachineConfig}>
                    <ResourceOverview.ListItem>{renderListItemWithId}</ResourceOverview.ListItem>
                </ResourceOverview>
            </Providers>
        );
        cy.findByText(filterTranslations.inputPlaceholder).click();
        cy.findByText(flightDurationFilter.displayName).click();

        cy.findByRole("spinbutton", { name: flightDurationFilter.fromLabel }).type("3");

        cy.findByText(filterTranslations.apply).click();

        cy.findByText(filterTranslations.inputPlaceholder).should("not.exist");
        cy.findByText(flightDurationFilter.displayName).should("be.visible");
        cy.get("@fetchAllResources").should("be.calledTwice");
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

    it("does not display the filter without the canRead permission", () => {
        const testStateMachineConfig = anyFilterMachineConfig(undefined, undefined, {
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
            JSON.stringify({ "numberRange-flightDurationRangeFrom": JSON.stringify({ value: "3" }) })
        );

        const fetchAllResources = cy
            .stub()
            .as("fetchAllResources")
            .resolves({ data: [{ id: "1" }], pagination: anyPagination() });
        const testStateMachineConfig = anyFilterMachineConfig({ fetchAllResources });

        cy.mount(
            <Providers>
                <ResourceOverview machineConfig={testStateMachineConfig}>
                    <ResourceOverview.ListItem>{renderListItemWithId}</ResourceOverview.ListItem>
                </ResourceOverview>
            </Providers>
        );

        cy.findByText(flightDurationFilter.displayName).should("be.visible");
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

    it("applies filter labels from async sources", () => {
        window.localStorage.setItem(
            "Resource",
            JSON.stringify({ "multiSelect-pilot": JSON.stringify({ value: "1" }) })
        );

        const fetchAllResources = cy
            .stub()
            .as("fetchAllResources")
            .resolves({ data: [{ id: "1" }], pagination: anyPagination() });
        const testStateMachineConfig = filterMachineConfigWithAsyncOptions({ fetchAllResources });

        cy.mount(
            <Providers>
                <ResourceOverview machineConfig={testStateMachineConfig}>
                    <ResourceOverview.ListItem>{renderListItemWithId}</ResourceOverview.ListItem>
                </ResourceOverview>
            </Providers>
        );
        cy.findByText(ameliaEarhart.label).should("be.visible");

        cy.get("@fetchAllResources").should("be.calledOnce");
        cy.get("@fetchAllResources").should(
            "be.calledWith",
            Cypress.sinon.match({
                filterSet: {
                    filters: [
                        Cypress.sinon.match({
                            type: "multiSelect",
                            displayName: "Pilot",
                            propertyName: "pilot",
                            isActive: true,
                        }),
                    ],
                },
            })
        );
    });
});
