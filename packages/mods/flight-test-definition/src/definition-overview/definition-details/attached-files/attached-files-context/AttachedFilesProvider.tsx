import type { ReactNode } from "react";
import { useDeleteAttachedFile, useGetAllAttachedFiles } from "@voloiq/flight-test-definition-api/v1";
import { useDefinition } from "../../definition-context/useDefinition";
import { AttachedFilesContext } from "./AttachedFilesContext";
import { useUploadFile } from "./upload-file/useUploadFile";
import { useDownloadAttachedFile } from "./useDownloadAttachedFile";

export type AttachedFilesProviderProps = {
    children: ReactNode;
};
export const AttachedFilesProvider = (props: AttachedFilesProviderProps) => {
    const { children } = props;

    const {
        definition: { id: definitionId },
    } = useDefinition();
    const { attachedFiles, refetchAttachedFiles, attachedFilesCount } = useGetAllAttachedFiles(definitionId);
    const { uploadFile, uploadingFiles } = useUploadFile({ onSuccessfulUpload: refetchAttachedFiles });
    const { deleteAttachedFile } = useDeleteAttachedFile({ onSuccessfulDelete: refetchAttachedFiles, definitionId });
    const { downloadAttachedFile } = useDownloadAttachedFile();

    return (
        <AttachedFilesContext.Provider
            value={{
                attachedFiles: [...uploadingFiles, ...attachedFiles],
                attachedFilesCount,
                uploadFile,
                deleteAttachedFile,
                downloadAttachedFile,
            }}
        >
            {children}
        </AttachedFilesContext.Provider>
    );
};
