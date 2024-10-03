import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
    getAllTestHazardAssessmentsQueryKey,
    useGetAllTestHazardAssessmentsQuery,
} from "@voloiq/flight-test-definition-api/v1";
import { groupTestHazardAssessments } from "./groupTestHazardAssessments";

export const useTestHazardAssessmentSearch = () => {
    const [filter, setFilter] = useState<string>("");
    const queryClient = useQueryClient();
    const { testHazardAssessments, isLoading } = useGetAllTestHazardAssessmentsQuery({
        params: { filter },
    });

    const submitSearch = (searchText: string) => {
        queryClient.invalidateQueries({
            queryKey: getAllTestHazardAssessmentsQueryKey({ filter }),
        });
        setFilter(searchText ? `hazard LIKE "%${searchText}%"` : "");
    };

    return {
        isSearchLoading: isLoading,
        searchResultItems: testHazardAssessments,
        groupedSearchResultItems: groupTestHazardAssessments(testHazardAssessments),
        submitSearch,
    };
};
