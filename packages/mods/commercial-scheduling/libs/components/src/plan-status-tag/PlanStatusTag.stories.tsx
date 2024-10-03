import type { Meta, StoryFn } from "@storybook/react";
import { I18nProvider } from "@voloiq/i18n";
import { PlanStatusTag, PlanStatusTagProps } from "./PlanStatusTag";

const meta: Meta = {
    title: "Commercial Schedule/Components/Plan Status Tag",
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

export const Basic: StoryFn<PlanStatusTagProps> = (props) => <PlanStatusTag {...props} />;
