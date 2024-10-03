import type { Meta, StoryFn } from "@storybook/react";
import { Box } from "@volocopter/design-library-react";
import { I18nProvider } from "@voloiq/i18n";
import { BackToTopButton } from "./BackToTopButton";

const meta: Meta = {
    title: "Flight Test Definition/Components/Back To Top Button",
    component: BackToTopButton,
    parameters: { actions: { argTypesRegex: "^on.*" } },
    decorators: [
        (Story) => (
            <I18nProvider>
                Scroll down to find the button
                <Box height="150vh" />
                <Story />
            </I18nProvider>
        ),
    ],
};
export default meta;

export const Basic: StoryFn = () => <BackToTopButton />;
