import type { Meta, StoryFn } from "@storybook/react";
import { TabPanel, TabPanels, Text } from "@volocopter/design-library-react";
import { LocalFeatureFlagsProvider } from "@voloiq/feature-flags";
import { I18nProvider } from "@voloiq/i18n";
import { VerticalNavigationTab, VerticalNavigationTabList, VerticalNavigationTabs } from "..";
import { VerticalNavigationTabListProps } from "./VerticalNavigationTabList";

const meta: Meta = {
    title: "Flight Test Definition/Components/Test Point Card",
    component: VerticalNavigationTabs,
    decorators: [
        (Story) => (
            <LocalFeatureFlagsProvider>
                <I18nProvider>
                    <Story />
                </I18nProvider>
            </LocalFeatureFlagsProvider>
        ),
    ],
};
export default meta;

export const Basic: StoryFn<VerticalNavigationTabListProps> = () => (
    <VerticalNavigationTabs isLazy size="md" variant="default">
        <VerticalNavigationTabList>
            <VerticalNavigationTab id="tab-1">Test Mission</VerticalNavigationTab>
            <VerticalNavigationTab id="tab-2" parentId="tab-1">
                Aircraft Release for Flight
            </VerticalNavigationTab>
            <VerticalNavigationTab id="tab-3" parentId="tab-1">
                Test Point Selection
            </VerticalNavigationTab>
            <VerticalNavigationTab id="tab-4" isDisabled>
                Attached Files
            </VerticalNavigationTab>
            <VerticalNavigationTab id="tab-5" isDisabled>
                Approvals & Versions
            </VerticalNavigationTab>
        </VerticalNavigationTabList>

        <TabPanels>
            <TabPanel>
                <Text>Tab 1 Details</Text>
            </TabPanel>
            <TabPanel>
                <Text>Tab 2 Details</Text>
            </TabPanel>
        </TabPanels>
    </VerticalNavigationTabs>
);
