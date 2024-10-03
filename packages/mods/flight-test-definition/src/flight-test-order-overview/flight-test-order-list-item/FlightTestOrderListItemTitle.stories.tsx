import type { Meta, StoryFn } from "@storybook/react";
import { anyFlightTestOrder } from "@voloiq/flight-test-definition-api/v1";
import { I18nProvider } from "@voloiq/i18n";
import type { FlightTestOrderListItemTitleProps } from "./FlightTestOrderListItemTitle";
import { FlightTestOrderListItemTitle } from "./FlightTestOrderListItemTitle";

const meta: Meta = {
    title: "Flight Test Definition/Flight Test Order List Item Title",
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

export const Basic: StoryFn<FlightTestOrderListItemTitleProps> = (props) => <FlightTestOrderListItemTitle {...props} />;
