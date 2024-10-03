import type { Meta, StoryFn } from "@storybook/react";
import { Box } from "@volocopter/design-library-react";
import { TagWithTooltip, TagWithTooltipProps } from "./TagWithTooltip";

const meta: Meta = {
    title: "Mission Management/TagWithTooltip",
    component: TagWithTooltip,
    args: {
        placement: "right",
        colorScheme: "blue",
        tooltipLabel: "Reason: Bad weather conditions",
        tagContent: "Cancelled",
    },
    decorators: [
        (Story) => (
            <Box height="100vh" w="full" backgroundColor="white" p={8}>
                <Story />
            </Box>
        ),
    ],
};
export default meta;

export const Basic: StoryFn<TagWithTooltipProps> = (props) => <TagWithTooltip {...props} />;
