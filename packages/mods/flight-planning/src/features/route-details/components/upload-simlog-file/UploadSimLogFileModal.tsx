import {
    Button,
    FileUpload,
    HStack,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    VStack,
} from "@volocopter/design-library-react";
import { useFlightPlanningTranslation } from "../../../../translations";
import { UploadProgress } from "./UploadProgess";
import { useUploadSimLogFile } from "./useUploadSimLogFile";

type UploadSimLogFileModalProps = {
    routeId: number;
    isOpen: boolean;
    onClose: () => void;
};

export const UploadSimLogFileModal = (props: UploadSimLogFileModalProps) => {
    const { isOpen, onClose, routeId } = props;
    const { t } = useFlightPlanningTranslation();
    const { handleUploadFile, handleAddFile, handleDeleteFile, handleCancelUpload, files, state, uploadProgress } =
        useUploadSimLogFile({
            routeId,
            onSuccessfulUpload: onClose,
            onUploadCancelled: onClose,
        });

    const handleClose = () => {
        onClose();
        handleDeleteFile();
    };

    const fileName = files[0] ? files[0].name : "";

    return (
        <Modal size="xl" onClose={handleClose} isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{t("routeDetails.menu.uploadSimulatorCSV")}</ModalHeader>
                <ModalBody>
                    <VStack w="full" spacing={3} align="flex-end">
                        <>
                            {state === "idle" && (
                                <>
                                    <FileUpload
                                        accept={[".csv"]}
                                        allowMultiple={false}
                                        onAdd={handleAddFile}
                                        onDelete={handleDeleteFile}
                                        files={files}
                                        orLabel={t("routeDetails.simLogFileUpload.orLabel")}
                                        dropFilesLabel={t("routeDetails.simLogFileUpload.dropFiles")}
                                        rejectedFilesErrorMessage={t(
                                            "routeDetails.simLogFileUpload.rejectedFileErrorMessage"
                                        )}
                                        selectFilesLabel={t("routeDetails.simLogFileUpload.selectFile")}
                                        deleteAriaLabel="test"
                                    />
                                    <HStack justifyContent="end">
                                        <Button onClick={handleClose} data-testid="form-modal-cancel-button">
                                            {t("common.cancel")}
                                        </Button>
                                        <Button
                                            variant="primary"
                                            data-testid="form-modal-set-button"
                                            onClick={() => handleUploadFile()}
                                        >
                                            {t("routeDetails.simLogFileUpload.uploadButton")}
                                        </Button>
                                    </HStack>
                                </>
                            )}
                            {state === "pending" && (
                                <UploadProgress
                                    percentage={uploadProgress}
                                    cancelUpload={handleCancelUpload}
                                    fileName={fileName}
                                />
                            )}
                        </>
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
