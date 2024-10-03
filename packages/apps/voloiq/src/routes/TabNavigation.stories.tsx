import type { Meta, StoryFn } from "@storybook/react";
import { Box } from "@volocopter/design-library-react";
import { MemoryRouter } from "@voloiq/routing";
import type { TabNavigationProps } from "./TabNavigation";
import { TabNavigation } from "./TabNavigation";

const meta: Meta = {
    title: "VoloIQ App/TabNavigation",
    component: TabNavigation,
    args: {
        children: <Box>Some content goes in here</Box>,
        label: "Flight Test Suite",
        tabs: [
            {
                path: "dashboard",
                label: "Dashboard",
            },
            {
                path: "definitions",
                label: "Flight Test Definitions",
            },
            {
                path: "orders",
                label: "Flight Test Orders",
            },
            {
                path: "logs",
                label: "Logs",
            },
        ],
    },
    decorators: [
        (Story) => (
            <MemoryRouter>
                <Story />
            </MemoryRouter>
        ),
    ],
};
export default meta;

export const Basic: StoryFn<TabNavigationProps> = (props) => <TabNavigation {...props} />;
export const WithOverflowingTabs: StoryFn<TabNavigationProps> = (props) => <TabNavigation {...props} />;
WithOverflowingTabs.args = {
    tabs: [
        {
            path: "dashboard",
            label: "Dashboard",
        },
        {
            path: "definitions",
            label: "Flight Test Definitions",
        },
        {
            path: "orders",
            label: "Flight Test Orders",
        },
        {
            path: "logs",
            label: "Logs",
        },
        {
            path: "hazards",
            label: "Test Hazards",
        },
        {
            path: "test-points",
            label: "Test Points",
        },
        {
            path: "fti-parameters",
            label: "FTI Parameters",
        },
        {
            path: "test-point-parameters",
            label: "Test Point Parameters",
        },
    ],
};
