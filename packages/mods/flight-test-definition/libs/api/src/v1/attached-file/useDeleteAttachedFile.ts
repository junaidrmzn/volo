import { useDeleteService } from "@voloiq/service";

export type UseDeleteAttachedFileOptions = {
    onSuccessfulDelete?: () => Promise<unknown>;
    definitionId: string;
};
export const useDeleteAttachedFile = (options: UseDeleteAttachedFileOptions) => {
    const { onSuccessfulDelete, definitionId } = options;

    const { sendRequestById } = useDeleteService({
        route: `/ftd/v1/definitions/${definitionId}/files`,
    });

    const deleteAttachedFile = async (attachedFileId: string) => {
        await sendRequestById(attachedFileId);
        await onSuccessfulDelete?.();
    };

    return { deleteAttachedFile };
};
