import type { SortingOption, SortingOrder } from "@voloiq/sorting-panel";
import { applySort } from "./SortAction";

export type CreateSortMachineOptions = {
    sortingOptions: SortingOption[];
    sortingOrder?: SortingOrder | undefined;
};

export const createSortMachine = (options: CreateSortMachineOptions) => {
    return {
        states: {
            sort: {
                id: "sort",
                initial: "closed",
                context: {
                    sortingOptions: options.sortingOptions,
                    sortingOrder: options.sortingOrder ?? "DESC",
                },
                states: {
                    open: {
                        on: {
                            APPLY_SORT: {
                                actions: applySort(),
                            },
                            CLOSE: {
                                target: ["closed"],
                            },
                        },
                    },
                    closed: {
                        type: "final",
                    },
                },
            },
        },
    };
};
