import { useContextSelector } from "use-context-selector";
import { SchedulerRowHeightContext } from "../SchedulerRowHeightContext";

export type UseRowLabelHeightProps = {
    schedulerRowIndex: number;
};
export const useRowLabelHeight = (props: UseRowLabelHeightProps) => {
    const { schedulerRowIndex } = props;
    const rowLabelHeight = useContextSelector(
        SchedulerRowHeightContext,
        (value) => value?.rowLabelHeightMap?.[schedulerRowIndex] ?? 0
    );

    return { rowLabelHeight };
};
