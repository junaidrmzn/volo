import { useState } from "react";
import { useFeatureFlags } from "@voloiq/feature-flags";
import { useGetLog } from "@voloiq/logbook-api/v6";
import type { FileEntry } from "@voloiq/logbook-api/v6";
import { useNavigate, useParams } from "@voloiq/routing";
import { useLogDetailsTranslation } from "../details/translations/useLogDetailsTranslation";
import { useUploadFiles } from "./useUploadFiles";

export const useUploadFilePage = () => {
    const [fileEntries, setFileEntries] = useState<FileEntry[]>([]);
    const [uploadCancelled, setUploadCancelled] = useState(false);
    const [cancelUploadModalIsOpen, setCancelUploadModalIsOpen] = useState(false);
    const { t } = useLogDetailsTranslation();
    const { isFeatureFlagEnabled } = useFeatureFlags();
    const { logId } = useParams();

    const navigate = useNavigate();
    const navigateBack = () =>
        navigate({
            pathname: isFeatureFlagEnabled("vte-1596")
                ? `/flight-test-suite/logs/${logId}`
                : `/logbook/overview/${logId}`,
        });

    if (!logId) {
        navigateBack();
    }

    const {
        erroneousFiles,
        state: uploadFilesState,
        uploadState,
        uploadFiles,
    } = useUploadFiles({
        cancellationToastDescription: t("uploadFiles.uploadCancelledDescription"),
        uploadCancelled,
    });

    const { log, state: getLogState } = useGetLog({ logId: logId || "" });

    const existingFiles = log?.files || [];

    const displayCancellationModal = () => {
        setCancelUploadModalIsOpen(true);
    };

    const handleModalCancelButtonPress = () => {
        setCancelUploadModalIsOpen(false);
    };

    const handleConfirm = () => {
        setCancelUploadModalIsOpen(false);
        setUploadCancelled(true);
        // Wait for the cancellation modal animation to be finished
        // TODO: use the onCloseComplete API https://jira.volocopter.org/browse/VTE-318
        setTimeout(() => {
            navigateBack();
        }, 250);
    };

    const handleBackButtonClick = () => {
        if (uploadFilesState === "pending") {
            displayCancellationModal();
        } else {
            navigateBack();
        }
    };

    const handleSaveButtonClick = () => uploadFiles({ logId: logId || "", fileEntries });

    return {
        fileEntries,
        setFileEntries,
        cancelUploadModalIsOpen,
        displayCancellationModal,
        handleModalCancelButtonPress,
        handleSaveButtonClick,
        handleBackButtonClick,
        handleConfirm,
        uploadFilesState,
        uploadState,
        erroneousFiles,
        getLogState,
        existingFiles,
    };
};
