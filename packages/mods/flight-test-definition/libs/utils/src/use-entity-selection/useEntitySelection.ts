import { useState } from "react";

export type UseEntitySelectionOptions<SelectableEntity extends { id: string }> = {
    entities: SelectableEntity[];
};

export const useEntitySelection = <SelectableEntity extends { id: string }>(
    options: UseEntitySelectionOptions<SelectableEntity>
) => {
    const { entities } = options;
    const [selection, setSelection] = useState(new Set<string>());

    const onSelect = (selectedId: string, isSelected: boolean) => {
        setSelection((selection) => {
            const nextSelection = new Set(selection);
            if (isSelected) {
                nextSelection.add(selectedId);
            } else {
                nextSelection.delete(selectedId);
            }
            return nextSelection;
        });
    };

    const selectAll = () => {
        setSelection(new Set(entities.map((entity) => entity.id)));
    };

    const clearAll = () => {
        setSelection(new Set());
    };

    const entitiesWithSelection = entities.map((entity) => ({
        ...entity,
        isSelected: selection.has(entity.id),
    }));

    return { onSelect, selectAll, clearAll, entitiesWithSelection };
};
