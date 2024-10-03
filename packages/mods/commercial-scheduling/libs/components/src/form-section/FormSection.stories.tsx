import type { Meta, StoryFn } from "@storybook/react";
import { I18nProvider } from "@voloiq/i18n";
import { FormSection, FormSectionProps } from "./FormSection";

const meta: Meta = {
    title: "Commercial Schedule/Components/Form Section",
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

export const Basic: StoryFn<FormSectionProps> = (props) => <FormSection {...props} />;
