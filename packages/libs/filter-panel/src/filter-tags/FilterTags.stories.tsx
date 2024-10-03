import type { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";
import type { FilterSet } from "../filter-panel";
import type { FilterTagsProps } from "./FilterTags";
import { FilterTags } from "./FilterTags";

const meta: Meta = {
    title: "Filter Panel/ Filter Tags",
    component: FilterTags,
};
export default meta;

type Log = {
    id: string;
    date: string;
    fcSoftware: string;
    remarks?: string;
    isBenchTest: boolean;
    createdOn: string;
    modifiedOn: string;
};

const filterSet: FilterSet<Log> = {
    filters: [
        {
            type: "range",
            propertyName: "date",
            toDate: "2022-04-06T12:10:00.000Z",
            fromDate: "2022-04-05T12:10:00.000Z",
            isActive: true,
            displayName: "Date of Flight",
        },
        {
            type: "range",
            propertyName: "date",
            fromDate: "2022-04-06T12:10:00.000Z",
            toDate: "2022-04-06T14:10:00.000Z",
            isActive: true,
            displayName: "Date of Flight",
        },
        {
            type: "range",
            propertyName: "id",
            toDate: "2022-04-06T12:10:00.000Z",
            fromDate: undefined,
            isActive: true,
            displayName: "Some Range",
        },
        {
            type: "range",
            propertyName: "remarks",
            toDate: undefined,
            fromDate: "2022-04-05T12:10:00.000Z",
            isActive: true,
            displayName: "Third Range",
        },
        {
            type: "select",
            propertyName: "fcSoftware",
            value: {
                label: "VC",
                value: "VC",
            },
            isActive: true,
            displayName: "FC Software",
        },
        {
            type: "multiSelect",
            propertyName: "createdOn",
            values: [
                {
                    label: "VC",
                    value: "VC",
                },
            ],
            isActive: true,
            displayName: "Multi Select",
        },
    ],
};

export const WithAllowDelete: StoryFn<FilterTagsProps<Log>> = () => {
    const [currentFilterSet, setCurrentFilterSet] = useState<FilterSet<Log>>(filterSet);

    return (
        <FilterTags
            allowDelete
            filterSet={currentFilterSet}
            onFilterDelete={setCurrentFilterSet}
            listAriaLabel="Filter Tag List"
        />
    );
};

export const WithoutAllowDelete: StoryFn<FilterTagsProps<Log>> = () => {
    const [currentFilterSet, setCurrentFilterSet] = useState<FilterSet<Log>>(filterSet);

    return (
        <FilterTags filterSet={currentFilterSet} onFilterDelete={setCurrentFilterSet} listAriaLabel="Filter Tag List" />
    );
};
