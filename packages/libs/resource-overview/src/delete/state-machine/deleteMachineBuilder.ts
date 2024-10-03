import type { BaseResource } from "../../state-machine/BaseResource";
import type { ConfirmDeletionEvent } from "./DeleteEvent";

export type DeleteErrorEvent = {
    errorType: "GENERIC";
};

export type DeleteMachineOptions = {
    sendSuccessNotification: () => void;
    sendBackendGenericErrorNotification: () => void;
};

export const createDeleteNotificationExtension = (deleteMachineOptions: DeleteMachineOptions) => {
    const { sendSuccessNotification, sendBackendGenericErrorNotification } = deleteMachineOptions;
    return {
        states: {
            delete: {
                states: {
                    deleting: {
                        invoke: {
                            onDone: {
                                actions: sendSuccessNotification,
                            },
                            onError: {
                                target: ["error"],
                                actions: sendBackendGenericErrorNotification,
                            },
                        },
                    },
                },
            },
        },
    };
};

export type DeleteResourceHandler = (resourceId: string) => Promise<void>;
export type CreateDeleteMachineOptions<Resource extends BaseResource> = {
    deleteResource: DeleteResourceHandler;
    /**
     * A function that returns the localized texts for the confirmation modal and delete button
     */
    getDeleteTexts: (resource: Resource) => {
        confirmationModal: {
            headerText: string;
            bodyText: string;
            deleteButtonText?: string;
            cancelButtonText?: string;
        };
        deleteButtonText?: string;
    };
    invokeOnDeleted?: () => void;
    deleteSuccessTexts?: {
        successToastHeaderText?: string;
        successToastBodyText?: string;
    };
};

export const createDeleteMachine = <Resource extends BaseResource>(config: CreateDeleteMachineOptions<Resource>) => {
    const { deleteResource, getDeleteTexts, deleteSuccessTexts } = config;

    return {
        states: {
            delete: {
                id: "delete",
                initial: "initial",
                states: {
                    initial: {},
                    confirming: {
                        on: {
                            CONFIRM_DELETION: {
                                target: ["deleting"],
                            },
                            CANCEL_DELETION: {
                                target: ["initial"],
                            },
                        },
                    },
                    deleting: {
                        invoke: {
                            src: (_: unknown, event: ConfirmDeletionEvent) => {
                                const { selectedResourceId } = event;
                                if (!selectedResourceId) {
                                    return Promise.reject();
                                }
                                return deleteResource(selectedResourceId);
                            },
                            onDone: {
                                target: ["deleted"],
                            },
                            onError: {
                                target: ["error"],
                            },
                        },
                    },
                    error: {},
                },
                meta: {
                    getDeleteTexts,
                    deleteSuccessTexts,
                },
            },
        },
    };
};
