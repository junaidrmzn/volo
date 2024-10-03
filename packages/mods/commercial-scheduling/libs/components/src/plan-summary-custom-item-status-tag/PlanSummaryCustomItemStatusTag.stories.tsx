import type { Meta, StoryFn } from "@storybook/react";
import { I18nProvider } from "@voloiq/i18n";
import { PlanSummaryCustomItemStatusTag, PlanSummaryCustomItemStatusTagProps } from "./PlanSummaryCustomItemStatusTag";

const meta: Meta = {
    title: "Commercial Schedule/Components/Plan Summary Custom Item Status Tag",
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

export const Basic: StoryFn<PlanSummaryCustomItemStatusTagProps> = (props) => (
    <PlanSummaryCustomItemStatusTag {...props} />
);
