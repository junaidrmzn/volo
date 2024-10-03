import type { Meta, StoryFn } from "@storybook/react";
import { Box, VStack } from "@volocopter/design-library-react";
import type { OverviewGroupProps } from "./OverviewGroup";
import { OverviewGroup } from "./OverviewGroup";

const meta: Meta = {
    title: "Overview Group",
    component: OverviewGroup,
    args: {
        children: (
            <Box background="white" p={6} borderRadius="sm" my={3}>
                Content
            </Box>
        ),
        groupName: "ATA 27",
    },
};
export default meta;

export const Level1: StoryFn<OverviewGroupProps> = (props) => <OverviewGroup {...props} />;
Level1.args = {
    level: 1,
};
export const Level2: StoryFn<OverviewGroupProps> = (props) => <OverviewGroup {...props} />;
Level2.args = {
    level: 2,
};
export const Level3: StoryFn<OverviewGroupProps> = (props) => <OverviewGroup {...props} />;
Level3.args = {
    level: 3,
};
export const Nested = () => (
    <OverviewGroup groupName="ATA 27 - Flight Controls">
        <OverviewGroup groupName="FTD-v21-27-055-A00">
            <OverviewGroup groupName="FTD-V21-27-055-A00-01: Motor Failure Injection - Hover">
                <VStack py={3} alignItems="stretch">
                    <Box background="white" p={6} borderRadius="sm">
                        Foo
                    </Box>
                    <Box background="white" p={6} borderRadius="sm">
                        Bar
                    </Box>
                </VStack>
            </OverviewGroup>
            <OverviewGroup groupName="FTD-V21-27-055-A00-02: Double Motor Failure">
                <VStack py={3} alignItems="stretch">
                    <Box background="white" p={6} borderRadius="sm">
                        Foo
                    </Box>
                    <Box background="white" p={6} borderRadius="sm">
                        Bar
                    </Box>
                    <Box background="white" p={6} borderRadius="sm">
                        Baz
                    </Box>
                </VStack>
            </OverviewGroup>
        </OverviewGroup>
    </OverviewGroup>
);
