import type { Meta, StoryFn } from "@storybook/react";
import { I18nProvider } from "@voloiq/i18n";
import { ScheduleItemStatusTag, ScheduleItemStatusTagProps } from "./ScheduleItemStatusTag";

const meta: Meta = {
    title: "Commercial Schedule/Components/Schedule Item Status Tag",
    args: {
        status: "DRAFT",
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

export const Basic: StoryFn<ScheduleItemStatusTagProps> = (props) => <ScheduleItemStatusTag {...props} />;
