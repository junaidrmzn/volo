import type { Meta, StoryFn } from "@storybook/react";
import { Center, Text } from "@volocopter/design-library-react";
import type { ExpandableSelectableCardProps } from "./ExpandableSelectableCard";
import { ExpandableSelectableCard } from "./ExpandableSelectableCard";

const meta: Meta = {
    title: "Flight Test Definition/Components/Expandable Selectable Card",
    component: ExpandableSelectableCard,
    parameters: {
        backgrounds: { default: "white", values: [{ name: "white", value: "#FFFFFF" }] },
        actions: { argTypesRegex: "^on.*" },
    },
    args: {
        cardLabel: "card",
    },
};
export default meta;

export const Basic: StoryFn<ExpandableSelectableCardProps> = (props) => (
    <ExpandableSelectableCard {...props}>
        <ExpandableSelectableCard.Title>
            <Text background="blue50Mono800" lineHeight={6}>
                Title
            </Text>
        </ExpandableSelectableCard.Title>
        <ExpandableSelectableCard.Content>
            <Center height={20} background="blue50Mono800">
                Body
            </Center>
        </ExpandableSelectableCard.Content>
    </ExpandableSelectableCard>
);
export const Selected: StoryFn<ExpandableSelectableCardProps> = (props) => <Basic {...props} />;
Selected.args = {
    isSelectable: true,
    checkboxLabel: "Select",
    selectState: "selected",
};

export const Unselected: StoryFn<ExpandableSelectableCardProps> = (props) => <Basic {...props} />;
Unselected.args = {
    isSelectable: true,
    checkboxLabel: "Select",
    selectState: "unselected",
};

export const Indeterminate: StoryFn<ExpandableSelectableCardProps> = (props) => <Basic {...props} />;
Indeterminate.args = {
    isSelectable: true,
    checkboxLabel: "Select",
    selectState: "indeterminate",
};
