import { Box, Grid } from "@volocopter/design-library-react";
import type { TestPointParameter } from "@voloiq-typescript-api/ftd-types";
import { FormProvider } from "@voloiq/form";
import type { RenderEditHandlerProps } from "@voloiq/resource-overview";
import { useEditParameterForm } from "./useEditParameterForm";

export type EditParameterProps = RenderEditHandlerProps<TestPointParameter>;

export const EditParameterForm = (props: EditParameterProps) => {
    const { formRef, onAfterSubmit, onSubmit, resource, onSubmitError } = props;
    const { id: parameterId } = resource;
    const { FormControl, schema, onEdit } = useEditParameterForm({ parameterId });
    return (
        <Box background="mono500Gray750" borderRadius="lg" padding={4}>
            <FormProvider
                schema={schema}
                formType="edit"
                onEdit={async (data, reset) => {
                    onSubmit();
                    try {
                        await onEdit(data, reset);
                    } catch {
                        onSubmitError("GENERIC");
                    }
                }}
                formRef={formRef}
                onAfterSubmit={onAfterSubmit}
                initialValues={resource}
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
