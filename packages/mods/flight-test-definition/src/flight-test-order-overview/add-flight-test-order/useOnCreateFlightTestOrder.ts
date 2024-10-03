import type { FlightTestOrderInsert } from "@voloiq/flight-test-definition-api/v1";
import { useAddFlightTestOrder } from "@voloiq/flight-test-definition-api/v1";
import type { FlightTestOrderFormSchema } from "@voloiq/flight-test-definition-forms";
import type { OnCreateHandler } from "@voloiq/form";

export const useOnCreateFlightTestOrder = () => {
    const { addFlightTestOrder } = useAddFlightTestOrder();
    const onCreate: OnCreateHandler<FlightTestOrderFormSchema> = async (formData, reset) => {
        const data: FlightTestOrderInsert = {
            ...formData,
            masterModel: formData.masterModel.value,
        };
        await addFlightTestOrder({ data });
        reset();
    };

    return { onCreate };
};
