import { usePatchService } from "@voloiq/service";
import type { FlightTestCrew, FlightTestCrewPatch } from "./apiModels";

export type UseBulkEditFlightTestCrewOptions = {
    flightTestOrderId: string;
};
export const useBulkEditFlightTestCrew = (options: UseBulkEditFlightTestCrewOptions) => {
    const { flightTestOrderId } = options;

    const { sendRequest: bulkEditFlightTestCrew, state } = usePatchService<FlightTestCrewPatch[], FlightTestCrew[]>({
        route: `/ftd/v1/orders/${flightTestOrderId}/crew`,
    });

    return { bulkEditFlightTestCrew, isLoading: state === "pending" };
};
