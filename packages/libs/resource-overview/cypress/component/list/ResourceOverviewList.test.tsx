import { dateTimeInputStyles } from "@volocopter/date-time-input-react";
import { Box, Td, ThemeProvider, Tr } from "@volocopter/design-library-react";
import { filterStyles } from "@volocopter/filter-react";
import { truncatedListStyles } from "@volocopter/truncated-list-react";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { DateTimeInputLocaleProvider } from "@voloiq/date-time-input";
import { LocalFeatureFlagsProvider } from "@voloiq/feature-flags";
import { I18nProvider } from "@voloiq/i18n";
import { MemoryRouter, ParametersCacheProvider } from "@voloiq/routing";
import { ResourceOverview } from "../../../src/ResourceOverview";
import { anyPagination } from "../../../src/list/__tests__/anyListMachineConfig";
import { anyListMachineConfig } from "./anyListMachineConfig";

const Providers = (props: PropsWithChildren<{}>) => {
    const { children } = props;
    return (
        <ThemeProvider overrides={[dateTimeInputStyles, truncatedListStyles, filterStyles]}>
            <LocalFeatureFlagsProvider>
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

describe("ResourceOverviewList", () => {
    it("renders resource list with table view", () => {
        const fetchAllResources = cy
            .stub()
            .as("fetchAllResources")
            .resolves({ data: [{ id: "1" }], pagination: anyPagination() });
        const testStateMachineConfig = anyListMachineConfig({
            fetchAllResources,
            useTable: true,
            getTableColumns: () => ["ID"],
        });

        cy.mount(
            <Providers>
                <ResourceOverview machineConfig={testStateMachineConfig}>
                    <ResourceOverview.TableRow>
                        {(resource: { id: string }) => (
                            <Tr>
                                <Td>{`Row ${resource.id}`}</Td>
                            </Tr>
                        )}
                    </ResourceOverview.TableRow>
                </ResourceOverview>
            </Providers>
        );

        cy.findByText("ID").should("be.visible");
        cy.findByText("Row 1").should("be.visible");
    });
});
