import type { Property } from "@volocopter/filter-react";
import { getParameterIdentifier } from "./getParameterIdentifier";
import { getSortingParameterIdentifier } from "./sorting/getSortingParameterIdentifier";

export const splitParameters = (parameters: Record<string, string>, properties: Property[]) => {
    const filterKeys = new Set(
        Object.keys(parameters).filter((parameterKey) =>
            properties.some((filter) =>
                new RegExp(getParameterIdentifier(filter.type, filter.propertyName)).test(parameterKey)
            )
        )
    );
    const entries = Object.entries(parameters);
    const filterParameters = Object.fromEntries(entries.filter(([key]) => filterKeys.has(key)));
    const otherParameters = Object.fromEntries(entries.filter(([key]) => !filterKeys.has(key)));

    return { filterParameters, otherParameters };
};

export const splitSortingParameter = (parameters: Record<string, string>) => {
    const entries = Object.entries(parameters);
    const sortingParameter = Object.fromEntries(entries.filter(([key]) => key === getSortingParameterIdentifier()));

    return { sortingParameter };
};
