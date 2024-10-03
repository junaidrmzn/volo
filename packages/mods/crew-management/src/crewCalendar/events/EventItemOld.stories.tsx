import type { Meta } from "@storybook/react";
import { Box } from "@volocopter/design-library-react";
import React from "react";
import { EventItemOld } from "./EventItemOld";
import { ExpandedEventItem } from "./ExpandedEventItem";

const meta: Meta = {
    title: "Network Schedule Planning/Event Item",
    parameters: {
        backgrounds: {
            default: "white",
            values: [{ name: "white", value: "white" }],
        },
    },
    decorators: [
        (Story) => (
            <Box width="300px" height="75px">
                <Story />
            </Box>
        ),
    ],
};
export default meta;

export const Basic = () => <EventItemOld eventName="Rome Airport Fair" />;
export const BlockedForMission = () => <EventItemOld eventName="Rome Airport Fair" isBlockedForMission />;
export const Expanded = () => <ExpandedEventItem itemCount={3} />;
export const ExpandedBlockedForMission = () => <ExpandedEventItem itemCount={3} isBlockedForMission />;
