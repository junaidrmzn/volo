import { useOptimisticEditFlightTestOrder } from "@voloiq/flight-test-definition-api/v1";
import type { OnBulkAdd, OnBulkEdit } from "@voloiq/form";
import type { ConfigurationsFormSchema } from "./useConfigurationsFormSchema";

export type UseConfigurationsOnBulkOperationsOptions = {
    flightTestOrderId: string;
};

export const useConfigurationsOnBulkOperations = (options: UseConfigurationsOnBulkOperationsOptions) => {
    const { flightTestOrderId } = options;
    const { optimisticEditFlightTestOrder } = useOptimisticEditFlightTestOrder({ flightTestOrderId });

    const onBulkAddConfigurations: OnBulkAdd<ConfigurationsFormSchema> = async (data) => {
        await optimisticEditFlightTestOrder({
            data: {
                aircraftReleaseConfigurations: data,
            },
        });
    };

    const onBulkEditConfigurations: OnBulkEdit<ConfigurationsFormSchema> = async (data) => {
        await optimisticEditFlightTestOrder({
            data: {
                aircraftReleaseConfigurations: data,
            },
        });
    };

    return {
        onBulkAddConfigurations,
        // This is a special case in the BulkResourceForm. No deletion will happen, at least for the time being.
        onBulkDeleteConfigurations: () => Promise.resolve(),
        onBulkEditConfigurations,
    };
};
