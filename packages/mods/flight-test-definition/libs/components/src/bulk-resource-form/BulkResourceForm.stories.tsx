import type { Meta, StoryFn } from "@storybook/react";
import type { ReactElement } from "react";
import type { FormControlProps } from "@voloiq/form";
import { object, string } from "@voloiq/form";
import { I18nProvider } from "@voloiq/i18n";
import type { BulkResourceFormProps } from "./BulkResourceForm";
import { BulkResourceForm } from "./BulkResourceForm";

const definitionSchema = object({
    title: string().label("Title"),
});

const meta: Meta = {
    title: "Flight Test Definition/Components/Bulk Resource Form",
    component: BulkResourceForm,
    args: {
        entityName: "Definition",
        schema: definitionSchema,
        onAdd: () => Promise.resolve(),
        onDelete: () => Promise.resolve(),
        onEdit: () => Promise.resolve(),
        renderFormControlGroup: (
            FormControl: (props: FormControlProps<typeof definitionSchema>) => ReactElement | null
        ) => <FormControl fieldName="title" />,
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

export const Basic: StoryFn<BulkResourceFormProps<typeof definitionSchema>> = (props) => (
    <BulkResourceForm {...props} />
);
export const WithDuplicateButton: StoryFn<BulkResourceFormProps<typeof definitionSchema>> = (props) => (
    <BulkResourceForm {...props} />
);
WithDuplicateButton.args = {
    withDuplicateButton: true,
};
