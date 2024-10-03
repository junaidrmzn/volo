import type { AttachedFile } from "@voloiq-typescript-api/ftd-types";
import { useCreateService } from "@voloiq/service";
import { useDefinition } from "../../../definition-context/useDefinition";
import { useUploadingFiles } from "./useUploadingFiles";

export type UseUploadFileOptions = {
    onSuccessfulUpload?: () => Promise<unknown>;
};
export const useUploadFile = (options: UseUploadFileOptions) => {
    const { onSuccessfulUpload } = options;

    const {
        definition: { id: definitionId },
    } = useDefinition();

    const { sendRequest } = useCreateService<FormData, AttachedFile>({
        route: `/ftd/v1/definitions/${definitionId}/files`,
    });
    const { addUploadingFile, removeUploadingFile, uploadingFiles } = useUploadingFiles();

    const uploadFile = async (file: File) => {
        const { localId } = addUploadingFile(file);
        const formData = new FormData();
        formData.append("attachmentFile", file);
        const attachedFile = await sendRequest({
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        if (attachedFile) {
            removeUploadingFile({ localId });
            await onSuccessfulUpload?.();
        }
    };

    return { uploadFile, uploadingFiles };
};
