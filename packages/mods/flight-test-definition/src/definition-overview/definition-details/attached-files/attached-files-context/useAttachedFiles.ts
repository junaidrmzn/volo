import { useContext } from "react";
import { AttachedFilesContext } from "./AttachedFilesContext";

export const useAttachedFiles = () => {
    const context = useContext(AttachedFilesContext);

    if (context === undefined) {
        throw new Error("useAttachedFiles must be used within AttachedFilesContext");
    }

    return context;
};
