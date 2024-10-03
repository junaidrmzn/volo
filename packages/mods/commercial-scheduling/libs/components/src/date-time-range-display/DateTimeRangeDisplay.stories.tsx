import type { Meta, StoryFn } from "@storybook/react";
import { I18nProvider } from "@voloiq/i18n";
import { DateTimeRangeDisplay, DateTimeRangeDisplayProps } from "./DateTimeRangeDisplay";

const meta: Meta = {
    title: "Commercial Schedule/Components/Date Time Range Display",
    args: {
        startDate: new Date(),
        endDate: new Date(),
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

export const Basic: StoryFn<DateTimeRangeDisplayProps> = (props) => <DateTimeRangeDisplay {...props} />;
