import type { ResponseEnvelope } from "@voloiq/service";
import type { BaseResource } from "../../state-machine/BaseResource";
import type { SelectEvent } from "../../state-machine/ResourceEvent";
import { closePreview, loadPreview } from "./PreviewAction";

export type FetchResourceHandler<Resource> = (resourceId: string) => Promise<ResponseEnvelope<Resource>>;
export type CreatePreviewMachineOptions<Resource extends BaseResource> = {
    fetchPreviewResource: FetchResourceHandler<Resource>;
    getPreviewTitle: (resource: Resource) => string;
    /**
     * An optional function that checks if the selected resource can be edited, with a reason for the user if it cannot be.
     * If this function is not provided, the edit button is always enabled.
     */
    checkIfResourceIsEditable?: (resource: Resource) => { isResourceEditable: boolean; notEditableReason: string };
    /**
     * An optional function that checks if the selected resource can be deleted, with a reason for the user if it cannot be.
     * If this function is not provided, the deleted button is always enabled.
     */
    checkIfResourceIsDeletable?: (resource: Resource) => { isResourceDeletable: boolean; notDeletableReason: string };
};

export const createPreviewMachine = <Resource extends BaseResource>(config: CreatePreviewMachineOptions<Resource>) => {
    const { fetchPreviewResource, getPreviewTitle, checkIfResourceIsEditable, checkIfResourceIsDeletable } = config;

    return {
        states: {
            preview: {
                id: "preview",
                initial: "closed",
                states: {
                    loading: {
                        invoke: {
                            src: (_: unknown, event: SelectEvent) => {
                                const { selectedResourceId } = event;
                                if (!selectedResourceId) {
                                    return Promise.reject();
                                }

                                return fetchPreviewResource(selectedResourceId);
                            },
                            onDone: {
                                target: ["loaded"],
                                actions: loadPreview<Resource>(),
                            },
                            onError: {
                                target: ["error"],
                            },
                        },
                    },
                    loaded: {},
                    error: {},
                    closed: {
                        entry: closePreview<Resource>(),
                        type: "final",
                    },
                },
                on: {
                    RELOAD_PREVIEW: {
                        target: ["#preview.loading"],
                    },
                },
                meta: {
                    getPreviewTitle,
                    checkIfResourceIsEditable,
                    checkIfResourceIsDeletable,
                },
            },
        },
    };
};
