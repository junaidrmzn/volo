import type { Meta } from "@storybook/react";
import { I18nProvider } from "../../../i18n";
import { TextWithLabel } from "./TextWithLabel";

const meta: Meta = {
    title: "Text-Layouts/Text With Label",
    decorators: [
        (Story) => {
            return (
                <I18nProvider>
                    <Story />
                </I18nProvider>
            );
        },
    ],
};
export default meta;

export const Basic = () => <TextWithLabel label="Label" text="Text" />;

export const WithMissingText = () => <TextWithLabel label="Label" />;
