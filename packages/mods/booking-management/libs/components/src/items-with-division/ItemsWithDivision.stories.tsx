import type { Meta, StoryFn } from "@storybook/react";
import { I18nProvider } from "@voloiq/i18n";
import { ItemsWithDivision, ItemsWithDivisionProps } from "./ItemsWithDivision";

const meta: Meta = {
    title: "Booking Management/Components/Items With Division",
    decorators: [
        (Story) => (
            <I18nProvider>
                <Story />
            </I18nProvider>
        ),
    ],
};
export default meta;

export const Basic: StoryFn<ItemsWithDivisionProps> = (props) => <ItemsWithDivision {...props} />;
