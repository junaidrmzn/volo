import type { Meta, StoryFn } from "@storybook/react";
import { I18nProvider } from "@voloiq/i18n";
import { DateTimeDisplayWithLabel, DateTimeDisplayWithLabelProps } from "./DateTimeDisplayWithLabel";

const meta: Meta = {
    title: "Booking Management/Components/Date Time Display With Label",
    args: {
        value: new Date(),
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

export const Basic: StoryFn<DateTimeDisplayWithLabelProps> = (props) => <DateTimeDisplayWithLabel {...props} />;
