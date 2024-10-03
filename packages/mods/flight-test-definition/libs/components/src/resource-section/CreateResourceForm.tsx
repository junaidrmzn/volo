import { Flex, VStack } from "@volocopter/design-library-react";
import type { ReactElement } from "react";
import type { AnyObjectSchema, CreateFormProps, FormControlProps, FormProviderProps } from "@voloiq/form";
import { FormProvider } from "@voloiq/form";
import { DoneButton } from "../done-button/DoneButton";
import { useMemoizedFormControl } from "./useMemoizedFormControl";

export type CreateResourceFormProps<Schema extends AnyObjectSchema> = {
    formSchema: Schema;
    renderFormControls: (FormControl: (props: FormControlProps<Schema>) => ReactElement | null) => ReactElement | null;
} & Pick<CreateFormProps<Schema>, "initialValues" | "onCreate"> &
    Pick<FormProviderProps<Schema>, "formId">;

export const CreateResourceForm = <Schema extends AnyObjectSchema>(props: CreateResourceFormProps<Schema>) => {
    const { renderFormControls, formId = "createResource", formSchema, initialValues, onCreate } = props;

    const { FormControl } = useMemoizedFormControl();

    return (
        <VStack spacing={3} boxSize="full" alignItems="stretch">
            <FormProvider
                formId={formId}
                formType="create"
                schema={formSchema}
                initialValues={initialValues}
                onCreate={onCreate}
            >
                {renderFormControls(FormControl)}
            </FormProvider>
            <Flex justifyContent="flex-end">
                <DoneButton type="submit" form={formId} />
            </Flex>
        </VStack>
    );
};
