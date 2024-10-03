import { ServiceOptions, useGetService } from "@voloiq/service";
import type { TestPointSequence } from "./apiModels";

export type UseGetTestPointSequenceOptions = {
    flightTestOrderId: string;
    testPointSequenceId: string;
    serviceOptions?: Partial<ServiceOptions>;
};

export const useGetTestPointSequence = (options: UseGetTestPointSequenceOptions) => {
    const { flightTestOrderId, testPointSequenceId, serviceOptions } = options;

    const { data: testPointSequence, refetchData: getTestPointSequence } = useGetService<TestPointSequence>({
        route: `ftd/v1/orders/${flightTestOrderId}/test-point-sequence`,
        resourceId: testPointSequenceId,
        options: { manual: true },
        ...serviceOptions,
    });

    return { testPointSequence, getTestPointSequence };
};
