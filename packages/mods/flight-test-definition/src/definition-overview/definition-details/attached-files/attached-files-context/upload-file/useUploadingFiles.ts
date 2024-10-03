import { useState } from "react";
import { v4 } from "uuid";
import type { AttachedFile } from "../../attached-files-card-list/AttachedFilesCard";

export const useUploadingFiles = () => {
    const [uploadingFiles, setUploadingFiles] = useState<AttachedFile[]>([]);

    const addUploadingFile = (uploadingFile: File) => {
        const { name, size } = uploadingFile;
        const localId = v4();
        const file = { fileName: name, fileSize: size, isUploading: true, id: localId } as const;
        setUploadingFiles((files) => [file, ...files]);

        return { localId };
    };

    const removeUploadingFile = (options: { localId: string }) => {
        const { localId } = options;
        setUploadingFiles((files) => {
            const uploadingFiles = [...files];
            const uploadingFileIndex = uploadingFiles.findIndex((uploadingFile) => uploadingFile.id === localId);
            uploadingFiles.splice(uploadingFileIndex, 1);
            return uploadingFiles;
        });
    };

    return { uploadingFiles, addUploadingFile, removeUploadingFile };
};
