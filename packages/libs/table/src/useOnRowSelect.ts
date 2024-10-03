import { useEffect } from "react";
import type { Row } from "react-table";
import { usePrevious } from "react-use";

export const useOnRowSelect = <Data extends object>(
    selectedRows: Row<Data>[],
    onRowSelect?: (selectedData: Data[]) => void
) => {
    const previous = usePrevious(selectedRows);

    useEffect(() => {
        if (previous && previous !== selectedRows) {
            const selectedData = selectedRows.map((row) => row.original);
            onRowSelect?.(selectedData);
        }
    }, [onRowSelect, previous, selectedRows]);
};
