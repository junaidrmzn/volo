import {
    Button,
    Center,
    HStack,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from "@volocopter/design-library-react";
import type { AxiosPromise } from "@voloiq/service";
import { useErrorToast, useIdSelectionContext } from "../../hooks";
import { useSuccessToast } from "../../hooks/useSuccessToast";
import { useResourcesTranslation } from "../../translations/useResourcesTranslation";

export type DeleteModalProps = {
    id: number | string;
    deleteFunction(id: unknown): AxiosPromise;
    entityName: string;
    entityId?: string;
    handleStatusNotification?: boolean;
    isOpen: boolean;
    onClose: () => void;
    refetch: () => void;
};

export const OverviewDeleteModal = (props: DeleteModalProps) => {
    const {
        id,
        deleteFunction,
        entityName,
        entityId,
        handleStatusNotification = true,
        onClose,
        isOpen,
        refetch,
    } = props;
    const { t } = useResourcesTranslation();
    const { selectedId, setSelectedId } = useIdSelectionContext();
    const { onError } = useErrorToast();
    const { onSuccess } = useSuccessToast(false);

    const onDelete = () => {
        deleteFunction(id)
            .then((response) => {
                if (response.status === 204 && handleStatusNotification) {
                    onSuccess();
                }
            })
            .catch((error) => {
                if (handleStatusNotification) {
                    onError(error);
                }
            })
            .finally(() => {
                refetch();
                setSelectedId(selectedId || "");
            });
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} variant="prompt">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{t("generic.delete-modal.heading", { entityName })}</ModalHeader>

                <ModalBody>
                    {entityId
                        ? t("generic.delete-modal.body-with-id", {
                              entityName,
                              entityId,
                          })
                        : t("generic.delete-modal.body", { entityName })}
                </ModalBody>

                <ModalFooter>
                    <Center>
                        <HStack>
                            <Button onClick={onClose} variant="primary">
                                {t("generic.delete-modal.cancel", { entityName })}
                            </Button>
                            <Button variant="secondary" onClick={onDelete} data-testid="popupModalDeleteButton">
                                {t("generic.delete-modal.delete", { entityName })}
                            </Button>
                        </HStack>
                    </Center>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
