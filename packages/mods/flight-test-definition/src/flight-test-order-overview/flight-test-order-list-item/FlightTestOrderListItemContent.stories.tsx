import type { Meta, StoryFn } from "@storybook/react";
import { anyFlightTestOrder } from "@voloiq/flight-test-definition-api/v1";
import { I18nProvider } from "@voloiq/i18n";
import type { FlightTestOrderListItemContentProps } from "./FlightTestOrderListItemContent";
import { FlightTestOrderListItemContent } from "./FlightTestOrderListItemContent";

const meta: Meta = {
    title: "Flight Test Definition/Flight Test Order List Item Content",
    args: {
        flightTestOrder: anyFlightTestOrder(),
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

export const Basic: StoryFn<FlightTestOrderListItemContentProps> = (props) => (
    <FlightTestOrderListItemContent {...props} />
);
