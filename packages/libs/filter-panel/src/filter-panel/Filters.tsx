import { match } from "ts-pattern";
import {
    BooleanFilter,
    DateRangeFilter,
    MultiSelectFilter,
    NumberFilter,
    NumberRangeFilter,
    SelectFilter,
    TextFilter,
} from "../filter-modules";
import type { FilterProps } from "./FilterPanelTypes";

export type FiltersProps<EntityType> = {
    filters: FilterProps<EntityType>[];
};

export const Filters = <EntityType extends {}>(props: FiltersProps<EntityType>) => {
    const { filters } = props;

    return (
        <>
            {filters.map((filter) =>
                match(filter)
                    .with({ type: "range" }, (data) => <DateRangeFilter {...data} key={data.propertyName} />)
                    .with({ type: "numberRange" }, (data) => <NumberRangeFilter {...data} key={data.propertyName} />)
                    .with({ type: "select" }, (data) => <SelectFilter {...data} key={data.propertyName} />)
                    .with({ type: "multiSelect" }, (data) => <MultiSelectFilter {...data} key={data.propertyName} />)
                    .with({ type: "boolean" }, (data) => <BooleanFilter {...data} key={data.propertyName} />)
                    .with({ type: "text" }, (data) => <TextFilter {...data} key={data.propertyName} />)
                    .with({ type: "number" }, (data) => <NumberFilter {...data} key={data.propertyName} />)
                    .exhaustive()
            )}
        </>
    );
};
