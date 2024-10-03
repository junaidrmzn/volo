import type { DateTimeInputMode } from "@volocopter/date-time-input-react";
import type { FilterBaseProps } from "../FilterBaseProps";

export type DateRangeFilterProps<EntityType> = Omit<FilterBaseProps<"range", EntityType>, "isActive"> & {
    fromLabel: string;
    toLabel: string;
    useUtcTime?: boolean;
    mode?: DateTimeInputMode;
};

export type DateRangeFilterObject<EntityType> = FilterBaseProps<"range", EntityType> & {
    fromDate?: string;
    toDate?: string;
    mode?: DateTimeInputMode;
    useUtcTime?: boolean;
};

export type DateRangeFormDataType = { [x: string]: Date | null };
