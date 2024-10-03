import type { Meta, StoryFn } from "@storybook/react";
import { Button, Card, HStack, Icon, IconButton, Text } from "@volocopter/design-library-react";
import { I18nProvider } from "@voloiq/i18n";
import type { SectionProps } from "./Section";
import { Section } from "./Section";

const meta: Meta = {
    title: "Network Scheduling/Components/Section",
    component: Section,
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

export const Basic: StoryFn<SectionProps> = (props) => <Section {...props} />;
Basic.args = {
    headerLabel: "Section Header",
    bodyContent: (
        <Card width="100%">
            <Text>Content</Text>
        </Card>
    ),
};

export const WithHeaderContentAndResourceName: StoryFn<SectionProps> = (props) => <Section {...props} />;
WithHeaderContentAndResourceName.args = {
    headerLabel: "Section Header",
    actions: (
        <HStack gap="xxs">
            <Button>Unassign</Button>
            <Button variant="primary">Reassign</Button>
        </HStack>
    ),
    bodyContent: (
        <Card width="100%">
            <Text>Content</Text>
        </Card>
    ),
};

export const WithHeaderContentAndIcon: StoryFn<SectionProps> = (props) => <Section {...props} />;
WithHeaderContentAndIcon.args = {
    headerLabel: "Section Header",
    resourceLabel: "Resource Name",
    headerIcon: (
        <IconButton variant="ghost" aria-label="externalLink" data-testid="external-resource-button">
            <Icon icon="externalLink" color="darkBlue.700" />
        </IconButton>
    ),
    actions: (
        <HStack gap="xxs">
            <Button>Unassign</Button>
            <Button variant="primary">Reassign</Button>
        </HStack>
    ),
    bodyContent: (
        <Card width="100%">
            <Text>Content</Text>
        </Card>
    ),
};
