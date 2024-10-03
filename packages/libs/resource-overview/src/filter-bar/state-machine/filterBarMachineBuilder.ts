import type { Property, SortingConfig } from "@volocopter/filter-react";
import { resetPage } from "../../list/state-machine/ListAction";
import { applyFilters } from "./FilterAction";

export type CreateFilterBarMachineOptions = {
    getAllFilters: () => Property[];
    getSortingConfig?: () => SortingConfig;
};

export const createFilterBarMachine = (config: CreateFilterBarMachineOptions) => {
    const { getAllFilters, getSortingConfig } = config;

    return {
        context: {
            filterProperties: getAllFilters(),
            sortingConfig: getSortingConfig?.(),
            appliedFilters: { filters: [] },
        },
        states: {
            filter_bar: {
                id: "filter_bar",
                on: {
                    APPLY_FILTERS: {
                        actions: [applyFilters(), resetPage()],
                        target: ["#list.loading"],
                    },
                },
            },
        },
    };
};
