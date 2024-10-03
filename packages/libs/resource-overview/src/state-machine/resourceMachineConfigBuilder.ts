import { send } from "xstate";
import type { Resource } from "@voloiq/auth";
import type { CreateActionBarMachineOptions } from "../action-bar/state-machine/actionBarMachineBuilder";
import { createActionBarMachine } from "../action-bar/state-machine/actionBarMachineBuilder";
import type { CreateAddMachineOptions } from "../add/state-machine/addMachineBuilder";
import { createAddMachine } from "../add/state-machine/addMachineBuilder";
import { BulkEditMachineOptions, createBulkEditMachine } from "../bulk-edit/state-machine/bulkEditMachineBuilder";
import type { CreateDeleteMachineOptions } from "../delete/state-machine/deleteMachineBuilder";
import { createDeleteMachine } from "../delete/state-machine/deleteMachineBuilder";
import type { CreateDetailsMachineOptions } from "../details/state-machine/detailsMachineBuilder";
import { createDetailsMachine } from "../details/state-machine/detailsMachineBuilder";
import { EditMachineOptions, createEditMachine } from "../edit/state-machine/editMachineBuilder";
import type { CreateFilterBarMachineOptions } from "../filter-bar/state-machine/filterBarMachineBuilder";
import { createFilterBarMachine } from "../filter-bar/state-machine/filterBarMachineBuilder";
import { createFilterBarMachineWithOldOptions } from "../filter-bar/state-machine/filterBarMachineBuilderWithOldOptions";
import { applyFilter, loadFilters } from "../filter/state-machine/FilterAction";
import type { CreateFilterMachineOptions } from "../filter/state-machine/filtersMachineBuilder";
import { createFilterMachine } from "../filter/state-machine/filtersMachineBuilder";
import { loadList, resetPage } from "../list/state-machine/ListAction";
import type { CreateListMachineOptions } from "../list/state-machine/listMachineBuilder";
import { createListMachine } from "../list/state-machine/listMachineBuilder";
import type { CreateMultiPreviewMachineOptions } from "../multi-preview/state-machine/multiPreviewMachineBuilder";
import { createMultiPreviewMachine } from "../multi-preview/state-machine/multiPreviewMachineBuilder";
import type { CreatePreviewMachineOptions } from "../preview/state-machine/previewMachineBuilder";
import { createPreviewMachine } from "../preview/state-machine/previewMachineBuilder";
import { createQuickFilterMachine } from "../quick-filter/state-machine/quickFilterMachineBuilder";
import type { CreateQuickFilterMachineOptions } from "../quick-filter/state-machine/quickFilterMachineBuilder";
import { createSidePanelMachine } from "../side-panel/state-machine/sidePanelMachineBuilder";
import { applySort } from "../sort/state-machine/SortAction";
import type { CreateSortMachineOptions } from "../sort/state-machine/sortMachineBuilder";
import { createSortMachine } from "../sort/state-machine/sortMachineBuilder";
import {
    CreateSplitPreviewMachineOptions,
    createSplitPreviewMachine,
} from "../split-preview/state-machine/splitPreviewMachineBuilder";
import { mergeWithArrays } from "../utils/mergeWithArrays";
import type { BaseResource } from "./BaseResource";
import { selectResource, unselectResource } from "./ResourceAction";
import type { ResourceContext } from "./ResourceContext";

export type AuthorizationOptions = {
    /**
     * True if the current user is authorized to create a resource, false otherwise
     */
    canCreate: boolean;
    /**
     * True if the current user is authorized to read a resource, false otherwise
     */
    canRead: boolean;
    /**
     * True if the current user is authorized to update a resource, false otherwise
     */
    canUpdate: boolean;
    /**
     * True if the current user is authorized to delete a resource, false otherwise
     */
    canDelete: boolean;
};

export type ResourceMachineConfigBuilderOptions = {
    /**
     * The localized name of the resource (e.g. Aircraft)
     */
    getResourceName?: () => string;
    getSuccessToastLabelPrefix?: () => string;
} & AuthorizationOptions;

export class ResourceMachineConfigBuilder {
    // TODO type the config
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private config: any;

    /**
     * Steps to be executed in the build method when the configuration is complete.
     * This was created so that the order in which we call each "withX" method does not matter for the consumer.
     */
    private buildSteps: Function[] = [];

    constructor(options: ResourceMachineConfigBuilderOptions) {
        const { canCreate, canDelete, canRead, canUpdate, ...otherOptions } = options;
        this.config = {
            id: "resourceOverview",
            meta: { ...otherOptions, canCreate, canDelete, canRead, canUpdate },
            context: {
                filters: [],
            },
        };
    }

    withList<Resource extends BaseResource>(config: CreateListMachineOptions<Resource>) {
        this.config = mergeWithArrays(this.config, createListMachine(config, this.config.meta.canRead));
        return this;
    }

    private withSelection() {
        this.config = mergeWithArrays(this.config, {
            states: {
                list: {
                    states: {
                        loading: {
                            invoke: {
                                onDone: [
                                    {
                                        target: ["loaded"],
                                        actions: loadList<Resource>(),
                                        cond: (context: ResourceContext) => context.selectedResourceId === undefined,
                                    },
                                    {
                                        target: ["selected"],
                                        actions: loadList<Resource>(),
                                    },
                                ],
                            },
                        },
                        loaded: {
                            on: {
                                SELECT: {
                                    target: ["selected"],
                                    actions: selectResource(),
                                },
                            },
                        },
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
                },
            },
        });

        return this;
    }

    withDetails<Resource extends BaseResource>(config: CreateDetailsMachineOptions<Resource>) {
        if (!this.config.meta.canRead) {
            return this;
        }

        this.withSelection();
        this.config = mergeWithArrays(this.config, createDetailsMachine(config));
        this.config = mergeWithArrays(this.config, {
            states: {
                list: {
                    states: {
                        selected: {
                            on: {
                                DETAILS: {
                                    target: ["#details.loading"],
                                },
                            },
                        },
                    },
                },
                details: {
                    states: {
                        loaded: {
                            on: {
                                CLOSE: {
                                    target: ["#list.loading"],
                                    actions: [unselectResource()],
                                },
                                EDIT: {
                                    target: ["#details.edit"],
                                },
                            },
                        },
                    },
                },
            },
        });

        this.buildSteps.push(() => {
            if (this.config.states.preview) {
                this.config = mergeWithArrays(this.config, {
                    states: {
                        list: {
                            states: {
                                selected: {
                                    on: {
                                        DETAILS: {
                                            target: ["#preview.closed"],
                                        },
                                    },
                                },
                            },
                        },
                    },
                });
            }
        });

        return this;
    }

    withPreview<Resource extends BaseResource>(config: CreatePreviewMachineOptions<Resource>) {
        if (!this.config.meta.canRead) {
            return this;
        }

        this.withSelection();
        this.config = mergeWithArrays(this.config, createPreviewMachine(config));
        this.config = mergeWithArrays(this.config, {
            states: {
                list: {
                    states: {
                        loaded: {
                            on: {
                                SELECT: {
                                    target: ["#preview.loading"],
                                },
                                CLOSE_PREVIEW: {
                                    actions: unselectResource(),
                                },
                            },
                        },
                        selected: {
                            on: {
                                SELECT: {
                                    target: ["#preview.loading"],
                                },
                                UNSELECT: {
                                    target: ["#preview.closed"],
                                },
                                CLOSE_PREVIEW: {
                                    target: ["#preview.closed"],
                                    actions: [unselectResource()],
                                },
                            },
                        },
                    },
                    on: {
                        OPEN_PREVIEW: {
                            target: ["#preview.loading"],
                        },
                        CLOSE_PREVIEW: {
                            target: ["#preview.closed"],
                            actions: [unselectResource()],
                        },
                    },
                },
            },
        });

        this.buildSteps.push(() => {
            if (this.config.states.details) {
                this.config = mergeWithArrays(this.config, {
                    states: {
                        list: {
                            states: {
                                selected: {
                                    on: {
                                        DETAILS: {
                                            target: ["#preview.closed"],
                                        },
                                    },
                                },
                            },
                        },
                    },
                });
            }
        });

        return this;
    }

    withAdd(config?: CreateAddMachineOptions) {
        if (!this.config.meta.canCreate) {
            return this;
        }

        const invoke = () => {
            const { invokeOnSaved } = config ?? {};
            if (typeof invokeOnSaved === "function") {
                invokeOnSaved();
            }
        };

        this.config = mergeWithArrays(this.config, createAddMachine(config ?? { getAddTitle: () => "" }));
        this.config = mergeWithArrays(this.config, {
            states: {
                add: {
                    states: {
                        saving: {
                            on: {
                                SAVED: {
                                    target: ["#list.loading"],
                                },
                            },
                            invoke: {
                                src: invoke,
                            },
                        },
                    },
                },
            },
        });

        this.buildSteps.push(
            () => {
                if (this.config.states.details) {
                    this.config = mergeWithArrays(this.config, {
                        states: {
                            add: {
                                states: {
                                    saving: {
                                        on: {
                                            OPEN_DETAILS: {
                                                target: ["#details.loading"],
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    });
                }
            },
            () => {
                const statesWhereAddIsAllowed = ["list", "preview", "filter"].filter(
                    (state) => this.config.states[state] !== undefined
                );
                this.config = mergeWithArrays(this.config, {
                    states: {
                        ...Object.fromEntries(
                            statesWhereAddIsAllowed.map((state) => [
                                state,
                                {
                                    on: {
                                        ADD: {
                                            target: ["#add.open"],
                                        },
                                    },
                                },
                            ])
                        ),
                    },
                });
            }
        );

        return this;
    }

    withDelete<Resource extends BaseResource>(config: CreateDeleteMachineOptions<Resource>) {
        if (!this.config.meta.canDelete) {
            return this;
        }

        const invoke = () => {
            const { invokeOnDeleted } = config;
            if (typeof invokeOnDeleted === "function") {
                invokeOnDeleted();
            }
        };

        this.withSelection();
        this.config = mergeWithArrays(this.config, createDeleteMachine(config));
        this.config = mergeWithArrays(this.config, {
            states: {
                preview: {
                    states: {
                        loaded: {
                            on: {
                                DELETE: {
                                    target: ["#delete.confirming"],
                                },
                            },
                        },
                    },
                },
                delete: {
                    states: {
                        deleted: {
                            entry: [send("CLOSE_PREVIEW"), send("RELOAD_LIST")],
                            invoke: {
                                src: invoke,
                            },
                        },
                    },
                },
            },
        });

        return this;
    }

    withFilter<Resource extends BaseResource>(config: CreateFilterMachineOptions<Resource>) {
        if (!this.config.meta.canRead) {
            return this;
        }

        this.config = mergeWithArrays(this.config, createFilterBarMachineWithOldOptions<Resource>(config));

        this.config = mergeWithArrays(this.config, createFilterMachine<Resource>(config));
        const { getAllFiltersAsync, getAllFilters } = config;
        this.config = mergeWithArrays(this.config, {
            context: {
                filters: getAllFilters(),
            },
            states: {
                list: {
                    states: {
                        initialLoading: {
                            states: {
                                loadingFilters: {
                                    initial: "run",
                                    states: {
                                        run: {
                                            invoke: {
                                                src: () => getAllFiltersAsync(),
                                                onDone: {
                                                    actions: loadFilters<Resource>(),
                                                    target: "done",
                                                },
                                                onError: {
                                                    target: ["#list.loading", "#filter.error", "#filter_bar.error"],
                                                },
                                            },
                                        },
                                        done: {
                                            type: "final",
                                        },
                                    },
                                },
                            },
                        },
                        selected: {
                            on: {
                                APPLY_UPDATE_FILTER: {
                                    target: ["#list.loading"],
                                    actions: [applyFilter<Resource>(), resetPage()],
                                },
                            },
                        },
                        loaded: {
                            on: {
                                APPLY_UPDATE_FILTER: {
                                    target: ["#list.loading"],
                                    actions: [applyFilter<Resource>(), resetPage()],
                                },
                            },
                        },
                        error: {
                            on: {
                                APPLY_UPDATE_FILTER: {
                                    target: ["#list.loading"],
                                    actions: [applyFilter<Resource>(), resetPage()],
                                },
                            },
                        },
                    },
                    on: {
                        OPEN_FILTERS: {
                            target: ["#filter.open"],
                            actions: [unselectResource()],
                        },
                        CLOSE_FILTERS: {
                            target: ["#filter.closed"],
                        },
                    },
                },
                filter: {
                    states: {
                        open: {
                            on: {
                                APPLY_FILTER: {
                                    target: ["#list.loading"],
                                },
                            },
                        },
                    },
                    on: {
                        SELECT: {
                            target: ["#filter.closed"],
                        },
                    },
                },
            },
        });

        this.buildSteps.push(() => {
            if (this.config.states.sort) {
                this.config = mergeWithArrays(this.config, {
                    states: {
                        list: {
                            on: {
                                OPEN_FILTERS: {
                                    target: ["#sort.closed"],
                                },
                            },
                        },
                    },
                });
            }
        });

        return this;
    }

    withFilterBar(config: CreateFilterBarMachineOptions) {
        if (!this.config.meta.canRead) {
            return this;
        }

        this.config = mergeWithArrays(this.config, createFilterBarMachine(config));

        return this;
    }

    withSort(config: CreateSortMachineOptions) {
        if (!this.config.meta.canRead) {
            return this;
        }

        this.config = mergeWithArrays(this.config, createSortMachine(config));
        const { sortingOptions, sortingOrder } = config;
        this.config = mergeWithArrays(this.config, {
            context: {
                sortingOptions,
                sortingOrder,
            },
            states: {
                list: {
                    states: {
                        loaded: {
                            on: {
                                APPLY_UPDATE_SORT: {
                                    target: ["#list.loading"],
                                    actions: applySort(),
                                },
                            },
                        },
                        error: {
                            on: {
                                APPLY_UPDATE_SORT: {
                                    target: ["#list.loading"],
                                    actions: applySort(),
                                },
                            },
                        },
                    },
                    on: {
                        OPEN_SORT: {
                            target: ["#sort.open"],
                            actions: [unselectResource()],
                        },
                        CLOSE_SORT: {
                            target: ["#sort.closed"],
                        },
                    },
                },
                sort: {
                    states: {
                        open: {
                            on: {
                                APPLY_SORT: {
                                    target: ["#list.loading"],
                                },
                            },
                        },
                    },
                    on: {
                        SELECT: {
                            target: ["#sort.closed"],
                        },
                    },
                },
            },
        });

        this.buildSteps.push(() => {
            if (this.config.states.filter) {
                this.config = mergeWithArrays(this.config, {
                    states: {
                        list: {
                            on: {
                                OPEN_SORT: {
                                    target: ["#filter.closed"],
                                },
                            },
                        },
                    },
                });
            }
        });

        return this;
    }

    withEdit<Resource extends BaseResource>(options?: EditMachineOptions<Resource>) {
        if (!this.config.meta.canUpdate) {
            return this;
        }

        this.withSelection();
        this.config = mergeWithArrays(this.config, createEditMachine(options ?? { getEditTitle: () => "" }));
        this.config = mergeWithArrays(this.config, {
            states: {
                list: {
                    states: {
                        selected: {
                            on: {
                                EDIT: {
                                    target: ["#edit.open"],
                                },
                            },
                        },
                    },
                },
                edit: {
                    states: {
                        saving: {
                            on: {
                                SAVED: {
                                    target: ["#list.loading"],
                                    actions: [unselectResource()],
                                },
                            },
                        },
                    },
                },
            },
        });

        this.buildSteps.push(() => {
            if (this.config.states.preview) {
                this.config = mergeWithArrays(this.config, {
                    states: {
                        edit: {
                            states: {
                                saving: {
                                    on: {
                                        SAVED: {
                                            target: ["#preview.closed"],
                                        },
                                    },
                                },
                            },
                        },
                    },
                });
            }
        });

        return this;
    }

    withMultiPreview<Resource extends BaseResource>(config: CreateMultiPreviewMachineOptions<Resource>) {
        if (!config.canOpenMultiPreview) {
            return this;
        }

        this.withSelection();
        this.config = mergeWithArrays(this.config, createMultiPreviewMachine(config));
        this.config = mergeWithArrays(this.config, {
            states: {
                list: {
                    states: {
                        loaded: {
                            on: {
                                SELECT: {
                                    target: ["#multiPreview.closed"],
                                },
                            },
                        },
                    },
                    on: {
                        OPEN_MULTI_PREVIEW: {
                            target: ["#multiPreview.loading"],
                            actions: [unselectResource()],
                        },
                        CLOSE_MULTI_PREVIEW: {
                            target: ["#multiPreview.closed"],
                        },
                    },
                },
            },
        });

        this.buildSteps.push(
            () => {
                if (this.config.states.details) {
                    this.config = mergeWithArrays(this.config, {
                        states: {
                            list: {
                                states: {
                                    selected: {
                                        on: {
                                            DETAILS: {
                                                target: ["#multiPreview.closed"],
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    });
                }
            },
            () => {
                if (this.config.states.filter) {
                    this.config = mergeWithArrays(this.config, {
                        states: {
                            multiPreview: {
                                states: {
                                    loaded: {
                                        on: {
                                            APPLY_UPDATE_FILTER: {
                                                target: ["#multiPreview.loading"],
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    });
                }
            }
        );

        return this;
    }

    withActionBar(config: CreateActionBarMachineOptions) {
        this.config = mergeWithArrays(this.config, createActionBarMachine(config));
        return this;
    }

    withQuickFilter(config: CreateQuickFilterMachineOptions) {
        if (!this.config.meta.canRead) {
            return this;
        }

        this.config = mergeWithArrays(this.config, createQuickFilterMachine(config));

        return this;
    }

    withSidePanel() {
        if (!this.config.meta.canRead) {
            return this;
        }

        this.withSelection();
        this.config = mergeWithArrays(this.config, createSidePanelMachine());

        return this;
    }

    withBulkEdit<Resource extends BaseResource>(options: BulkEditMachineOptions<Resource>) {
        if (!this.config.meta.canUpdate) return this;
        this.withSelection();
        this.config = mergeWithArrays(this.config, createBulkEditMachine(options));

        return this;
    }

    withSplitPreview<Resource extends BaseResource>(options: CreateSplitPreviewMachineOptions<Resource>) {
        if (!this.config.meta.canRead) {
            return this;
        }

        this.withSelection();
        this.config = mergeWithArrays(this.config, createSplitPreviewMachine(options));
        this.config = mergeWithArrays(this.config, {
            states: {
                list: {
                    states: {
                        loaded: {
                            on: {
                                SELECT: {
                                    target: ["#split_preview.loading"],
                                },
                            },
                        },
                        selected: {
                            on: {
                                SELECT: {
                                    target: ["#split_preview.loading"],
                                },
                            },
                        },
                    },
                },
            },
        });

        return this;
    }

    build() {
        for (const step of this.buildSteps) {
            step();
        }
        return this.config;
    }
}
