import { useState } from "react";

/**
 * State that manages the selection and deselection of an id.
 * Selecting an already selected id deselects it again.
 * @returns the `selectedId` and a callback to `selectId`
 */
export const useIdSelection = () => {
    const [selectedId, setSelectedId] = useState<string>();

    const selectId = (id: string) => setSelectedId((currentId) => (currentId === id ? undefined : id));

    return { selectedId, setSelectedId: selectId };
};
