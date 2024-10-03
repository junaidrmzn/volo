import { AbortController } from "@azure/abort-controller";
import { useToast } from "@volocopter/design-library-react";
import { useCallback, useState } from "react";
import { useGetConductedRouteFileUploadLink } from "@voloiq/flight-planning-api/v1";
import { usePatchConductedRouteUploadedStatus } from "../../../../api-hooks";
import { uploadFile } from "../../../../api-hooks/files/useUploadFile";
import { useFlightPlanningTranslation } from "../../../../translations";

type UseImportSimLogFileOptions = {
    routeId: string | number;
    onSuccessfulUpload?: () => unknown;
    onUploadCancelled?: () => unknown;
};

export const useUploadSimLogFile = (options: UseImportSimLogFileOptions) => {
    const { routeId, onSuccessfulUpload, onUploadCancelled } = options;
    const [files, setFiles] = useState<File[]>([]);
    const [state, setState] = useState<"idle" | "pending">("idle");
    const [uploadProgress, setUploadProgess] = useState(0);
    const [abortController, setAbortController] = useState(new AbortController());
    const toast = useToast();
    const { t } = useFlightPlanningTranslation();
    const { refetchData: getFileUploadLink } = useGetConductedRouteFileUploadLink({ routeId, manual: true });
    const { patchConductedRouteUploadStatus } = usePatchConductedRouteUploadedStatus();

    // allow only one file for upload
    const handleAddFile = (addedFiles: File[]) => setFiles([...addedFiles]);

    const handleDeleteFile = () => {
        setFiles([]);
    };

    const reset = () => {
        setFiles([]);
        setUploadProgess(0);
        setState("idle");
        // by design we always need to create a new AbortController to reset its state
        setAbortController(new AbortController());
    };

    const handleCancelUpload = useCallback(() => {
        abortController.abort();
        toast({
            title: t("routeDetails.simLogFileUpload.cancelled.title"),
            description: t("routeDetails.simLogFileUpload.cancelled.message"),
            status: "info",
            duration: 8000,
        });
    }, [toast, abortController, t]);

    const onUploadProgress = (percentage: number) => {
        setUploadProgess(percentage);
    };

    const handleUploadFile = async () => {
        const file = files[0];
        if (!file) return;
        setState("pending");
        try {
            const response = await getFileUploadLink({
                params: { fileName: file.name, fileType: "SIMULATOR" },
            });
            const uploadUrl = response?.url;
            if (!uploadUrl) {
                toast({
                    title: t("routeDetails.simLogFileUpload.error.title"),
                    description: t("routeDetails.simLogFileUpload.error.message"),
                    status: "error",
                });
                return;
            }
            await uploadFile(uploadUrl, file, onUploadProgress, abortController.signal);
            await patchConductedRouteUploadStatus(routeId);
            onSuccessfulUpload?.();
            toast({
                title: t("routeDetails.simLogFileUpload.success.title"),
                description: t("routeDetails.simLogFileUpload.success.message"),
                status: "success",
            });
        } catch (error) {
            if (error instanceof Error && error.name === "AbortError") {
                // The upload has been cancelled by the user: exit the function
                reset();
                onUploadCancelled?.();
                return;
            }
            toast({
                title: t("routeDetails.simLogFileUpload.error.title"),
                description: t("routeDetails.simLogFileUpload.error.message"),
                status: "error",
            });
        }
        reset();
    };

    return { handleUploadFile, handleAddFile, handleDeleteFile, handleCancelUpload, files, state, uploadProgress };
};
