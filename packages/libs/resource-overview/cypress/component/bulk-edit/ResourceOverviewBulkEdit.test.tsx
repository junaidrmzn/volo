import { dateTimeInputStyles } from "@volocopter/date-time-input-react";
import { Box, ThemeProvider } from "@volocopter/design-library-react";
import { filterStyles } from "@volocopter/filter-react";
import { truncatedListStyles } from "@volocopter/truncated-list-react";
import { format } from "date-fns";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { DateTimeInputLocaleProvider } from "@voloiq/date-time-input";
import { LocalFeatureFlagsProvider } from "@voloiq/feature-flags";
import { I18nProvider } from "@voloiq/i18n";
import { FilterBarPageFragment } from "@voloiq/resource-overview-cypress-page-objects";
import { MemoryRouter, ParametersCacheProvider } from "@voloiq/routing";
import { ResourceOverview } from "../../../src/ResourceOverview";
import { BulkEditForm } from "../../../src/bulk-edit";
import { anyPagination } from "../../../src/list/__tests__/anyListMachineConfig";
import { BaseResource } from "../../../src/state-machine/BaseResource";
import { renderListItemWithId } from "../../../src/utils/renderListItemWithId";
import { BulkEdit, Buttons, DateTimePicker, Select } from "../../page-objects";
import { booleanProperty } from "../filter-bar/anyFilterBarMachineConfig";
import { TestResource, anyBulkEditMachineConfig } from "./anyBulkEditMachineConfig";

const Providers = (props: PropsWithChildren<{}>) => {
    const { children } = props;
    return (
        <ThemeProvider overrides={[dateTimeInputStyles, truncatedListStyles, filterStyles]}>
            <LocalFeatureFlagsProvider configurationOverride={{ "vao-1907-bulk-edit": { enabled: true } }}>
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

const testResource: TestResource = {
    id: "testID",
};

describe("ResourceOverview with bulk edit", () => {
    beforeEach(() => {
        const fetchAllResources = cy
            .stub()
            .as("fetchAllResources")
            .resolves({ data: [testResource], pagination: anyPagination() });
        const pageSize = 1;
        const testStateMachineConfig = anyBulkEditMachineConfig({ fetchAllResources, pageSize }, {}, {});

        cy.mount(
            <Providers>
                <ResourceOverview machineConfig={testStateMachineConfig}>
                    <ResourceOverview.ListItem>{renderListItemWithId}</ResourceOverview.ListItem>
                    <ResourceOverview.Preview>
                        {(resource: BaseResource) => `Preview ${resource.id}`}
                    </ResourceOverview.Preview>
                    <ResourceOverview.BulkEdit>{BulkEditForm}</ResourceOverview.BulkEdit>
                </ResourceOverview>
            </Providers>
        );
    });

    it("should not display bulk edit button when no filters are applied", () => {
        Buttons.bulkEdit().should("not.exist");
    });

    // TODO: skipping this test until we find a way to close preview tab on successful submit
    it.skip("should close preview tab on successful submit", () => {
        const date = "2024-01-01 12:00";

        FilterBarPageFragment.expandFilterBar();

        FilterBarPageFragment.setBooleanValue(booleanProperty, "serviceable");

        FilterBarPageFragment.applyFilters();

        cy.findByText("ListItem testID").click();
        cy.findByText("Any Preview Title").should("be.visible");

        Buttons.bulkEdit().click();

        BulkEdit.modalHeadingLabel().should("be.visible");
        BulkEdit.editPropertiesLabel().should("be.checked");
        BulkEdit.archiveLabel().should("not.be.checked");

        Select.selectByOptionName("Property:", "Valid From");
        BulkEdit.changeToLabel().click();
        DateTimePicker.selectDate(new Date(date));
        Buttons.done().click();

        BulkEdit.confirmModalHeading().should("be.visible");

        cy.findAllByText(/valid from/i).should("be.visible");
        cy.findByText("to").should("be.visible");
        cy.findAllByText(date).should("be.visible");

        cy.findByText("Are you sure? You can’t undo this action afterwards.").should("be.visible");
        Buttons.confirm().click();

        BulkEdit.confirmModalHeading().should("not.exist");
        BulkEdit.modalHeadingLabel().should("not.exist");

        cy.findByText("Any Preview Title").should("not.exist");
    });

    it("renders bulk edit modal and select edit properties", () => {
        const date = "2024-01-01 12:00";

        FilterBarPageFragment.expandFilterBar();

        FilterBarPageFragment.setBooleanValue(booleanProperty, "serviceable");

        FilterBarPageFragment.applyFilters();

        Buttons.bulkEdit().click();

        BulkEdit.modalHeadingLabel().should("be.visible");
        BulkEdit.editPropertiesLabel().should("be.checked");
        BulkEdit.archiveLabel().should("not.be.checked");

        Select.selectByOptionName("Property:", "Valid From");
        BulkEdit.changeToLabel().click();
        DateTimePicker.selectDate(new Date(date));
        Buttons.done().click();

        BulkEdit.confirmModalHeading().should("be.visible");

        cy.findAllByText(/valid from/i).should("be.visible");
        cy.findByText("to").should("be.visible");
        cy.findAllByText(date).should("be.visible");

        cy.findByText("Are you sure? You can’t undo this action afterwards.").should("be.visible");
        Buttons.confirm().click();

        BulkEdit.confirmModalHeading().should("not.exist");
        BulkEdit.modalHeadingLabel().should("not.exist");
    });

    it("renders bulk edit modal and select archive", () => {
        const date = format(new Date(), "yyyy-LL-dd HH:mm");

        FilterBarPageFragment.expandFilterBar();

        FilterBarPageFragment.setBooleanValue(booleanProperty, "serviceable");

        FilterBarPageFragment.applyFilters();

        Buttons.bulkEdit().click();

        BulkEdit.modalHeadingLabel().should("be.visible");

        BulkEdit.editPropertiesLabel().should("be.checked");
        BulkEdit.archiveLabel().should("not.be.checked");
        BulkEdit.archiveLabel().click({ force: true });
        BulkEdit.editPropertiesLabel().should("not.be.checked");
        BulkEdit.archiveLabel().should("be.checked");

        BulkEdit.propertyLabel().should("not.exist");
        BulkEdit.changeToLabel().should("not.exist");

        Buttons.done().click();

        BulkEdit.confirmModalHeading().should("be.visible");
        cy.findAllByText(/valid to/i).should("be.visible");
        cy.findByText("to").should("be.visible");
        cy.findAllByText(date).should("be.visible");
        cy.findByText("Are you sure? You can’t undo this action afterwards.").should("be.visible");
        Buttons.confirm().click();

        BulkEdit.confirmModalHeading().should("not.exist");
        BulkEdit.modalHeadingLabel().should("not.exist");
    });
});
