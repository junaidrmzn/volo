import { usePatchService } from "@voloiq/service";
import type { TestPointInfoPatch, TestPointSequenceTestPointAssociation } from "./apiModels";

export type UseBulkEditTestPointSequenceTestPointAssociationsOptions = {
    flightTestOrderId: string;
    testPointSequenceId: string;
};
export const useBulkEditTestPointSequenceTestPointAssociations = (
    options: UseBulkEditTestPointSequenceTestPointAssociationsOptions
) => {
    const { flightTestOrderId, testPointSequenceId } = options;

    const { sendRequest: bulkEditTestPointSequenceTestPointAssociations, state } = usePatchService<
        TestPointInfoPatch[],
        TestPointSequenceTestPointAssociation[]
    >({
        route: `/ftd/v1/orders/${flightTestOrderId}/test-point-sequence/${testPointSequenceId}/test-point-associations`,
    });

    return { bulkEditTestPointSequenceTestPointAssociations, isLoading: state === "pending" };
};
