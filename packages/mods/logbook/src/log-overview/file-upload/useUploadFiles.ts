/* eslint-disable no-await-in-loop */
import { AbortController } from "@azure/abort-controller";
import { useToast } from "@volocopter/design-library-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { uploadFile, useAddFile, useGetFileUploadLink } from "@voloiq/logbook-api/v6";
import type { FileEntry } from "@voloiq/logbook-api/v6";
import { useLogbookTranslation } from "../translations/useLogbookTranslation";

export type UploadState = {
    file?: File;
    fileIndex: number;
    fileCount: number;
    percentage: number;
};

export type UploadFilesProps = {
    fileEntries: FileEntry[];
    logId: string;
};

type UseUploadFilesProps = {
    cancellationToastDescription: string;
    uploadCancelled: boolean;
};

export const useUploadFiles = (props: UseUploadFilesProps) => {
    const { cancellationToastDescription, uploadCancelled } = props;
    const [uploadState, setUploadState] = useState<UploadState>({
        file: undefined,
        fileIndex: 0,
        fileCount: 0,
        percentage: 0,
    });
    const [state, setState] = useState<"idle" | "pending" | "success">("idle");
    const [abortController] = useState(new AbortController());
    const [erroneousFiles, setErroneousFiles] = useState<File[]>([]);
    const toast = useToast();
    const { t, i18n } = useLogbookTranslation();
    const { addFile } = useAddFile();
    const { getFileUploadLink } = useGetFileUploadLink();

    const stateRef = useRef(state);
    stateRef.current = state;

    const uploadCancelledRef = useRef(uploadCancelled);
    uploadCancelledRef.current = uploadCancelled;

    const cancelUpload = useCallback(() => {
        abortController.abort();
        toast({
            title: t("fileUpload.uploadCancelledTitle"),
            description: cancellationToastDescription,
            status: "info",
            duration: 8000,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [i18n.language, toast, abortController, cancellationToastDescription]);

    useEffect(() => {
        if (uploadCancelled) {
            // The upload has been manually cancelled via the cancel confirmation modal
            cancelUpload();
        }
    }, [uploadCancelled, cancelUpload]);

    useEffect(() => {
        return () => {
            if (stateRef.current === "pending" && !uploadCancelledRef.current) {
                // The upload has been cancelled via navigating to another voloiq module (e.g. resources)
                cancelUpload();
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const uploadFiles = async (props: UploadFilesProps) => {
        const { fileEntries, logId } = props;

        const onUploadProgress = (percentage: number) => {
            setUploadState((state) => ({ ...state, percentage }));
        };

        setState("pending");
        setUploadState((state) => ({ ...state, fileCount: fileEntries.length }));

        for (const entry of fileEntries) {
            setUploadState((state) => ({ ...state, percentage: 0, file: entry.file, fileIndex: state.fileIndex + 1 }));

            try {
                const { data: response } = await getFileUploadLink(logId, entry.type, entry.file.name);
                // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
                const uploadLink = response.data!.url;
                const downloadLink = uploadLink.split("?")[0]!;
                await uploadFile(uploadLink, entry.file, onUploadProgress, abortController.signal);
                await addFile(logId, {
                    fileName: entry.file.name,
                    fileType: entry.type,
                    url: downloadLink,
                });
            } catch (error) {
                if (error instanceof Error && error.name === "AbortError") {
                    // The upload has been cancelled by the user: exit the function
                    return;
                }
                setErroneousFiles((previousFiles) => [...previousFiles, entry.file]);
            }
        }

        setState("success");
    };

    return {
        erroneousFiles,
        state,
        uploadState,
        uploadFiles,
    };
};
