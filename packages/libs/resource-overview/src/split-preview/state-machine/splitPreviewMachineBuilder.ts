import type { ResponseEnvelope } from "@voloiq/service";
import type { BaseResource } from "../../state-machine/BaseResource";
import { loadSplitPreview } from "./SplitPreviewAction";
import type { SelectEvent } from "./SplitPreviewEvent";

export type FetchResourceHandler<Resource> = (
    resourceId: string,
    resource?: Resource
) => Promise<ResponseEnvelope<Resource>>;
export type CreateSplitPreviewMachineOptions<Resource extends BaseResource> = {
    fetchResource: FetchResourceHandler<Resource>;
};

export const createSplitPreviewMachine = <Resource extends BaseResource>(
    config: CreateSplitPreviewMachineOptions<Resource>
) => {
    const { fetchResource } = config;

    return {
        states: {
            split_preview: {
                id: "split_preview",
                initial: "idle",
                states: {
                    idle: {},
                    loading: {
                        invoke: {
                            src: (_: unknown, event: SelectEvent<Resource>) => {
                                const { selectedResourceId, resource } = event;
                                if (!selectedResourceId) {
                                    return Promise.reject();
                                }

                                return fetchResource(selectedResourceId, resource);
                            },
                            onDone: {
                                target: ["loaded"],
                                actions: loadSplitPreview<Resource>(),
                            },
                            onError: {
                                target: ["error"],
                            },
                        },
                    },
                    loaded: {},
                    error: {},
                    on: {
                        RELOAD_SPLIT_PREVIEW: {
                            target: ["#split_preview.loading"],
                        },
                    },
                },
            },
        },
    };
};
