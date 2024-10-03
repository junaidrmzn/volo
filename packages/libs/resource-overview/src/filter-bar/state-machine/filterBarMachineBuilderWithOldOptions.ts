import type { CreateFilterMachineOptions } from "../../filter/state-machine/filtersMachineBuilder";
import { resetPage } from "../../list/state-machine/ListAction";
import { transformFilterPropsToProperties } from "../conversion/transformFilterPropsToProperties";
import { applyFilters, loadFilters } from "./FilterAction";

export const createFilterBarMachineWithOldOptions = <EntityType>(config: CreateFilterMachineOptions<EntityType>) => {
    const { getAllFilters, getAllFiltersAsync } = config;

    return {
        context: {
            filterProperties: transformFilterPropsToProperties(getAllFilters()),
            appliedFilters: [],
        },
        states: {
            filter_bar: {
                id: "filter_bar",
                initial: "initializing",
                states: {
                    initializing: {
                        invoke: {
                            src: () => getAllFiltersAsync(),
                            onDone: {
                                target: ["ready"],
                                actions: loadFilters<EntityType>(),
                            },
                            onError: {
                                target: ["error"],
                            },
                        },
                    },
                    ready: {
                        on: {
                            APPLY_FILTERS: {
                                actions: [applyFilters(), resetPage()],
                                target: ["#list.loading"],
                            },
                        },
                    },
                    error: {},
                },
            },
        },
    };
};
