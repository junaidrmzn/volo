import { useCreateService } from "@voloiq/service";
import type { FlightTestCrew, FlightTestCrewInsert } from "./apiModels";

export type UseBulkAddFlightTestCrewOptions = {
    flightTestOrderId: string;
};
export const useBulkAddFlightTestCrew = (options: UseBulkAddFlightTestCrewOptions) => {
    const { flightTestOrderId } = options;

    const { sendRequest: bulkAddFlightTestCrew, state } = useCreateService<FlightTestCrewInsert[], FlightTestCrew[]>({
        route: `/ftd/v1/orders/${flightTestOrderId}/crew`,
    });

    return { bulkAddFlightTestCrew, isLoading: state === "pending" };
};
