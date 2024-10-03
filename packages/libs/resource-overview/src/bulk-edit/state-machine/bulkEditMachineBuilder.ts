import { match } from "ts-pattern";
import { AnyObjectSchema } from "@voloiq/form";
import { BaseResource } from "../../state-machine/BaseResource";
import { BulkEditResourcesHandler, ErrorType } from "../BulkEditModal";

export type BulkEditErrorEvent = {
    errorType: ErrorType;
};

export type BulkEditMachineNotificationOptions = {
    sendBackendFormErrorNotification: () => void;
    sendBackendGenericErrorNotification: () => void;
    sendAlreadyExistsErrorNotification: () => void;
    sendSuccessNotification: () => void;
};

export const createBulkEditNotificationExtension = (options: BulkEditMachineNotificationOptions) => {
    const {
        sendBackendFormErrorNotification,
        sendBackendGenericErrorNotification,
        sendAlreadyExistsErrorNotification,
        sendSuccessNotification,
    } = options;

    return {
        states: {
            bulk_edit: {
                states: {
                    saving: {
                        on: {
                            SAVED: {
                                actions: [sendSuccessNotification],
                            },
                            ERROR: {
                                actions: [
                                    // TODO type the context coming from the config
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    (_context: any, event: BulkEditErrorEvent) => {
                                        match(event.errorType)
                                            .with("BACKEND_FORM_ERROR", () => sendBackendFormErrorNotification())
                                            .with("GENERIC", () => sendBackendGenericErrorNotification())
                                            .with("ALREADY_EXISTS", () => sendAlreadyExistsErrorNotification())
                                            .exhaustive();
                                    },
                                ],
                            },
                        },
                    },
                },
            },
        },
    };
};

export type BulkEditMachineOptions<Resource extends BaseResource> = {
    getBulkEditTitle: (resource: Resource) => string;
    bulkEditResource: BulkEditResourcesHandler<Resource>;
    schema: AnyObjectSchema;
};

export const createBulkEditMachine = <Resource extends BaseResource>(
    bulkEditMachineOptions: BulkEditMachineOptions<Resource>
) => {
    const { getBulkEditTitle, bulkEditResource, schema } = bulkEditMachineOptions;

    return {
        context: {
            bulkEditResource,
            schema,
        },
        states: {
            bulk_edit: {
                id: "bulk_edit",
                initial: "closed",
                meta: { getBulkEditTitle },
                states: {
                    open: {
                        on: {
                            CLOSE: {
                                target: ["closed"],
                            },
                            SAVE: {
                                target: ["saving"],
                            },
                        },
                    },
                    saving: {
                        on: {
                            SAVED: {
                                target: ["closed"],
                            },
                            ERROR: {
                                target: ["open"],
                            },
                        },
                    },
                    closed: {},
                },
                on: {
                    OPEN_BULK: {
                        target: ["#bulk_edit.open"],
                    },
                    CLOSE_BULK: {
                        target: ["#bulk_edit.closed"],
                    },
                },
            },
        },
    };
};
