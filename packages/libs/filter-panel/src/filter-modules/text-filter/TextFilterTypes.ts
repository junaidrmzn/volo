import type { FilterBaseProps } from "../FilterBaseProps";

export type TextFilterProps<EntityType> = Omit<FilterBaseProps<"text", EntityType>, "isActive">;

export type TextFilterObject<EntityType> = FilterBaseProps<"text", EntityType> & {
    value: string;
};

export type TextFormDataType = { [x: string]: string };
