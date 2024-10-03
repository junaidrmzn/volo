import type { Meta, StoryFn } from "@storybook/react";
import { I18nProvider } from "@voloiq/i18n";
import type { SearchInputFieldProps } from "./SearchInputField";
import { SearchInputField } from "./SearchInputField";

const meta: Meta = {
    title: "Flight Test Definition/Components/Search Input Field",
    component: SearchInputField,
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

export const Basic: StoryFn<SearchInputFieldProps> = (props) => <SearchInputField {...props} />;
