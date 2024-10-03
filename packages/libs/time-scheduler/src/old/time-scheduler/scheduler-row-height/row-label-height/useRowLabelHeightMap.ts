import { useCallback, useState } from "react";

export type RowIndex = number;
export type RowLabelHeight = number;
export type RowLabelHeightMap = Record<RowIndex, RowLabelHeight>;
export type SetRowLabelHeight = (rowIndex: RowIndex, rowLabelHeight: RowLabelHeight) => void;
export const useRowLabelHeightMap = () => {
    const [rowLabelHeightMap, setRowLabelHeightMap] = useState<RowLabelHeightMap>({});

    const setRowLabelHeight: SetRowLabelHeight = useCallback(
        (rowIndex, rowLabelHeight) =>
            setRowLabelHeightMap((current) => ({
                ...current,
                [rowIndex]: rowLabelHeight,
            })),
        [setRowLabelHeightMap]
    );

    return { rowLabelHeightMap, setRowLabelHeight };
};
