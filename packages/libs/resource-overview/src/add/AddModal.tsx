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
import { useResourceAddTranslations } from "./translations/useResourceAddTranslations";
import { useResourceAdd } from "./useResourceAdd";

export const useFormRef = () => useRef<HTMLFormElement | null>(null);

export type ErrorType =
    | "ALREADY_EXISTS"
    | "GENERIC"
    | "BACKEND_FORM_ERROR"
    | "ALL_FAILED"
    | "SOME_FAILED"
    | "DUPLICATE_FORM";

export type RenderAddHandlerProps = {
    onSubmit: () => void;
    onAfterSubmit: () => void;
    onSubmitError: (errorType: ErrorType) => void;
    openDetails: (resourceId: string) => void;
    formRef: MutableRefObject<HTMLFormElement | null>;
    setSaveCallback: (saveCallbackFunction: () => void) => void;
    setIsSaveButtonDisabled: (isSaveButtonDisabled: boolean) => void;
    onCancel: () => void;
};
export type RenderAddHandler = (props: RenderAddHandlerProps) => ReactNode;

export type ResourceAddProps = {
    renderAdd: RenderAddHandler;
};

const useAddModal = () => {
    const [state] = useGlobalState();
    const { isOpen, onClose, onOpen } = useDisclosure();

    useEffect(() => {
        if (state.matches("add") && !state.matches("add.closed") && !isOpen) {
            onOpen();
        }
    });

    return { isOpen, onOpen, onClose };
};

export const AddModal = (props: ResourceAddProps) => {
    const { renderAdd } = props;
    const { t } = useResourceAddTranslations();
    const { isOpen, onClose } = useAddModal();
    const { setIsSaveButtonDisabled, isSaveButtonDisabled } = useResourceAdd();

    const [state, send] = useGlobalState();
    const formRef = useFormRef();

    const {
        meta: {
            resourceOverview: { getResourceName },
        },
    } = state;

    const onSubmit = () => send("SAVE");
    const onAfterSubmit = () => send("SAVED");
    const onCancel = () => send("CANCEL");
    const openDetails = (resourceId: string) => send({ type: "OPEN_DETAILS", selectedResourceId: resourceId });
    const onSubmitError = (errorType: ErrorType) =>
        send("ERROR", {
            errorType,
        });
    const onCloseModal = () => {
        onClose();
        send("CLOSE");
    };

    let saveCallback: () => void | undefined;

    const setSaveCallback = (saveCallbackFunction: () => void) => {
        saveCallback = saveCallbackFunction;
    };

    return (
        <Modal {...props} isOpen={isOpen} onClose={onClose} size="lg">
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton size="lg" onClick={onCloseModal} />
                <ModalHeader display="flex" alignItems="center">
                    {t("Add")}&nbsp;<Heading>-&nbsp;{getResourceName()}</Heading>
                </ModalHeader>
                <Divider />
                <ModalBody>
                    {renderAdd({
                        onSubmit,
                        onAfterSubmit,
                        onSubmitError,
                        formRef,
                        setSaveCallback,
                        setIsSaveButtonDisabled,
                        openDetails,
                        onCancel,
                    })}
                </ModalBody>
                <ModalFooter>
                    <Button onClick={onCloseModal} variant="secondary">
                        {t("Cancel")}
                    </Button>
                    <Button
                        variant="primary"
                        isDisabled={isSaveButtonDisabled}
                        onClick={() => {
                            formRef?.current?.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
                            if (saveCallback) {
                                saveCallback();
                            }
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
