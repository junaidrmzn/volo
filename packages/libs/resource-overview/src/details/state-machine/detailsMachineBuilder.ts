import type { ResponseEnvelope } from "@voloiq/service";
import type { BaseResource } from "../../state-machine/BaseResource";
import { ResourceContext } from "../../state-machine/ResourceContext";
import { updateURLFromState } from "../../utils/urlUtils";
import { closeDetails, loadDetails } from "./DetailsAction";

export type FetchResourceHandler<Resource> = (resourceId: string) => Promise<ResponseEnvelope<Resource>>;
export type CreateDetailsMachineOptions<Resource extends BaseResource> = {
    fetchDetailsResource: FetchResourceHandler<Resource>;
    getDetailsTitle: (resource: Resource) => string;
    /**
     * An optional function that checks if the selected resource can be edited, with a reason for the user if it cannot be.
     * If this function is not provided, the edit button is always disabled.
     */
    checkIfResourceIsEditable?: (resource: Resource) => { isResourceEditable: boolean };
};

export const createDetailsMachine = <Resource extends BaseResource>(config: CreateDetailsMachineOptions<Resource>) => {
    const { fetchDetailsResource, getDetailsTitle, checkIfResourceIsEditable } = config;

    return {
        states: {
            details: {
                id: "details",
                initial: "closed",
                states: {
                    loading: {
                        invoke: {
                            src: (context: ResourceContext) => {
                                const { selectedResourceId, selectedResource } = context;

                                const resourceId = selectedResourceId ?? selectedResource?.id;

                                if (!resourceId) {
                                    return Promise.reject();
                                }
                                updateURLFromState(resourceId);

                                return fetchDetailsResource(resourceId);
                            },
                            onDone: {
                                target: ["loaded"],
                                actions: loadDetails<Resource>(),
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
                        entry: [closeDetails<Resource>(), () => updateURLFromState()],
                        type: "final",
                    },
                    edit: {
                        on: {
                            CLOSE: {
                                target: ["closed"],
                            },
                            SAVED: {
                                target: ["loading"],
                            },
                        },
                    },
                },
                on: {
                    RELOAD_DETAILS: {
                        target: ["#details.loading"],
                    },
                },
                meta: { getDetailsTitle, checkIfResourceIsEditable },
            },
        },
    };
};
