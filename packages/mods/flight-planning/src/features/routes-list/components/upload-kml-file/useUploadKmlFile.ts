import { AbortController } from "@azure/abort-controller";
import { useToast } from "@volocopter/design-library-react";
import { useCallback, useEffect, useState } from "react";
import { useGetKmlFileUploadLink } from "@voloiq/flight-planning-api/v1";
import { useKmlFileUploadedStatus } from "../../../../api-hooks";
import { uploadFile } from "../../../../api-hooks/files/useUploadFile";
import { useFlightPlanningTranslation } from "../../../../translations";

type UseImportKmlFileOptions = {
    routeOptionId: string | number;
    onSuccessfulUpload?: () => unknown;
    onUploadCancelled?: () => unknown;
};

export const useUploadKmlFile = (options: UseImportKmlFileOptions) => {
    const { routeOptionId, onSuccessfulUpload, onUploadCancelled } = options;
    const [files, setFiles] = useState<File[]>([]);
    const [state, setState] = useState<"idle" | "pending">("idle");
    const [isEnableUploadStatus, setIsEnableUploadStatus] = useState<boolean>(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [abortController, setAbortController] = useState(new AbortController());
    const toast = useToast();
    const { t: translate } = useFlightPlanningTranslation();
    // const { getKmlFileUploadLink } = useGetKmlFileUploadLink();
    const { refetchData: getKmlFileUploadLink } = useGetKmlFileUploadLink({ routeOptionId, manual: true });

    const { isFetching, removeUploadedStatusQuery } = useKmlFileUploadedStatus({
        routeOptionId,
        enabled: isEnableUploadStatus,
    });

    useEffect(() => {
        if (!isFetching) {
            setIsEnableUploadStatus(false);
            removeUploadedStatusQuery();
        }
    }, [isFetching]);

    // allow only one file for upload
    const handleAddFile = (addedFiles: File[]) => setFiles([...addedFiles]);

    const handleDeleteFile = () => {
        setFiles([]);
    };

    const reset = () => {
        setFiles([]);
        setUploadProgress(0);
        setState("idle");
        // by design, we always need to create a new AbortController to reset its state
        setAbortController(new AbortController());
    };

    const handleCancelUpload = useCallback(() => {
        abortController.abort();
        toast({
            title: translate("routeOption.kmlFileUpload.cancelled.title"),
            description: translate("routeOption.kmlFileUpload.cancelled.message"),
            status: "info",
            duration: 8000,
        });
    }, [toast, abortController, translate]);

    const onUploadProgress = (percentage: number) => {
        setUploadProgress(percentage);
    };

    const handleUploadFile = async () => {
        const file = files[0];
        if (!file) return;
        setState("pending");
        try {
            const response = await getKmlFileUploadLink({
                params: { fileName: file.name, fileType: "KML" },
            });

            const uploadUrl = response?.url;
            if (!uploadUrl) {
                toast({
                    title: translate("routeOption.kmlFileUpload.uploadError.title"),
                    description: translate("routeOption.kmlFileUpload.uploadError.message"),
                    status: "error",
                });
                return;
            }
            await uploadFile(uploadUrl, file, onUploadProgress, abortController.signal);
            onSuccessfulUpload?.();
            toast({
                title: translate("routeOption.kmlFileUpload.success.title"),
                description: translate("routeOption.kmlFileUpload.success.message"),
                status: "success",
            });
            setIsEnableUploadStatus(true);
        } catch (error) {
            if (error instanceof Error && error.name === "AbortError") {
                // The upload has been cancelled by the user: exit the function
                reset();
                onUploadCancelled?.();
                return;
            }
            toast({
                title: translate("routeOption.kmlFileUpload.uploadError.title"),
                description: translate("routeOption.kmlFileUpload.uploadError.message"),
                status: "error",
            });
        }
        reset();
    };

    return { handleUploadFile, handleAddFile, handleDeleteFile, handleCancelUpload, files, state, uploadProgress };
};
