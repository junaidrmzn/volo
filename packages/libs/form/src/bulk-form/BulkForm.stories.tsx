import type { Meta, StoryFn } from "@storybook/react";
import { Button } from "@volocopter/design-library-react";
import { number, object, string } from "../yup";
import type { BulkFormProps } from "./BulkForm";
import { BulkForm } from "./BulkForm";
import { useAddFormControlGroup } from "./bulk-form-context/useAddFormControlGroup";
import { useRemoveFormControlGroup } from "./bulk-form-context/useRemoveFormControlGroup";
import { DragHandle } from "./sortable/DragHandle";

const meta: Meta = {
    title: "Form/Bulk Form",
    component: BulkForm,
    parameters: { actions: { argTypesRegex: "^on.*" } },
};
export default meta;

const schema = object({
    firstName: string().required().label("First Name"),
    lastName: string().label("Last Name"),
    age: number().min(0).required().label("Age"),
});

const AddFormControlGroupButton = () => {
    const { addFormControlGroup } = useAddFormControlGroup();

    return <Button onClick={() => addFormControlGroup()}>+ Add</Button>;
};

const RemoveFormControlGroupButton = () => {
    const { removeFormControlGroup } = useRemoveFormControlGroup();

    return <Button onClick={removeFormControlGroup}>- Remove</Button>;
};

export const Basic: StoryFn<BulkFormProps<typeof schema>> = (props) => (
    <BulkForm
        {...props}
        schema={schema}
        renderFormControlGroup={(FormControl) => (
            <>
                <FormControl fieldName="firstName" />
                <FormControl fieldName="lastName" />
                <FormControl fieldName="age" />
                <RemoveFormControlGroupButton />
            </>
        )}
        initialValues={[
            { id: "1", firstName: "John", lastName: "Doe", age: 50 },
            { id: "2", firstName: "Martin", lastName: "Foe", age: 60 },
        ]}
    >
        <AddFormControlGroupButton />
        <Button type="submit">Submit</Button>
    </BulkForm>
);

export const Sortable: StoryFn<BulkFormProps<typeof schema>> = (props) => (
    <BulkForm
        {...props}
        schema={schema}
        renderFormControlGroup={(FormControl) => (
            <>
                <DragHandle />
                <FormControl fieldName="firstName" />
                <FormControl fieldName="lastName" />
                <FormControl fieldName="age" />
                <RemoveFormControlGroupButton />
            </>
        )}
        initialValues={[
            { id: "1", firstName: "John", lastName: "Doe", age: 50 },
            { id: "2", firstName: "Martin", lastName: "Foe", age: 60 },
        ]}
        isSortable
    >
        <AddFormControlGroupButton />
        <Button type="submit">Submit</Button>
    </BulkForm>
);
