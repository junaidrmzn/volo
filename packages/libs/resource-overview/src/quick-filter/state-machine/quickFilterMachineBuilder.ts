import { resetPage } from "../../list/state-machine/ListAction";
import { applyQuickFilter } from "./QuickFilterAction";
import type { QuickFilterProperty } from "./Types";

export type CreateQuickFilterMachineOptions = {
    getAllQuickFilters: () => QuickFilterProperty[];
};

export const createQuickFilterMachine = (config: CreateQuickFilterMachineOptions) => {
    const { getAllQuickFilters } = config;

    return {
        context: {
            quickFilterProperties: getAllQuickFilters(),
            appliedQuickFilter: {},
        },
        states: {
            quick_filter: {
                id: "quick_filter",
                on: {
                    APPLY_QUICK_FILTER: {
                        actions: [applyQuickFilter(), resetPage()],
                        target: ["#list.loading"],
                    },
                },
            },
        },
    };
};
