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
import type { AircraftType } from "@voloiq/aircraft-management-api/v1";
import { useNavigate } from "@voloiq/routing";
import { useErrorToast } from "../../hooks";
import { useSuccessToast } from "../../hooks/useSuccessToast";
import { useResourcesTranslation } from "../../translations/useResourcesTranslation";
import { useDeleteAircraftTypeService } from "./useDeleteAircraftTypeService";

export type DeleteModalProps = {
    id: number | string;
    aircraftTypeData: AircraftType | undefined;
    entityName: string;
    entityId?: string;
    handleStatusNotification?: boolean;
    isOpen: boolean;
    onClose: () => void;
};

export const DeleteAircraftType = (props: DeleteModalProps) => {
    const { id, aircraftTypeData, entityName, entityId, handleStatusNotification = true, onClose, isOpen } = props;

    const { t } = useResourcesTranslation();
    const { onError } = useErrorToast();
    const { onSuccess } = useSuccessToast(false);

    const navigate = useNavigate();

    const { setUpdatedValues, isCalledTwice, setIsCalledTwice } = useDeleteAircraftTypeService({
        id: String(id),
        aircraftTypeData,
        handleStatusNotification,
    });

    const backToOverview = "../";

    const onDelete = () => {
        setUpdatedValues()
            .then(() => {
                onSuccess();
                navigate(backToOverview);
                setIsCalledTwice(false);
                onClose();
            })
            .catch((error) => {
                setIsCalledTwice(true);
                onError({
                    id: `000`,
                    timestamp: new Date().toISOString(),
                    status: error.response.status,
                    message: t("aircraft-type.delete.forceDelete error"),
                    code: 400,
                });
            });
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
                            <Button
                                onClick={() => {
                                    onClose();
                                    setIsCalledTwice(false);
                                }}
                                variant="primary"
                            >
                                {t("generic.delete-modal.cancel", { entityName })}
                            </Button>
                            <Button variant="secondary" onClick={onDelete}>
                                {isCalledTwice
                                    ? t("generic.delete-modal.forceDelete", { entityName })
                                    : t("generic.delete-modal.delete", { entityName })}
                            </Button>
                        </HStack>
                    </Center>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
