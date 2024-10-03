import { FileCard } from "@voloiq/file-card";
import { useAttachedFiles } from "../attached-files-context/useAttachedFiles";

export type UploadingFile = {
    isUploading: true;
    uploadDate?: never;
};
export type UploadedFile = {
    isUploading?: never;
    uploadDate: Date;
};

export type BasicFileProperties = {
    id: string;
    fileName: string;
    fileSize: number;
};

export type AttachedFile = BasicFileProperties & (UploadingFile | UploadedFile);

export type AttachedFileCardProps = {
    attachedFile: AttachedFile;
    onFileDeleteSuccess: () => void;
};
export const AttachedFileCard = (props: AttachedFileCardProps) => {
    const { attachedFile, onFileDeleteSuccess } = props;
    const { id, fileName } = attachedFile;

    const { deleteAttachedFile, downloadAttachedFile } = useAttachedFiles();

    const onDelete = async () => {
        await deleteAttachedFile(id);
        await onFileDeleteSuccess();
    };

    return (
        <FileCard
            {...attachedFile}
            onDownload={() => downloadAttachedFile({ attachedFileId: id, fileName })}
            onDelete={onDelete}
            isDeletable
        />
    );
};
