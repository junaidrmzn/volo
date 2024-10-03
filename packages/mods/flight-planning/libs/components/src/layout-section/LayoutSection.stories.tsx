import type { Meta, StoryFn } from "@storybook/react";
import { Box } from "@volocopter/design-library-react";
import { I18nProvider } from "@voloiq/i18n";
import type { LayoutSectionProps } from "./LayoutSection";
import { LayoutSection } from "./LayoutSection";

const meta: Meta = {
    title: "Flight Planning/Components/Layout Section",
    component: LayoutSection,
    args: {
        children: (
            <Box w="100%" background="white" p={6} borderRadius="sm" my={3}>
                Content
            </Box>
        ),
    },
    decorators: [
        (Story) => (
            <I18nProvider>
                <Story />
            </I18nProvider>
        ),
    ],
};
export default meta;

export const Basic: StoryFn<LayoutSectionProps> = (props) => <LayoutSection {...props} firstLabel="Hanger HQ" />;

export const WithSecondLabel: StoryFn<LayoutSectionProps> = (props) => (
    <LayoutSection {...props} firstLabel="Hanger HQ" secondLabel="Route Option" />
);

export const WithAddButton: StoryFn<LayoutSectionProps> = (props) => (
    <LayoutSection {...props} firstLabel="Hanger HQ" secondLabel="Route Option" hasAddButton />
);
