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
import { FileState } from "../../../../utils";
import { UploadProgress } from "./UploadProgess";
import { useUploadKmlFile } from "./useUploadKmlFile";

type UploadKmlFileModalProps = {
    routeOptionId: number | string;
    isOpen: boolean;
    onClose: () => void;
};
export const UploadKmlFileModal = (props: UploadKmlFileModalProps) => {
    const { routeOptionId, isOpen, onClose } = props;
    const { t: translate } = useFlightPlanningTranslation();
    const { handleUploadFile, handleAddFile, handleDeleteFile, handleCancelUpload, files, state, uploadProgress } =
        useUploadKmlFile({
            routeOptionId,
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
                <ModalHeader>{translate("routeList.menu.uploadRouteOptionKml")}</ModalHeader>
                <ModalBody>
                    <VStack w="full" spacing={3} align="flex-end">
                        <>
                            {state === FileState.IDLE && (
                                <>
                                    <FileUpload
                                        accept={[".kml"]}
                                        allowMultiple={false}
                                        onAdd={handleAddFile}
                                        onDelete={handleDeleteFile}
                                        files={files}
                                        orLabel={translate("routeOption.kmlFileUpload.orLabel")}
                                        dropFilesLabel={translate("routeOption.kmlFileUpload.dropFiles")}
                                        rejectedFilesErrorMessage={translate(
                                            "routeOption.kmlFileUpload.rejectedFileErrorMessage"
                                        )}
                                        selectFilesLabel={translate("routeOption.kmlFileUpload.selectFile")}
                                        deleteAriaLabel="test"
                                    />
                                    <HStack justifyContent="end">
                                        <Button onClick={handleClose} data-testid="form-modal-cancel-button">
                                            {translate("common.cancel")}
                                        </Button>
                                        <Button
                                            variant="primary"
                                            data-testid="form-modal-set-button"
                                            onClick={() => handleUploadFile()}
                                        >
                                            {translate("common.upload")}
                                        </Button>
                                    </HStack>
                                </>
                            )}
                            {state === FileState.PENDING && (
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
