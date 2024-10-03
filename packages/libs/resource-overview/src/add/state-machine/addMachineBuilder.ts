import { match } from "ts-pattern";
import type { ResponseEnvelope } from "@voloiq/service";
import type { ErrorType } from "../ResourceAdd";
import { setSelectedResourceId } from "./AddActions";

export type AddErrorEvent = {
    errorType: ErrorType;
};

export type AddResourceHandler<Resource> = (resource: Partial<Resource>) => Promise<ResponseEnvelope<Resource>>;

export type AddMachineOptions = {
    sendBackendFormErrorNotification: () => void;
    sendBackendGenericErrorNotification: () => void;
    sendAlreadyExistsErrorNotification: () => void;
    sendSomeFailedErrorNotification: () => void;
    sendAllFailedErrorNotification: () => void;
    sendSuccessNotification: () => void;
    sendDuplicateFormErrorNotification: () => void;
};

export const createAddNotificationExtension = (addMachineOptions: AddMachineOptions) => {
    const {
        sendBackendFormErrorNotification,
        sendBackendGenericErrorNotification,
        sendAlreadyExistsErrorNotification,
        sendSomeFailedErrorNotification,
        sendAllFailedErrorNotification,
        sendSuccessNotification,
        sendDuplicateFormErrorNotification,
    } = addMachineOptions;

    return {
        states: {
            add: {
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
                                    (_context: any, event: AddErrorEvent) => {
                                        match(event.errorType)
                                            .with("ALL_FAILED", () => sendAllFailedErrorNotification())
                                            .with("SOME_FAILED", () => sendSomeFailedErrorNotification())
                                            .with("BACKEND_FORM_ERROR", () => sendBackendFormErrorNotification())
                                            .with("GENERIC", () => sendBackendGenericErrorNotification())
                                            .with("ALREADY_EXISTS", () => sendAlreadyExistsErrorNotification())
                                            .with("DUPLICATE_FORM", () => sendDuplicateFormErrorNotification())
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

export type CreateAddMachineOptions = {
    invokeOnSaved?: () => void;
    getAddTitle?: () => string;
};

export const createAddMachine = (options?: CreateAddMachineOptions) => {
    const { getAddTitle } = options || {};
    return {
        states: {
            add: {
                id: "add",
                initial: "closed",
                meta: { getAddTitle },
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
                            CANCEL: {
                                target: ["closed"],
                            },
                            OPEN_DETAILS: {
                                target: ["closed"],
                                actions: setSelectedResourceId(),
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
