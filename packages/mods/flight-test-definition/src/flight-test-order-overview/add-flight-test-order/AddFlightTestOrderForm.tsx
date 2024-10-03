import { Box } from "@volocopter/design-library-react";
import { FlightTestOrderForm } from "@voloiq/flight-test-definition-forms";
import type { RenderAddHandlerProps } from "@voloiq/resource-overview";
import { useOnCreateFlightTestOrder } from "./useOnCreateFlightTestOrder";

export type AddFlightTestOrderProps = RenderAddHandlerProps;

export const AddFlightTestOrderForm = (props: AddFlightTestOrderProps) => {
    const { formRef, onAfterSubmit, onSubmit, onSubmitError } = props;
    const { onCreate } = useOnCreateFlightTestOrder();
    return (
        <Box background="mono500Gray750" borderRadius="lg" padding={4}>
            <FlightTestOrderForm
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
