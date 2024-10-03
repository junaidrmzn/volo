import type { UseVisibleItemRowsProps } from "./item-visibility/useVisibleItemRows";
import { useVisibleItemRows } from "./item-visibility/useVisibleItemRows";
import { useRowLabelHeight } from "./row-label-height/useRowLabelHeight";

const toRemCssProperty = (value: number) => `${value}rem`;

type UseItemRowHeightProps = Pick<UseVisibleItemRowsProps, "schedulerRowIndex"> & {
    rowItemHeight?: string | number;
};
export const useItemRowHeight = (props: UseItemRowHeightProps) => {
    const { visibleItemRowIndices } = useVisibleItemRows(props);
    const { rowLabelHeight } = useRowLabelHeight(props);
    const visibleItemRowCount = visibleItemRowIndices.length;

    const itemHeight = 3.75;
    const rowGap = 0.25;
    const paddingY = 1;
    const emptyRowHeight = itemHeight + 2 * paddingY;
    const height = Math.max(
        itemHeight * visibleItemRowCount + 2 * paddingY + (visibleItemRowCount - 1) * rowGap,
        emptyRowHeight
    );
    const transition = "0.25s";

    const getGridItemHeightProps = () => ({
        rowGap: toRemCssProperty(rowGap),
        paddingY: toRemCssProperty(paddingY),
        height: props.rowItemHeight ? props.rowItemHeight : toRemCssProperty(height),
        transition,
        minHeight: `${rowLabelHeight}px`,
    });

    const getItemRowHeightProps = (rowIndex: number) => {
        const height = toRemCssProperty(itemHeight);
        if (visibleItemRowIndices.includes(rowIndex)) {
            return { minHeight: height, transition };
        }
        return {
            minHeight: 0,
            maxHeight: 0,
            marginTop: toRemCssProperty(rowGap * -1),
            transition,
        };
    };

    return {
        getItemRowHeightProps,
        getGridItemHeightProps,
    };
};
