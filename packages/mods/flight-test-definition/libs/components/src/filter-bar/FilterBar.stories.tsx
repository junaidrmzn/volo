import type { Meta, StoryFn } from "@storybook/react";
import { I18nProvider } from "@voloiq/i18n";
import type { FilterBarProps } from "./FilterBar";
import { FilterBar } from "./FilterBar";

const meta: Meta = {
    title: "Flight Test Definition/Components/Filter Bar",
    component: FilterBar,
    parameters: { actions: { argTypesRegex: "^on.*" } },
    args: {
        properties: [
            {
                type: "text",
                propertyName: "ftiCode",
                group: "Workflows",
                label: "ftiCode",
            },
        ],
        onFilterChange: (filterString: string) => {
            return filterString;
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

export const Basic: StoryFn<FilterBarProps> = (props) => {
    return <FilterBar {...props} />;
};
