import type { FormProps, FormProviderProps } from "@voloiq/form";
import { FormProvider } from "@voloiq/form";
import { FlightTestOrderFormControls } from "./FlightTestOrderFormControls";
import type { FlightTestOrderFormSchema } from "./flightTestOrderFormSchema";
import { useFlightTestOrderForm } from "./useFlightTestOrderForm";

export type FlightTestOrderFormProps = FormProps<FlightTestOrderFormSchema> &
    Pick<FormProviderProps<FlightTestOrderFormSchema>, "formRef" | "onAfterSubmit" | "onSubmitError" | "formId">;

export const FlightTestOrderForm = (props: FlightTestOrderFormProps) => {
    const { FormControl, schema } = useFlightTestOrderForm();
    return (
        <FormProvider {...props} schema={schema}>
            <FlightTestOrderFormControls FormControl={FormControl} />
        </FormProvider>
    );
};
