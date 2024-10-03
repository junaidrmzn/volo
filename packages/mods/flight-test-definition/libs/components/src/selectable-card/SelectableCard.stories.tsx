import type { Meta, StoryFn } from "@storybook/react";
import type { SelectableCardProps } from "./SelectableCard";
import { SelectableCard } from "./SelectableCard";

const meta: Meta = {
    title: "Flight Test Definition/Components/Expandable Selectable Card",
    component: SelectableCard,
    parameters: {
        backgrounds: { default: "white", values: [{ name: "white", value: "#FFFFFF" }] },
        actions: { argTypesRegex: "^on.*" },
    },
    args: {
        cardLabel: "card",
    },
};
export default meta;

export const Basic: StoryFn<SelectableCardProps> = (props) => (
    <SelectableCard {...props}>Card Content goes here</SelectableCard>
);
