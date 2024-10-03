import { match } from "ts-pattern";
import { BaseResource } from "../../state-machine/BaseResource";
import type { ErrorType } from "../ResourceEdit";

export type EditErrorEvent = {
    errorType: ErrorType;
};

export type EditMachineNotificationOptions = {
    sendBackendFormErrorNotification: () => void;
    sendBackendGenericErrorNotification: () => void;
    sendAlreadyExistsErrorNotification: () => void;
    sendSuccessNotification: () => void;
};

export const createEditNotificationExtension = (editMachineNotificationOptions: EditMachineNotificationOptions) => {
    const {
        sendBackendFormErrorNotification,
        sendBackendGenericErrorNotification,
        sendAlreadyExistsErrorNotification,
        sendSuccessNotification,
    } = editMachineNotificationOptions;

    return {
        states: {
            edit: {
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
                                    (_context: any, event: EditErrorEvent) => {
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

export type EditMachineOptions<Resource extends BaseResource> = {
    getEditTitle: (resource: Resource) => string;
};

export const createEditMachine = <Resource extends BaseResource>(editMachineOptions: EditMachineOptions<Resource>) => {
    const { getEditTitle } = editMachineOptions;
    return {
        states: {
            edit: {
                id: "edit",
                initial: "closed",
                meta: { getEditTitle },
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
            },
        },
    };
};
