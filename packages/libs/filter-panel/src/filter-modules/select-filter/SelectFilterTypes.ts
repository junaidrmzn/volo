import type { SelectAsyncCallback } from "../../form-fields";
import type { SelectOption } from "../../form-fields/SelectTypes";
import type { FilterBaseProps } from "../FilterBaseProps";

export type SelectFilterProps<EntityType> = Omit<FilterBaseProps<"select", EntityType>, "isActive"> & {
    options?: SelectOption[];
    asyncSelectCallback?: SelectAsyncCallback;
};

export type SelectFilterObject<EntityType> = FilterBaseProps<"select", EntityType> & {
    value: SelectOption;
};

export type SelectFormDataType = { [x: string]: SelectOption };
