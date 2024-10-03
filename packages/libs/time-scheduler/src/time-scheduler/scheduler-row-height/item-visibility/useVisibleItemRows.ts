import { useContextSelector } from "use-context-selector";
import { SchedulerRowHeightContext } from "../SchedulerRowHeightContext";

export type UseVisibleItemRowsProps = {
    schedulerRowIndex: number;
};
export const useVisibleItemRows = (props: UseVisibleItemRowsProps) => {
    const { schedulerRowIndex } = props;
    const visibleItemRowIndices = useContextSelector(
        SchedulerRowHeightContext,
        (value) => value?.schedulerRowVisibilityMap?.[schedulerRowIndex] ?? []
    );

    return { visibleItemRowIndices };
};
