import type { Meta, StoryFn } from "@storybook/react";
import { Box } from "@volocopter/design-library-react";
import type { IconCardProps } from "./IconCard";
import { IconCard } from "./IconCard";

const meta: Meta = {
    title: "Mission Management/IconCard",
    component: IconCard,
    args: {
        label: "9.94 kwH",
        helpText: "est. remaining energy",
        icon: "battery",
    },
    decorators: [
        (Story) => (
            <Box height="100vh" backgroundColor="white" p={8}>
                <Story />
            </Box>
        ),
    ],
};
export default meta;

export const Basic: StoryFn<IconCardProps> = (props) => <IconCard {...props} />;
