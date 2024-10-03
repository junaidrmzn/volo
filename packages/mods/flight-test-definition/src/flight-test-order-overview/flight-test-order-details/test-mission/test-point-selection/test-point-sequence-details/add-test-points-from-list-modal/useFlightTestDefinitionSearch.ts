import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { P, match } from "ts-pattern";
import { INITIAL_PAGE_SIZE } from "@voloiq/flight-test-definition-api/constants";
import { getAllDefinitionsQueryKey, useGetAllDefinitionsQuery } from "@voloiq/flight-test-definition-api/v2";

export const useFlightTestDefinitionSearch = () => {
    const [size, setSize] = useState(INITIAL_PAGE_SIZE);
    const [filter, setFilter] = useState<string>("");
    const queryClient = useQueryClient();
    const { flightTestDefinitions, pagination, isLoading } = useGetAllDefinitionsQuery({
        serviceOptions: {
            params: { filter, size },
        },
    });

    const submitSearch = (searchText: string) => {
        queryClient.invalidateQueries({
            queryKey: getAllDefinitionsQueryKey({ params: { filter, size } }),
        });
        setSize(INITIAL_PAGE_SIZE);
        setFilter(searchText ? `ftdId LIKE "%${searchText}%" OR title LIKE "%${searchText}%"` : "");
    };

    const showMoreItems = () => {
        queryClient.invalidateQueries({
            queryKey: getAllDefinitionsQueryKey({ params: { filter, size } }),
        });
        setSize((oldCount) => oldCount + INITIAL_PAGE_SIZE);
    };

    const searchResultsTotal = match(pagination)
        .with({ totalElements: P.not(P.nullish) }, (pagination) => pagination.totalElements)
        .otherwise(() => 0);

    return {
        isSearchLoading: isLoading,
        searchResults: flightTestDefinitions,
        searchResultsTotal,
        submitSearch,
        showMoreItems,
    };
};
