import type { FilterBaseProps } from "../FilterBaseProps";

export type BooleanFilterProps<EntityType> = Omit<FilterBaseProps<"boolean", EntityType>, "isActive"> & {
    neutralLabel: string;
    trueLabel: string;
    falseLabel: string;
};

export type BooleanFilterObject<EntityType> = FilterBaseProps<"boolean", EntityType> & {
    value: boolean;
    trueLabel: string;
    falseLabel: string;
};

export type BooleanFormDataType = { [x: string]: string };
