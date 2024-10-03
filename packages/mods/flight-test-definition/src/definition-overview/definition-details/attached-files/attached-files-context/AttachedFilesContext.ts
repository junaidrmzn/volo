import { createContext } from "react";
import type { AttachedFile } from "../attached-files-card-list/AttachedFilesCard";
import type { DownloadAttachedFile } from "./useDownloadAttachedFile";

export type AttachedFilesContextType = {
    attachedFiles: AttachedFile[];
    attachedFilesCount?: number;
    uploadFile: (file: File) => Promise<void>;
    deleteAttachedFile: (fileId: string) => Promise<void>;
    downloadAttachedFile: DownloadAttachedFile;
};
export const AttachedFilesContext = createContext<AttachedFilesContextType | undefined>(undefined);
