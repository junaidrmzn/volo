import {
    Button,
    Divider,
    Heading,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
} from "@volocopter/design-library-react";
import { MutableRefObject, ReactNode, useEffect, useRef } from "react";
import { useGlobalState } from "../global-state/useGlobalState";
import { BaseResource } from "../state-machine/BaseResource";
import { useResourceEditTranslations } from "./translations/useResourceEditTranslations";

export const useFormRef = () => useRef<HTMLFormElement | null>(null);

export type ErrorType = "ALREADY_EXISTS" | "GENERIC" | "BACKEND_FORM_ERROR";

export type RenderEditHandlerProps<Resource extends BaseResource> = {
    onSubmit: () => void;
    onAfterSubmit: () => void;
    onSubmitError: (type: ErrorType) => void;
    formRef: MutableRefObject<HTMLFormElement | null>;
    resource: Resource;
};

export type RenderEditHandler<Resource extends BaseResource> = (props: RenderEditHandlerProps<Resource>) => ReactNode;

export type ResourceEditProps<Resource extends BaseResource> = {
    renderEdit: RenderEditHandler<Resource>;
};

const useEditModal = () => {
    const [state] = useGlobalState();
    const { isOpen, onClose, onOpen } = useDisclosure();

    useEffect(() => {
        if (state.matches("edit") && !state.matches("edit.closed") && !isOpen) {
            onOpen();
        }
    });

    return { isOpen, onOpen, onClose };
};

export const EditModal = <Resource extends BaseResource>(props: ResourceEditProps<Resource>) => {
    const { renderEdit } = props;

    const [state, send] = useGlobalState();
    const formRef = useFormRef();
    const { isOpen, onClose } = useEditModal();
    const { t } = useResourceEditTranslations();

    const {
        context: { selectedResource },
        meta: {
            resourceOverview: { getResourceName },
            edit: { getEditTitle },
        },
    } = state;

    const onSubmit = () => send("SAVE");
    const onAfterSubmit = () => send("SAVED");
    const onSubmitError = (errorType: ErrorType = "GENERIC") =>
        send("ERROR", {
            errorType,
        });

    const onCancel = () => {
        onClose();
        send("CLOSE");
    };

    const title = getEditTitle?.(selectedResource) || getResourceName();

    return (
        <Modal {...props} isOpen={isOpen} onClose={onClose} size="4xl">
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton size="lg" onClick={onCancel} />
                <ModalHeader display="flex" alignItems="center">
                    {t("Edit")}&nbsp;<Heading>-&nbsp;{title}</Heading>
                </ModalHeader>
                <Divider />
                <ModalBody>
                    {renderEdit({ onSubmit, onAfterSubmit, onSubmitError, formRef, resource: selectedResource })}
                </ModalBody>
                <ModalFooter>
                    <Button onClick={onCancel} variant="secondary">
                        {t("Cancel")}
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => {
                            formRef?.current?.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
                        }}
                        isLoading={state.matches({ edit: "saving" })}
                    >
                        {t("Save")}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
