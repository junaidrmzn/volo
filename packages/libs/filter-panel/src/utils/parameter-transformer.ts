import { match } from "ts-pattern";
import {
    createBooleanFilterObject,
    createMultiSelectFilterObject,
    createNumberRangeFilterObject,
    createRangeFilterObject,
    createSelectFilterObject,
    createTextFilterObject,
} from "../filter-modules";
import { createBooleanFormData } from "../filter-modules/boolean-filter/BooleanFilter";
import { createRangeFormData } from "../filter-modules/date-range-filter/DateRangeFilter";
import { createMultiSelectFormData } from "../filter-modules/multi-select-filter/MultiSelectFilter";
import { createNumberFilterObject, createNumberFormData } from "../filter-modules/number-filter/NumberFilter";
import { createNumberRangeFormData } from "../filter-modules/number-range-filter/NumberRangeFilter";
import { createSelectFormData } from "../filter-modules/select-filter/SelectFilter";
import { createTextFormData } from "../filter-modules/text-filter/TextFilter";
import type { FilterProps, FilterSet } from "../filter-panel";

export const getFilterParameters = <GetDTO>(filterSet?: FilterSet<GetDTO>) => {
    const filterParams: Record<string, string> = {};

    if (filterSet) {
        for (const filter of filterSet.filters)
            match(filter)
                .with({ type: "range" }, (props) => {
                    if (props.fromDate) {
                        filterParams[`range-${props.propertyName}RangeFrom`] = props.fromDate;
                    }
                    if (props.toDate) {
                        filterParams[`range-${props.propertyName}RangeTo`] = props.toDate;
                    }
                })
                .with({ type: "numberRange" }, (props) => {
                    if (props.fromValue) {
                        filterParams[`numberRange-${props.propertyName}RangeFrom`] = props.fromValue;
                    }
                    if (props.toValue) {
                        filterParams[`numberRange-${props.propertyName}RangeTo`] = props.toValue;
                    }
                })
                .with({ type: "select" }, (props) => {
                    filterParams[`select-${String(props.propertyName)}`] = props.value.value;
                })
                .with({ type: "multiSelect" }, (props) => {
                    filterParams[`multiSelect-${String(props.propertyName)}`] = props.values
                        .map((selectOption) => selectOption.value)
                        .join("|");
                })
                .with({ type: "boolean" }, (props) => {
                    filterParams[`boolean-${String(props.propertyName)}`] = String(props.value);
                })
                .with({ type: "text" }, (props) => {
                    filterParams[`text-${String(props.propertyName)}`] = props.value;
                })
                .with({ type: "number" }, (props) => {
                    filterParams[`number-${String(props.propertyName)}`] = String(props.value);
                })
                .exhaustive();
    }

    return filterParams;
};

export const getFilterSetFromParameters = <Entity>(
    paramRecord: Record<string, string>,
    filters: FilterProps<Entity>[]
): FilterSet<Entity> => {
    const resultFilterSet: FilterSet<Entity> = { filters: [] };
    for (const paramsKey of Object.keys(paramRecord)) {
        for (const filter of filters) {
            match(filter)
                .with({ type: "range" }, (rangeFilter) => {
                    if (
                        (paramsKey === `${rangeFilter.type}-${rangeFilter.propertyName}RangeFrom` ||
                            paramsKey === `${rangeFilter.type}-${rangeFilter.propertyName}RangeTo`) &&
                        !resultFilterSet.filters.some((filter) => filter.propertyName === rangeFilter.propertyName)
                    ) {
                        const data = createRangeFormData(rangeFilter, paramRecord);
                        if (data) {
                            resultFilterSet.filters.push(createRangeFilterObject(data, rangeFilter));
                        }
                    }
                })
                .with({ type: "numberRange" }, (numberRangeFilter) => {
                    if (
                        (paramsKey === `${numberRangeFilter.type}-${numberRangeFilter.propertyName}RangeFrom` ||
                            paramsKey === `${numberRangeFilter.type}-${numberRangeFilter.propertyName}RangeTo`) &&
                        !resultFilterSet.filters.some(
                            (filter) => filter.propertyName === numberRangeFilter.propertyName
                        )
                    ) {
                        const data = createNumberRangeFormData(numberRangeFilter, paramRecord);
                        if (data) {
                            resultFilterSet.filters.push(createNumberRangeFilterObject(data, numberRangeFilter));
                        }
                    }
                })
                .with({ type: "select" }, (selectFilter) => {
                    if (paramsKey === `${selectFilter.type}-${String(selectFilter.propertyName)}`) {
                        const data = createSelectFormData(selectFilter, paramRecord);
                        if (data) {
                            resultFilterSet.filters.push(createSelectFilterObject(data, selectFilter));
                        }
                    }
                })
                .with({ type: "multiSelect" }, (multiSelectFilter) => {
                    if (paramsKey === `${multiSelectFilter.type}-${String(multiSelectFilter.propertyName)}`) {
                        const data = createMultiSelectFormData(multiSelectFilter, paramRecord);
                        if (data) {
                            resultFilterSet.filters.push(createMultiSelectFilterObject(data, multiSelectFilter));
                        }
                    }
                })
                .with({ type: "boolean" }, (booleanFilter) => {
                    if (paramsKey === `${booleanFilter.type}-${String(booleanFilter.propertyName)}`) {
                        const data = createBooleanFormData(booleanFilter, paramRecord);
                        if (data) {
                            resultFilterSet.filters.push(createBooleanFilterObject(data, booleanFilter));
                        }
                    }
                })
                .with({ type: "text" }, (textFilter) => {
                    if (paramsKey === `${textFilter.type}-${String(textFilter.propertyName)}`) {
                        const data = createTextFormData(textFilter, paramRecord);
                        if (data) {
                            resultFilterSet.filters.push(createTextFilterObject(data, textFilter));
                        }
                    }
                })
                .with({ type: "number" }, (numberFilter) => {
                    if (paramsKey === `${numberFilter.type}-${String(numberFilter.propertyName)}`) {
                        const data = createNumberFormData(numberFilter, paramRecord);
                        if (data) {
                            resultFilterSet.filters.push(createNumberFilterObject(data, numberFilter));
                        }
                    }
                })
                .exhaustive();
        }
    }
    return resultFilterSet;
};
