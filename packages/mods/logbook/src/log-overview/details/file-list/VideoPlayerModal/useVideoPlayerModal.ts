import { useDisclosure, useToast } from "@volocopter/design-library-react";
import { useState } from "react";
import type { ExportFileUrl, FileUrl } from "@voloiq/logbook-api/v6";
import { useGetFileDownloadLink } from "@voloiq/logbook-api/v6";

export const useVideoPlayerModal = () => {
    const [fileUrl, setFileUrl] = useState<ExportFileUrl | FileUrl | undefined>();
    const [fileName, setFileName] = useState<string | undefined>();

    const { isOpen, onOpen, onClose } = useDisclosure();
    const { getFileDownloadLink } = useGetFileDownloadLink();
    const toast = useToast();

    const handleClickPlay = (logId: string, resourceId: string, fileName: string) => {
        getFileDownloadLink(logId, resourceId, "files")
            .then((data) => {
                setFileUrl(data.data);
                setFileName(fileName);
                onOpen();
            })
            .catch(() => toast({ title: "error", description: "fuck", status: "error" }));
    };

    const onModalClose = () => {
        setFileUrl(undefined);
        setFileName(undefined);
        onClose();
    };

    return {
        fileUrl,
        fileName,
        isModalOpen: isOpen,
        handleClickPlay,
        onModalClose,
    };
};
