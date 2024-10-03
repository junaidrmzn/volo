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
import { anyPagination } from "../../../src/list/__tests__/anyListMachineConfig";
import { renderListItemWithId } from "../../../src/utils/renderListItemWithId";
import { anySidePanelMachineConfig } from "./anySidePanelMachineConfig";

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

describe("ResourceOverview with side panel", () => {
    it("renders side panel with resource list", () => {
        const fetchAllResources = cy
            .stub()
            .as("fetchAllResources")
            .resolves({ data: [{ id: "1" }], pagination: anyPagination() });
        const testStateMachineConfig = anySidePanelMachineConfig({ fetchAllResources });

        cy.mount(
            <Providers>
                <ResourceOverview machineConfig={testStateMachineConfig}>
                    <ResourceOverview.ListItem>{renderListItemWithId}</ResourceOverview.ListItem>
                    <ResourceOverview.SidePanel>{() => <>Side Panel</>}</ResourceOverview.SidePanel>
                </ResourceOverview>
            </Providers>
        );

        cy.findByText("Side Panel").should("be.visible");
    });
});
