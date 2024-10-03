import { useState } from "react";

export const useFileListItem = () => {
    const [editMode, setEditMode] = useState<boolean>(false);

    return {
        editMode,
        setEditMode,
    };
};
