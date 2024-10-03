import { Box } from "@volocopter/design-library-react";
import { DefinitionForm } from "@voloiq/flight-test-definition-forms";
import type { RenderAddHandlerProps } from "@voloiq/resource-overview";
import { useOnCreateDefinition } from "./useOnCreateDefinition";

export type AddDefinitionProps = RenderAddHandlerProps;

export const AddDefinitionForm = (props: AddDefinitionProps) => {
    const { formRef, onAfterSubmit, onSubmit, onSubmitError } = props;
    const { onCreate } = useOnCreateDefinition();
    return (
        <Box background="mono500Gray750" borderRadius="lg" padding={4}>
            <DefinitionForm
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
            />
        </Box>
    );
};
