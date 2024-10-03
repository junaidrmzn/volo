import type { Meta, StoryFn } from "@storybook/react";
import { Box } from "@volocopter/design-library-react";
import { I18nProvider } from "@voloiq/i18n";
import { AnchorNavBar } from "./AnchorNavBar";

const meta: Meta = {
    title: "Flight Test Definition/Components/AnchorLinkBar",
    component: AnchorNavBar,
    parameters: { actions: { argTypesRegex: "^on.*" } },
    decorators: [
        (Story) => (
            <I18nProvider>
                See the Anchor Link bar Bar
                <Box height="150vh" />
                <Story />
            </I18nProvider>
        ),
    ],
};
export default meta;

export const Basic: StoryFn = () => {
    const tabs = [
        { label: "Important Section", linkId: "importantSection" },
        { label: "Another Important Section", linkId: "anotherImportantSection" },
        { label: "Last Important Section", linkId: "lastImportantSection" },
    ];

    return <AnchorNavBar tabs={tabs} />;
};
