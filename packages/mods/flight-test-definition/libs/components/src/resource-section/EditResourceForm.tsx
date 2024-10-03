import { Flex, VStack } from "@volocopter/design-library-react";
import type { ReactElement } from "react";
import type { AnyObjectSchema, EditFormProps, FormControlProps, FormProviderProps } from "@voloiq/form";
import { FormProvider } from "@voloiq/form";
import { DoneButton } from "../done-button/DoneButton";
import { useMemoizedFormControl } from "./useMemoizedFormControl";

export type EditResourceFormProps<Schema extends AnyObjectSchema> = {
    formSchema: Schema;
    renderFormControls: (FormControl: (props: FormControlProps<Schema>) => ReactElement | null) => ReactElement | null;
} & Pick<EditFormProps<Schema>, "initialValues" | "onEdit"> &
    Pick<FormProviderProps<Schema>, "formId">;

export const EditResourceForm = <Schema extends AnyObjectSchema>(props: EditResourceFormProps<Schema>) => {
    const { renderFormControls, formId = "editResource", formSchema, initialValues, onEdit } = props;

    const { FormControl } = useMemoizedFormControl();

    return (
        <VStack spacing={3} boxSize="full" alignItems="stretch">
            <FormProvider
                formId={formId}
                formType="edit"
                schema={formSchema}
                initialValues={initialValues}
                onEdit={onEdit}
            >
                {renderFormControls(FormControl)}
            </FormProvider>
            <Flex justifyContent="flex-end">
                <DoneButton type="submit" form={formId} />
            </Flex>
        </VStack>
    );
};
