import type { ListContext } from "../../list/state-machine/ListContext";
import type { FetchAllResourcesHandler } from "../../list/state-machine/listMachineBuilder";
import type { BaseResource } from "../../state-machine/BaseResource";
import { moveToContext } from "./MultiPreviewAction";

export type CreateMultiPreviewMachineOptions<Resource extends BaseResource> = {
    /**
     * True if the current user is authorized to open the multi preview, false otherwise
     */
    canOpenMultiPreview: boolean;
    fetchAllResources: FetchAllResourcesHandler<Resource>;
    getMultiPreviewTitle: () => string;
    getMultiPreviewButtonTitle?: () => string;
};

export const createMultiPreviewMachine = <Resource extends BaseResource>(
    config: CreateMultiPreviewMachineOptions<Resource>
) => {
    const { getMultiPreviewTitle, fetchAllResources, getMultiPreviewButtonTitle } = config;
    return {
        states: {
            multiPreview: {
                id: "multiPreview",
                initial: "closed",
                meta: {
                    getMultiPreviewTitle,
                    getMultiPreviewButtonTitle,
                },
                states: {
                    loading: {
                        invoke: {
                            src: (context: ListContext<Resource>) =>
                                fetchAllResources({
                                    size: Number.MAX_SAFE_INTEGER,
                                    page: 1,
                                    filterSet: context.appliedFilterSet,
                                }),
                            onDone: {
                                actions: moveToContext<Resource>(),
                                target: "loaded",
                            },
                            onError: {
                                target: "error",
                            },
                        },
                    },
                    loaded: {
                        on: {
                            CLOSE: {
                                target: ["closed"],
                            },
                        },
                    },
                    closed: {
                        type: "final",
                    },
                    error: {
                        on: {
                            RELOAD_MULTI_PREVIEW: {
                                target: ["loading"],
                            },
                        },
                    },
                },
            },
        },
    };
};
