import type { Meta, StoryFn } from "@storybook/react";
import { anyDefinition } from "@voloiq/flight-test-definition-api/v2";
import { I18nProvider } from "@voloiq/i18n";
import type { DefinitionListItemTitleProps } from "./DefinitionListItemTitle";
import { DefinitionListItemTitle } from "./DefinitionListItemTitle";

const meta: Meta = {
    title: "Flight Test Definition/Definition List Item Title",
    args: {
        flightTestDefinitionModified: {
            ...anyDefinition(),
            requirementCount: 2,
            ftiCount: 47,
            fileCount: 4,
        },
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

export const Basic: StoryFn<DefinitionListItemTitleProps> = (props) => <DefinitionListItemTitle {...props} />;
