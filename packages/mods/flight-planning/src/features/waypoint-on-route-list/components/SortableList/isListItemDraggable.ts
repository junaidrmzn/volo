export const isListItemDraggable = (index: number, lastIndex: number) => {
    return index !== 0 && index !== lastIndex;
};
