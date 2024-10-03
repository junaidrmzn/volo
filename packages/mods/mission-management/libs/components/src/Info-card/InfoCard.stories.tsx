import type { Meta, StoryFn } from "@storybook/react";
import { Icon, IconButton, Text } from "@volocopter/design-library-react";
import { I18nProvider } from "@voloiq/i18n";
import type { InfoCardProps } from "./InfoCard";
import { InfoCard } from "./InfoCard";

const meta: Meta = {
    title: "Network Scheduling/Components/InfoCard",
    component: InfoCard,
    parameters: { actions: { argTypesRegex: "^on.*" } },
    args: {},
    decorators: [
        (Story) => (
            <I18nProvider>
                <Story />
            </I18nProvider>
        ),
    ],
};
export default meta;

export const Basic: StoryFn<InfoCardProps> = (props) => <InfoCard {...props} />;
Basic.args = {
    headerLabel: "Card Header",
    tagLabel: "Status",
    tagType: "warning",
    actions: (
        <IconButton aria-label="icon" variant="ghost" size="lg">
            <Icon icon="ellipsis" size={4} />
        </IconButton>
    ),
    bodyContent: <Text>Card Content</Text>,
};

export const WithTagOnLeft: StoryFn<InfoCardProps> = (props) => <InfoCard {...props} />;
WithTagOnLeft.args = {
    headerLabel: "Card Header",
    tagLabel: "Status",
    tagType: "warning",
    tagPosition: "left",
    actions: (
        <IconButton aria-label="icon" variant="ghost" size="lg">
            <Icon icon="ellipsis" size={4} />
        </IconButton>
    ),
    bodyContent: <Text>Card Content</Text>,
};
