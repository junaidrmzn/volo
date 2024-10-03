import type { FilterBaseProps } from "../FilterBaseProps";

export type NumberFilterProps<EntityType> = Omit<FilterBaseProps<"number", EntityType>, "isActive"> & {
    min?: string;
    max?: string;
};

export type NumberFilterObject<EntityType> = FilterBaseProps<"number", EntityType> & {
    value: number | null;
};

export type NumberFormDataType = { [x: string]: number };
