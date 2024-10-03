import { RefObject } from "react";
import { DateRangePicker } from "@voloiq/date-time-input";
import { useDateSelection } from "./useDateSelection";

type DateSelectionProps = {
    containerRef: RefObject<HTMLDivElement>;
};

export const DateSelection = (props: DateSelectionProps) => {
    const { containerRef } = props;
    const { dateRange, handleDone } = useDateSelection(containerRef);

    return <DateRangePicker key={dateRange?.toString()} value={dateRange} onDone={handleDone} buttonSize="sm" />;
};
