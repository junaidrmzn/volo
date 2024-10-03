import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { P, match } from "ts-pattern";
import { INITIAL_PAGE_SIZE } from "@voloiq/flight-test-definition-api/constants";
import {
    WindchillRequirement,
    getAllWindchillRequirementsQueryKey,
    useGetAllWindchillRequirementsQuery,
} from "@voloiq/flight-test-definition-api/v1";

export const useGetWindchillSearchedRequirements = () => {
    const [size, setSize] = useState(INITIAL_PAGE_SIZE);
    const [filter, setFilter] = useState<string>("");
    const queryClient = useQueryClient();
    const windChillRequirementsRef = useRef<WindchillRequirement[]>([]);
    const { windchillRequirements, pagination, isLoading } = useGetAllWindchillRequirementsQuery({
        params: { filter, size },
    });

    const submitSearch = (searchText: string) => {
        queryClient.invalidateQueries({
            queryKey: getAllWindchillRequirementsQueryKey({ filter, size }),
        });
        setSize(INITIAL_PAGE_SIZE);
        setFilter(
            searchText
                ? `windchillId LIKE "%${searchText}%" OR documentId LIKE "%${searchText}%" OR text LIKE "%${searchText}%"`
                : ""
        );
    };

    const showMoreItems = () => {
        queryClient.invalidateQueries({
            queryKey: getAllWindchillRequirementsQueryKey({ filter, size }),
        });
        setSize((oldCount) => oldCount + INITIAL_PAGE_SIZE);
    };

    const searchResultRequirementsTotal = match(pagination)
        .with({ totalElements: P.not(P.nullish) }, (pagination) => pagination.totalElements)
        .otherwise(() => 0);

    useEffect(() => {
        if (windchillRequirements && windchillRequirements.length > 0) {
            windChillRequirementsRef.current = windchillRequirements;
        }
    }, [windchillRequirements]);

    const dataToReturn = !isLoading ? windchillRequirements : windChillRequirementsRef.current;

    return {
        isSearchLoading: isLoading,
        searchResultRequirements: dataToReturn,
        searchResultRequirementsTotal,
        submitSearch,
        showMoreItems,
    };
};
