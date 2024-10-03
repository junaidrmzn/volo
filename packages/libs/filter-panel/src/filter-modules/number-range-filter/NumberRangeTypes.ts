import type { FilterBaseProps } from "../FilterBaseProps";

export type NumberRangeFilterProps<EntityType> = Omit<FilterBaseProps<"numberRange", EntityType>, "isActive"> & {
    fromLabel: string;
    toLabel: string;
    min?: string;
    max?: string;
};

export type NumberRangeFilterObject<EntityType> = FilterBaseProps<"numberRange", EntityType> & {
    fromValue?: string;
    toValue?: string;
};

export type NumberRangeFormDataType = { [x: string]: number | null };
