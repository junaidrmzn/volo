import { useCreateService } from "@voloiq/service";
import type { TestPointInfoInsert, TestPointSequenceTestPointAssociation } from "./apiModels";

export type useBulkAddTestPointSequenceManualRowsOptions = {
    flightTestOrderId: string;
    testPointSequenceId: string;
};

export const useBulkAddTestPointSequenceManualRows = (options: useBulkAddTestPointSequenceManualRowsOptions) => {
    const { flightTestOrderId, testPointSequenceId } = options;

    const { sendRequest: bulkAddTestPointSequenceManualRows, state } = useCreateService<
        TestPointInfoInsert[],
        TestPointSequenceTestPointAssociation[]
    >({
        route: `/ftd/v1/orders/${flightTestOrderId}/test-point-sequence/${testPointSequenceId}/test-point-associations`,
    });

    return { bulkAddTestPointSequenceManualRows, isLoading: state === "pending" };
};
