import type { Meta, StoryFn } from "@storybook/react";
import { I18nProvider } from "@voloiq/i18n";
import { TextsWithArrow, TextsWithArrowProps } from "./TextsWithArrow";

const meta: Meta = {
    title: "Commercial Schedule/Components/Texts With Arrow",
    args: {
        leftText: "Left",
        rightText: "Right",
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

export const Basic: StoryFn<TextsWithArrowProps> = (props) => <TextsWithArrow {...props} />;
