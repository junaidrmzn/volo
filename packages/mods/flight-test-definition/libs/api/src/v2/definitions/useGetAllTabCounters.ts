import { useGetService } from "@voloiq/service";
import type { TabCountersResponseBody } from "./apiModels";

export type UseGetTabCountersOptions = {
    definitionId?: string;
    manual?: boolean;
};

export const useGetAllTabCounters = (options: UseGetTabCountersOptions) => {
    const { definitionId, manual = true } = options;

    const { data: tabCounters, refetchData: getTabCounters } = useGetService<TabCountersResponseBody>({
        route: "/ftd/v2/definitions",
        resourceId: `${definitionId}/tab-counters`,
        options: {
            manual,
        },
    });

    return { tabCounters, getTabCounters };
};
