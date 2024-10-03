import { ServiceOptions, useGetAllService } from "@voloiq/service";
import type { TestPointSequence } from "./apiModels";

export type UseGetAllTestPointSequencesOptions = {
    flightTestOrderId: string;
    serviceOptions?: Partial<ServiceOptions>;
};

export const useGetAllTestPointSequences = (options: UseGetAllTestPointSequencesOptions) => {
    const { flightTestOrderId, serviceOptions } = options;

    const { sendRequest } = useGetAllService<TestPointSequence>({
        route: `ftd/v1/orders/${flightTestOrderId}/test-point-sequence`,
        options: { manual: true },
        params: {
            orderBy: "createTime:asc",
        },
        ...serviceOptions,
    });

    return { getAllTestPointSequences: sendRequest };
};
