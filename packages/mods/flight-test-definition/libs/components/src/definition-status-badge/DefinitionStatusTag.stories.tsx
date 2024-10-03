import type { Meta, StoryFn } from "@storybook/react";
import { I18nProvider } from "@voloiq/i18n";
import type { DefinitionStatusTagProps } from "./DefinitionStatusTag";
import { DefinitionStatusTag } from "./DefinitionStatusTag";

const meta: Meta = {
    title: "Flight Test Definition/Components/Definition Status Tag",
    args: {
        status: "APPROVED",
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

export const Basic: StoryFn<DefinitionStatusTagProps> = (props) => <DefinitionStatusTag {...props} />;
