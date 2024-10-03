import type { SelectAsyncCallback } from "../../form-fields";
import type { SelectOption } from "../../form-fields/SelectTypes";
import type { FilterBaseProps } from "../FilterBaseProps";

export type MultiSelectFilterProps<EntityType> = Omit<FilterBaseProps<"multiSelect", EntityType>, "isActive"> & {
    options?: SelectOption[];
    asyncSelectCallback?: SelectAsyncCallback;
};

export type MultiSelectFilterObject<EntityType> = FilterBaseProps<"multiSelect", EntityType> & {
    values: SelectOption[];
};

export type MultiSelectFormDataType = { [x: string]: SelectOption[] };
