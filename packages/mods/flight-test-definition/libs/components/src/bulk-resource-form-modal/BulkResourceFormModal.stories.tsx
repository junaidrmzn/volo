import type { Meta, StoryFn } from "@storybook/react";
import { VStack } from "@volocopter/design-library-react";
import { number, object, string } from "@voloiq/form";
import { I18nProvider } from "@voloiq/i18n";
import type { BulkResourceFormModalProps } from "./BulkResourceFormModal";
import { BulkResourceFormModal } from "./BulkResourceFormModal";

const meta: Meta = {
    title: "Flight Test Definition/Components/Bulk Form Modal",
    component: BulkResourceFormModal,
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

const schema = object({
    firstName: string().required().label("First Name"),
    lastName: string().label("Last Name"),
    age: number().min(0).required().label("Age"),
});

export const Basic: StoryFn<BulkResourceFormModalProps<typeof schema>> = (props) => (
    <BulkResourceFormModal
        {...props}
        header="Add Special Comments"
        entityName="Special Comment"
        schema={schema}
        renderFormControlGroup={(FormControl) => (
            <VStack>
                <FormControl fieldName="firstName" />
                <FormControl fieldName="lastName" />
                <FormControl fieldName="age" />
            </VStack>
        )}
    />
);
