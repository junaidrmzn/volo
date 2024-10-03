import type { Meta, StoryFn } from "@storybook/react";
import { I18nProvider } from "@voloiq/i18n";
import type { ScheduledMissionCardProps } from "./ScheduledMissionCard";
import { ScheduledMissionCard } from "./ScheduledMissionCard";

const meta: Meta = {
    title: "Network Scheduling/Components/Scheduled Mission Card",
    component: ScheduledMissionCard,
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

export const Basic: StoryFn<ScheduledMissionCardProps> = (props) => <ScheduledMissionCard {...props} />;
Basic.args = {
    mission: {
        isInConflict: false,
        flightNumber: "VC123",
        departureVertiportCode: "XRJ",
        arrivalVertiportCode: "JCJ",
        estimatedDepartureDateTime: "2022-11-06T17:39:41.000Z",
        estimatedArrivalDateTime: "2022-11-06T17:45:41.000Z",
        aircraftTypeName: "TEST",
    },
};

export const WithConflict: StoryFn<ScheduledMissionCardProps> = (props) => <ScheduledMissionCard {...props} />;
WithConflict.args = {
    mission: {
        isInConflict: true,
        flightNumber: "VC123",
        departureVertiportCode: "XRJ",
        arrivalVertiportCode: "JCJ",
        estimatedDepartureDateTime: "2022-11-06T17:39:41.000Z",
        estimatedArrivalDateTime: "2022-11-06T17:45:41.000Z",
        aircraftTypeName: "TEST",
    },
};
