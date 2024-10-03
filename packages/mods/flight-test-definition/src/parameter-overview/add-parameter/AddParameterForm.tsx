import { Box, Grid } from "@volocopter/design-library-react";
import { FormProvider } from "@voloiq/form";
import type { RenderAddHandlerProps } from "@voloiq/resource-overview";
import { useAddParameterForm } from "./useAddParameterForm";

export type AddParameterProps = RenderAddHandlerProps;

export const AddParameterForm = (props: AddParameterProps) => {
    const { formRef, onAfterSubmit, onSubmit, onSubmitError } = props;
    const { FormControl, schema, onCreate } = useAddParameterForm();
    return (
        <Box background="mono500Gray750" borderRadius="lg" padding={4}>
            <FormProvider
                schema={schema}
                formType="create"
                onCreate={async (data, reset) => {
                    onSubmit();
                    try {
                        await onCreate(data, reset);
                    } catch {
                        onSubmitError("GENERIC");
                    }
                }}
                formRef={formRef}
                onAfterSubmit={onAfterSubmit}
                onSubmitError={onSubmitError}
            >
                <Grid templateColumns="repeat(3, 1fr)" gap={3}>
                    <FormControl fieldName="name" />
                    <FormControl fieldName="acronym" />
                    <FormControl fieldName="unit" />
                </Grid>
            </FormProvider>
        </Box>
    );
};
