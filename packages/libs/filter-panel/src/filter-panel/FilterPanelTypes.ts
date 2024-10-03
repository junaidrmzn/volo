import type {
    BooleanFilterObject,
    BooleanFilterProps,
    BooleanFormDataType,
    DateRangeFilterObject,
    DateRangeFilterProps,
    DateRangeFormDataType,
    MultiSelectFilterObject,
    MultiSelectFilterProps,
    MultiSelectFormDataType,
    NumberFilterObject,
    NumberFilterProps,
    NumberFormDataType,
    NumberRangeFilterObject,
    NumberRangeFilterProps,
    NumberRangeFormDataType,
    SelectFilterObject,
    SelectFilterProps,
    SelectFormDataType,
    TextFilterObject,
    TextFilterProps,
    TextFormDataType,
} from "../filter-modules";

export type FilterSet<EntityType> = {
    filters: FilterObject<EntityType>[];
};

export type FilterObject<EntityType> =
    | DateRangeFilterObject<EntityType>
    | NumberRangeFilterObject<EntityType>
    | SelectFilterObject<EntityType>
    | BooleanFilterObject<EntityType>
    | MultiSelectFilterObject<EntityType>
    | TextFilterObject<EntityType>
    | NumberFilterObject<EntityType>;

export type FilterProps<EntityType> =
    | DateRangeFilterProps<EntityType>
    | NumberRangeFilterProps<EntityType>
    | SelectFilterProps<EntityType>
    | BooleanFilterProps<EntityType>
    | MultiSelectFilterProps<EntityType>
    | TextFilterProps<EntityType>
    | NumberFilterProps<EntityType>;

export type FormDataType =
    | DateRangeFormDataType
    | NumberRangeFormDataType
    | SelectFormDataType
    | BooleanFormDataType
    | MultiSelectFormDataType
    | TextFormDataType
    | NumberFormDataType;
