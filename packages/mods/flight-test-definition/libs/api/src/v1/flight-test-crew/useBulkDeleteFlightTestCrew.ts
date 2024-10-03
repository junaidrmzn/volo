import { useDeleteService } from "@voloiq/service";

export type UseBulkDeleteFlightTestCrewOptions = {
    flightTestOrderId: string;
};
export const useBulkDeleteFlightTestCrew = (options: UseBulkDeleteFlightTestCrewOptions) => {
    const { flightTestOrderId } = options;

    const { sendRequest: bulkDeleteFlightTestCrew, state } = useDeleteService<{}, string[]>({
        route: `/ftd/v1/orders/${flightTestOrderId}/crew`,
    });

    return { bulkDeleteFlightTestCrew, isLoading: state === "pending" };
};
