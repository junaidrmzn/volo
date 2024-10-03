import type { FilterProps } from "@voloiq/filter-panel";
import type { ResponseEnvelope } from "@voloiq/service";
import { resetPage } from "../../list/state-machine/ListAction";
import { applyFilter, loadFilters } from "./FilterAction";

export type FetchResourceHandler<Resource> = (resourceId: string) => Promise<ResponseEnvelope<Resource>>;
export type CreateFilterMachineOptions<Resource> = {
    /**
     * The get all fitlers method needs to contain all filters, even when they're asynchronous. This is because the filters currently work like this and very likely will change with filters 2.0 because it will no longer be async then.
     */
    getAllFilters: () => FilterProps<Resource>[];
    /**
     * Should only deal with asynchronous filters, e.g. entities that need to be fetched from backend.
     */
    getAllFiltersAsync: () => Promise<FilterProps<Resource>[]>;
};

export const createFilterMachine = <EntityType>(config: CreateFilterMachineOptions<EntityType>) => {
    const { getAllFiltersAsync } = config;

    return {
        states: {
            filter: {
                id: "filter",
                initial: "closed",
                states: {
                    loading: {
                        invoke: {
                            src: () => getAllFiltersAsync(),
                            onDone: {
                                target: ["open"],
                                actions: loadFilters<EntityType>(),
                            },
                            onError: {
                                target: ["error"],
                            },
                        },
                    },
                    open: {
                        on: {
                            APPLY_FILTER: {
                                actions: [applyFilter<EntityType>(), resetPage()],
                            },
                            CLOSE: {
                                target: ["closed"],
                            },
                        },
                    },
                    error: {},
                    closed: {
                        type: "final",
                    },
                },
                on: {
                    RELOAD_FILTERS: {
                        target: ["#filter.loading"],
                    },
                },
            },
        },
    };
};
