import { useCallback, useEffect, useState } from "react";
import { usePrevious } from "react-use";
import { useFeatureFlags } from "@voloiq/feature-flags";
import type { FileEntry, LogInsert } from "@voloiq/logbook-api/v6";
import { useAddLog, useExtractMetadata } from "@voloiq/logbook-api/v6";
import { mergeServiceStates } from "../../libs/logbook/mergeServiceStates";
import { useUploadFiles } from "../file-upload/useUploadFiles";
import type { ProductLine } from "./select-aircraft/SelectProductLineStep";
import { useLogAddTranslation } from "./translations/useLogAddTranslation";

export type FilePrefillMetadata = {
    timestamp?: Date;
    metadataRequestStatus: "pending" | "success" | "error" | "idle";
};

export const useCreateLogPage = (onSubmit: () => void, onCancel: () => void) => {
    const [logInsertData, setLogInsertData] = useState<LogInsert>();
    const [selectedProductLine, setSelectedProductLine] = useState<ProductLine>("VoloRegion");
    const [fileEntries, setFileEntries] = useState<FileEntry[]>([]);
    const [stepsFinished, setStepsFinished] = useState(false);
    const [uploadCancelled, setUploadCancelled] = useState(false);
    const [cancelUploadModalIsOpen, setCancelUploadModalIsOpen] = useState(false);
    const { isFeatureFlagEnabled } = useFeatureFlags();
    const { t } = useLogAddTranslation();
    const { addLog, error: createLogError, state: createLogState, log } = useAddLog();
    const [canEditDate, setCanEditDate] = useState(true);
    const { extractMetadata } = useExtractMetadata();
    const {
        erroneousFiles,
        state: uploadFilesState,
        uploadState,
        uploadFiles,
    } = useUploadFiles({
        cancellationToastDescription: t("createLogPage.uploadCancelledDescription"),
        uploadCancelled,
    });

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
        setTimeout(() => onCancel(), 250);
    };

    const handleFinalStep = () => setStepsFinished(true);

    useEffect(() => {
        if (stepsFinished && !log && createLogState === "idle") {
            addLog({
                data: logInsertData,
            });
        }
        if (log && createLogState === "success" && uploadFilesState === "idle") {
            onSubmit();
            uploadFiles({ logId: log.id, fileEntries });
        }
    }, [
        stepsFinished,
        log,
        addLog,
        logInsertData,
        uploadFiles,
        fileEntries,
        createLogState,
        uploadFilesState,
        onSubmit,
    ]);

    const updateFileEntries = useCallback((index: number, fileEntry: FileEntry) => {
        setFileEntries((previousState) => {
            if (previousState.some((entry) => entry.file.name === fileEntry.file.name)) {
                const newEntries = [...previousState];
                newEntries[index] = fileEntry;
                return newEntries;
            }
            return previousState;
        });
    }, []);

    const previewsSelectedAircraft = usePrevious(selectedProductLine);

    useEffect(() => {
        if (previewsSelectedAircraft && previewsSelectedAircraft !== selectedProductLine) {
            for (const [index, fileEntry] of fileEntries.entries()) {
                updateFileEntries(index, { ...fileEntry, metadataRequestStatus: undefined });
            }
        }
        for (const [index, fileEntry] of fileEntries.entries()) {
            if (!fileEntry.metadataRequestStatus) {
                updateFileEntries(index, { ...fileEntry, metadataRequestStatus: "pending" });
                setCanEditDate(false);
                extractMetadata(selectedProductLine, fileEntry)
                    .then((value) => {
                        updateFileEntries(index, {
                            ...fileEntry,
                            metaData: value.data.data,
                            metadataRequestStatus: "success",
                        });
                    })
                    .catch(() => {
                        updateFileEntries(index, { ...fileEntry, metadataRequestStatus: "error" });
                    })
                    .finally(() => setCanEditDate(true));
            }
        }
    }, [
        extractMetadata,
        fileEntries,
        isFeatureFlagEnabled,
        previewsSelectedAircraft,
        selectedProductLine,
        updateFileEntries,
    ]);

    const metadataRequestStatus = mergeServiceStates(
        fileEntries.map((entry) => (entry.metadataRequestStatus ? entry.metadataRequestStatus : "idle"))
    );

    const metadataTimestamp =
        fileEntries.length > 0 && metadataRequestStatus === "success"
            ? new Date(
                  Math.min.apply(
                      null,
                      fileEntries.map((entry) => new Date(entry.metaData?.timestamp!).getTime())
                  )
              )
            : undefined;

    return {
        prefillMetadata: {
            metadataRequestStatus,
            timestamp: metadataTimestamp,
        },
        setLogInsertData,
        selectedProductLine,
        setSelectedProductLine,
        fileEntries,
        setFileEntries,
        stepsFinished,
        setStepsFinished,
        cancelUploadModalIsOpen,
        createLogError,
        createLogState,
        logData: log,
        displayCancellationModal,
        handleModalCancelButtonPress,
        handleConfirm,
        uploadFilesState,
        uploadState,
        erroneousFiles,
        handleFinalStep,
        canEditDate,
    };
};
