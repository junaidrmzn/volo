import type { TestPointParameter } from "@voloiq-typescript-api/ftd-types";
import { useCallback } from "react";
import { useFeatureFlags } from "@voloiq/feature-flags";
import { useGetAllTestPointGroups } from "@voloiq/flight-test-definition-api/v1";
import { useGetAllTestPointGroups as useGetAllTestPointGroupsV2 } from "@voloiq/flight-test-definition-api/v2";
import type { FetchAllResourceOptions } from "@voloiq/resource-overview";
import { serializeFilters } from "@voloiq/service";

export const useFetchAllTestPointGroups = () => {
    const { getAllTestPointGroups } = useGetAllTestPointGroups({ manual: true });
    const { getAllTestPointGroups: getAllTestPointGroupsV2 } = useGetAllTestPointGroupsV2({ manual: true });
    const { isFeatureFlagEnabled } = useFeatureFlags();

    const fetchAllTestPointGroups = useCallback(
        (options: FetchAllResourceOptions<TestPointParameter>) => {
            const { page, size, filterSet } = options;
            return isFeatureFlagEnabled("vte-1542")
                ? getAllTestPointGroupsV2({
                      params: {
                          size,
                          page,
                          ...(filterSet && filterSet.filters.length > 0
                              ? { filter: serializeFilters(filterSet) }
                              : undefined),
                          orderBy: "testPointId:asc",
                      },
                  })
                : getAllTestPointGroups({
                      params: {
                          size,
                          page,
                          ...(filterSet && filterSet.filters.length > 0
                              ? { filter: serializeFilters(filterSet) }
                              : undefined),
                          orderBy: "testPointId:asc",
                      },
                  });
        },
        [getAllTestPointGroups, getAllTestPointGroupsV2, isFeatureFlagEnabled]
    );

    return { fetchAllTestPointGroups };
};
