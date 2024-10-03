import type { Meta, StoryFn } from "@storybook/react";
import { I18nProvider } from "@voloiq/i18n";
import type { DoneButtonProps } from "./DoneButton";
import { DoneButton } from "./DoneButton";

const meta: Meta = {
    title: "Flight Test Definition/Components/Done Button",
    component: DoneButton,
    parameters: { actions: { argTypesRegex: "^on.*" } },
    decorators: [
        (Story) => (
            <I18nProvider>
                <Story />
            </I18nProvider>
        ),
    ],
};
export default meta;

export const Basic: StoryFn<DoneButtonProps> = (props) => <DoneButton {...props} />;
