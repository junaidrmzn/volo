import type { Meta, StoryFn } from "@storybook/react";
import { I18nProvider } from "@voloiq/i18n";
import type { GroundTimeCardProps } from "./GroundTimeCard";
import { GroundTimeCard } from "./GroundTimeCard";
import { GroundTimeDetailsCard, GroundTimeDetailsCardProps } from "./GroundTimeDetailsCard";

const meta: Meta = {
    title: "Network Scheduling/Components/Ground Time Card",
    component: GroundTimeCard,
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

export const Basic: StoryFn<GroundTimeCardProps> = (props) => <GroundTimeCard {...props} />;
Basic.args = {
    vertiport: "ISY",
    startTime: "2023-12-12T16:34:41.000Z",
    endTime: "2023-12-12T17:34:41.000Z",
    onClickAction: () => {},
};

export const Inbound: StoryFn<GroundTimeDetailsCardProps> = (props) => <GroundTimeDetailsCard {...props} />;
Inbound.args = {
    type: "inbound",
    groundEvent: {
        id: "67971e70-6483-4a4d-b871-ae7228465f90",
        startTime: "2023-12-12T16:34:41.000Z",
        endTime: "2023-12-12T17:34:41.000Z",
        inboundMissionId: "67971e70-6483-4a4d-b871-ae7228465f8b",
        inboundFato: {
            id: "67971e70-6483-4a4d-b871-ae7228465f91",
            validFrom: "2023-12-12T16:34:41.000Z",
            validTo: "2023-12-12T17:34:41.000Z",
            padKey: "F1",
        },
        inboundStand: {
            id: "67971e70-6483-4a4d-b871-ae7228465f91",
            validFrom: "2023-12-12T16:34:41.000Z",
            validTo: "2023-12-12T17:34:41.000Z",
            padKey: "S1",
        },
        vertiportCode: "XRJ",
    },
};

export const Outbound: StoryFn<GroundTimeDetailsCardProps> = (props) => <GroundTimeDetailsCard {...props} />;
Outbound.args = {
    type: "outbound",
    groundEvent: {
        id: "67971e70-6483-4a4d-b871-ae7228465f90",
        startTime: "2023-12-12T16:34:41.000Z",
        endTime: "2023-12-12T17:34:41.000Z",
        outboundMissionId: "67971e70-6483-4a4d-b871-ae7228465f8b",
        outboundFato: {
            id: "67971e70-6483-4a4d-b871-ae7228465f91",
            validFrom: "2023-12-12T16:34:41.000Z",
            validTo: "2023-12-12T17:34:41.000Z",
            padKey: "F1",
        },
        outboundStand: {
            id: "67971e70-6483-4a4d-b871-ae7228465f91",
            validFrom: "2023-12-12T16:34:41.000Z",
            validTo: "2023-12-12T17:34:41.000Z",
            padKey: "S1",
        },
        vertiportCode: "XRJ",
    },
};
