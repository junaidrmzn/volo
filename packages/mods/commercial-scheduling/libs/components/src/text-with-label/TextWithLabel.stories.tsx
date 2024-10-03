import type { Meta, StoryFn } from "@storybook/react";
import { I18nProvider } from "@voloiq/i18n";
import { TextWithLabel, TextWithLabelProps } from "./TextWithLabel";

const meta: Meta = {
    title: "Commercial Schedule/Components/Text With Label",
    args: {
        label: "Label",
        text: "Text",
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

export const Basic: StoryFn<TextWithLabelProps> = (props) => <TextWithLabel {...props} />;
