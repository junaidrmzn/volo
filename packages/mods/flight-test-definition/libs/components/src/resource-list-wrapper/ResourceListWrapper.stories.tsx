import type { Meta, StoryFn } from "@storybook/react";
import { Card, HStack, Text, VStack } from "@volocopter/design-library-react";
import { I18nProvider } from "@voloiq/i18n";
import type { ResourceListWrapperProps } from "./ResourceListWrapper";
import { ResourceListWrapper } from "./ResourceListWrapper";

type ExampleListItem = {
    id: string;
    value: string;
};

const meta: Meta = {
    title: "Flight Test Definition/Components/Resource List Wrapper",
    component: ResourceListWrapper,
    args: {
        list: [
            {
                id: "1",
                value: "value-1",
            },
            {
                id: "2",
                value: "value-2",
            },
        ],
        emptyMessage: "No items found",
        renderItem: (item: ExampleListItem) => (
            <Card w="full">
                <HStack spacing={3} w="full">
                    <Text>ID: {item.id}</Text>
                    <Text>{item.value}</Text>
                </HStack>
            </Card>
        ),
    },
    parameters: { actions: { argTypesRegex: "^on.*" } },
    decorators: [
        (Story) => (
            <I18nProvider>
                <Story />
            </I18nProvider>
        ),
    ],
};
export default meta;

export const Basic: StoryFn<ResourceListWrapperProps<ExampleListItem>> = (props) => (
    <VStack spacing={3} w="full">
        <ResourceListWrapper {...props} />
    </VStack>
);
