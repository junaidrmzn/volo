import type { StyleProps } from "@volocopter/design-library-react";
import { Box, HStack, List, ListItem, Skeleton, Tag } from "@volocopter/design-library-react";
import { match } from "ts-pattern";
import type { FilterObject, FilterSet } from "../filter-panel";
import { getReadableRange } from "./readable-range";

export type FilterTagsProps<EntityType> = {
    filterSet: FilterSet<EntityType>;
    onFilterDelete?: (filterSet: FilterSet<EntityType>, deletedFilter: FilterObject<EntityType>) => void;
    allowDelete?: boolean;
    listAriaLabel: string;
} & StyleProps;

export const FilterTags = <EntityType extends {}>(props: FilterTagsProps<EntityType>) => {
    const {
        filterSet: { filters },
        onFilterDelete,
        allowDelete = false,
        listAriaLabel,
        ...styleProps
    } = props;

    const handleDeleteFilter = (filter: FilterObject<EntityType>) => {
        const newFilterSet = {
            filters: filters.filter((filterElement) => filterElement.propertyName !== filter.propertyName),
        };
        onFilterDelete?.(newFilterSet, filter);
    };

    return (
        <Box {...styleProps}>
            <List aria-label={listAriaLabel} mt={2}>
                {filters.map((filter) => (
                    <ListItem
                        key={filter.propertyName}
                        display="inline-block"
                        mr={2}
                        mb={2}
                        aria-label={`${listAriaLabel} : ${filter.displayName}`}
                    >
                        <Tag>
                            {allowDelete && (
                                <Tag.ClickableIcon
                                    icon="close"
                                    aria-label="close"
                                    onClick={() => handleDeleteFilter(filter)}
                                />
                            )}
                            <Tag.Label variant="light">
                                {match(filter)
                                    .with({ type: "range" }, (data) => {
                                        const { fromDate, toDate, useUtcTime } = data;
                                        return getReadableRange({
                                            start: fromDate ? new Date(fromDate) : undefined,
                                            end: toDate ? new Date(toDate) : undefined,
                                            useUtcTime,
                                        });
                                    })
                                    .with(
                                        { type: "numberRange" },
                                        (data) => `${data.displayName}: ${data.fromValue} - ${data.toValue}`
                                    )
                                    .with({ type: "select" }, (data) => {
                                        if (!data.value) {
                                            return null;
                                        }
                                        if (data.value.label) {
                                            return `${data.displayName}: ${data.value.label}`;
                                        }
                                        return (
                                            <HStack>
                                                <Box>{data.displayName}:</Box>
                                                <Skeleton width={20} height={5} mt={0} />
                                            </HStack>
                                        );
                                    })
                                    .with({ type: "multiSelect" }, (data) => {
                                        if (data.values.length > 0 && data.values.every((vales) => vales.label)) {
                                            return `${data.displayName}: ${data.values
                                                .map((filterValue) => filterValue.label)
                                                .join(", ")}`;
                                        }
                                        return (
                                            <HStack>
                                                <Box>{data.displayName}:</Box>
                                                <Skeleton width={20} height={5} mt={0} />
                                            </HStack>
                                        );
                                    })
                                    .with(
                                        { type: "boolean" },
                                        (data) =>
                                            `${data.displayName}: ${data.value ? data.trueLabel : data.falseLabel}`
                                    )
                                    .with({ type: "text" }, (data) => `${data.displayName}: ${data.value}`)
                                    .with({ type: "number" }, (data) => `${data.displayName}: ${data.value}`)
                                    .exhaustive()}
                            </Tag.Label>
                        </Tag>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};
