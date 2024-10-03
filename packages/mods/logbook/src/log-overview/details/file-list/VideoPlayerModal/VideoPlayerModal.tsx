import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
} from "@volocopter/design-library-react";
import type { ExportFileUrl, FileUrl } from "@voloiq/logbook-api/v6";
import { useLogDetailsTranslation } from "../../translations/useLogDetailsTranslation";

export type VideoPlayerModalProps = {
    isOpen: boolean;
    onClose: () => void;
    fileName?: string;
    fileUrl?: ExportFileUrl | FileUrl;
};

export const VideoPlayerModal = (props: VideoPlayerModalProps) => {
    const { fileUrl, fileName } = props;
    const { t } = useLogDetailsTranslation();

    return (
        <Modal size="3xl" {...props}>
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                <ModalHeader>{t("files.videoModal.modalHeader", { fileName })}</ModalHeader>
                <ModalBody>
                    {fileUrl && (
                        // eslint-disable-next-line jsx-a11y/media-has-caption
                        <video width="750" height="500" controls src={fileUrl.url}>
                            <Text>{t("files.videoModal.noSupportMessage")}</Text>
                        </video>
                    )}
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
