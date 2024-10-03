import type { Meta, StoryFn } from "@storybook/react";
import type { BadgeWithNumberProps } from "./BadgeWithNumber";
import { BadgeWithNumber } from "./BadgeWithNumber";

const meta: Meta = {
    title: "Flight Test Definition/Components/Badge With Number",
    args: {
        title: "Attached Files",
        count: 42,
    },
};
export default meta;

export const Basic: StoryFn<BadgeWithNumberProps> = (props) => <BadgeWithNumber {...props} />;
