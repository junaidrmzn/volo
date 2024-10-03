import { Tag, TagProps } from "@volocopter/design-library-react";
import type { ReactElement } from "react";
import type { FilterSet } from "@voloiq/filter-panel";
import type { ResponseEnvelope } from "@voloiq/service";
import type { SortingConfiguration, SortingOrder } from "@voloiq/sorting-panel";
import type { QuickFilter } from "../../quick-filter/state-machine/Types";
import type { BaseResource } from "../../state-machine/BaseResource";
import { selectResource, unselectResource } from "../../state-machine/ResourceAction";
import { ResourceContext } from "../../state-machine/ResourceContext";
import { changePage, loadList, setContext } from "./ListAction";
import type { ListContext } from "./ListContext";

export type FetchAllResourceOptions<Resource> = {
    size: number;
    page: number;
    filterSet?: FilterSet<Resource>;
    sortingConfiguration?: SortingConfiguration;
    quickFilter?: QuickFilter;
};
export type FetchAllResourcesHandler<Resource extends BaseResource> = (
    options: FetchAllResourceOptions<Resource>
) => Promise<ResponseEnvelope<Resource[]>>;

export type CreateListMachineOptions<Resource extends BaseResource> = {
    fetchAllResources: FetchAllResourcesHandler<Resource>;
    pageSize?: number;
    /**
     * The aria-label property for the list
     */
    getListAriaLabel?: () => string;
    getModuleTitle?: () => string;
    getListTitle: () => string;
    getListDescription?: () => string;
    getListTitleTag?: () => ReactElement<TagProps, typeof Tag>;
    /**
     * The aria-label property for each card list item
     */
    getListItemName: (resource: Resource) => string;
    sortingOrder?: SortingOrder;
    useTable?: boolean;
    getTableColumns?: () => string[];
    pollingInterval?: number;
    usesNewNavigationConcept?: boolean;
};
export const createListMachine = <Resource extends BaseResource>(
    config: CreateListMachineOptions<Resource>,
    canRead: boolean
) => {
    const {
        fetchAllResources,
        getListTitle,
        getListTitleTag,
        getListDescription,
        getListItemName,
        pageSize: size = 10,
        getListAriaLabel,
        getModuleTitle,
        sortingOrder,
        useTable,
        getTableColumns,
        pollingInterval,
        usesNewNavigationConcept = false,
    } = config;

    return {
        context: {
            pageSize: size,
            page: 1,
            getListAriaLabel,
            sortingOrder,
            getTableColumns,
        },
        type: "parallel",
        states: {
            list: {
                id: "list",
                initial: "initialize",
                states: {
                    initialize: {
                        on: {
                            SET_CONTEXT: {
                                target: ["#list.initialLoading"],
                                actions: setContext<Resource>(),
                            },
                        },
                    },
                    initialLoading: {
                        type: "parallel",
                        states: {
                            loadingList: {
                                initial: "run",
                                states: {
                                    run: {
                                        invoke: {
                                            src: (context: ListContext<Resource>) =>
                                                fetchAllResources({
                                                    size: context.pageSize,
                                                    page: context.page,
                                                    filterSet: context.appliedFilterSet,
                                                    ...(context.appliedSortingConfiguration?.selectedOption && {
                                                        sortingConfiguration: {
                                                            selectedOption:
                                                                context.appliedSortingConfiguration?.selectedOption,
                                                            selectedOrder:
                                                                sortingOrder ??
                                                                context.appliedSortingConfiguration?.selectedOrder,
                                                        },
                                                    }),
                                                    quickFilter: context.appliedQuickFilter,
                                                }),
                                            onDone: {
                                                actions: loadList<Resource>(),
                                                target: "done",
                                            },
                                        },
                                    },
                                    done: {
                                        type: "final",
                                    },
                                },
                            },
                        },
                        onDone: [
                            {
                                target: ["loaded"],
                                cond: (context: ResourceContext) => context.selectedResourceId === undefined,
                            },
                            {
                                target: ["selected"],
                            },
                        ],
                    },
                    loading: {
                        invoke: {
                            src: (context: ListContext<Resource>) =>
                                fetchAllResources({
                                    size: context.pageSize,
                                    page: context.page,
                                    filterSet: context.appliedFilterSet,
                                    sortingConfiguration: context.appliedSortingConfiguration,
                                    quickFilter: context.appliedQuickFilter,
                                }),
                            onDone: { target: ["loaded"], actions: loadList<Resource>() },
                            onError: {
                                target: ["error"],
                            },
                        },
                    },
                    loaded: {
                        after: {
                            [`${pollingInterval}`]: [
                                {
                                    target: "polling",
                                    cond: () => pollingInterval,
                                },
                            ],
                        },
                    },
                    polling: {
                        invoke: {
                            src: (context: ListContext<Resource>) =>
                                fetchAllResources({
                                    size: context.pageSize,
                                    page: context.page,
                                    filterSet: context.appliedFilterSet,
                                    sortingConfiguration: context.appliedSortingConfiguration,
                                    quickFilter: context.appliedQuickFilter,
                                }),
                            onDone: {
                                target: "loaded",
                                actions: loadList<Resource>(),
                            },
                        },
                    },
                    error: {},
                    selected: {
                        on: {
                            SELECT: {
                                target: ["selected"],
                                actions: selectResource(),
                            },
                            UNSELECT: {
                                target: ["loaded"],
                                actions: unselectResource(),
                            },
                        },
                    },
                },
                on: {
                    CHANGE_PAGE: {
                        target: ["#list.loading"],
                        actions: changePage<Resource>(),
                    },
                    RELOAD_LIST: {
                        target: ["#list.loading"],
                    },
                },
                meta: {
                    canRead,
                    useTable,
                    getListTitle,
                    getListTitleTag,
                    getListDescription,
                    getListItemName,
                    getModuleTitle,
                    usesNewNavigationConcept,
                },
            },
        },
    };
};
