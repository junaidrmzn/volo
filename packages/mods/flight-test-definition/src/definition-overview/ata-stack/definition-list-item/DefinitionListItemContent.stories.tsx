import type { Meta, StoryFn } from "@storybook/react";
import { anyDefinition } from "@voloiq/flight-test-definition-api/v2";
import { I18nProvider } from "@voloiq/i18n";
import type { DefinitionListItemContentProps } from "./DefinitionListItemContent";
import { DefinitionListItemContent } from "./DefinitionListItemContent";

const meta: Meta = {
    title: "Flight Test Definition/Definition List Item Content",
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

export const Basic: StoryFn<DefinitionListItemContentProps> = (props) => <DefinitionListItemContent {...props} />;
