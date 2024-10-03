import type { Meta, StoryFn } from "@storybook/react";
import { I18nProvider } from "@voloiq/i18n";
import type { ReservationTimeGridProps } from "./ReservationTimeGrid";
import { ReservationTimeGrid } from "./ReservationTimeGrid";

const meta: Meta = {
    title: "Network Scheduling/Components/Reservation Time Grid",
    component: ReservationTimeGrid,
    parameters: { actions: { argTypesRegex: "^on.*" } },
    args: {
        startDate: new Date("2023-05-04T07:00:00Z"),
        endDate: new Date("2023-05-04T10:00:00Z"),
        reservedSlots: [
            {
                endDateTime: "2023-05-04T09:50:00Z",
                alternativeIdentifier: "VC-2044",
                id: "834793458934-483593854",
                startDateTime: "2023-05-04T09:30:00Z",
            },
        ],
        reservationSlotStartDate: "2023-05-04T08:00:00Z",
        reservationSlotEndDate: "2023-05-04T09:00:00Z",
    },
    decorators: [
        (Story) => (
            <I18nProvider>
                <Story />
            </I18nProvider>
        ),
    ],
};
export default meta;

export const Basic: StoryFn<ReservationTimeGridProps> = (props) => <ReservationTimeGrid {...props} />;
