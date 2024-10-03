import { useHandleDownload } from "../../../libs/logbook/useHandleDownload";

export const useFileList = () => {
    const { handleDownloadEvent } = useHandleDownload("files");

    return {
        handleDownloadEvent,
    };
};
