import { ExpandableFilterBar } from "@volocopter/filter-react";
import type { Property } from "@volocopter/filter-react";
import { memo } from "react";
import { useFilterBarTranslations } from "./translations/useFilterBarTranslations";
import { useFilterBar } from "./useFilterBar";

export type FilterBarProps = {
    properties: Property[];
    onFilterChange: (filterValues: string) => void;
    isSerialized?: boolean;
};

const arePropsEqual = (previousProps: FilterBarProps, nextProps: FilterBarProps) => {
    for (let index = 0; index < previousProps.properties.length; index++) {
        const previousProperty = previousProps.properties[index];
        const nextProperty = nextProps.properties[index];

        if (
            previousProperty &&
            nextProperty &&
            (previousProperty.type === "select" || previousProperty.type === "select-multiple") &&
            (nextProperty.type === "select" || nextProperty.type === "select-multiple") &&
            previousProperty.options.length !== nextProperty.options.length
        ) {
            return false;
        }
    }

    return previousProps.properties.length === nextProps.properties.length;
};

export const FilterBar = memo((props: FilterBarProps) => {
    const { properties, onFilterChange, isSerialized = true } = props;
    const { t } = useFilterBarTranslations();
    const { applyFilters } = useFilterBar({ onFilterChange, isSerialized });

    const comparisonOperatorsLabels = {
        equalOperatorLabel: t("comparisonOperator.equal"),
        notEqualOperatorLabel: t("comparisonOperator.notEqual"),
        containsOperatorLabel: t("comparisonOperator.contains"),
        notContainsOperatorLabel: t("comparisonOperator.notContains"),
        betweenOperatorLabel: t("comparisonOperator.between"),
        nullOperatorLabel: t("comparisonOperator.null"),
    };

    const sortingConfigLabels = {
        sortedByLabel: t("sortingConfig.sortedBy"),
        ascendingOperatorLabel: t("sortingConfig.ascending"),
        descendingOperatorLabel: t("sortingConfig.descending"),
    };

    return (
        <ExpandableFilterBar
            properties={properties}
            applyLabel={t("apply")}
            noResultsLabel={t("noResults")}
            getCountLabel={(count) => t("countLabel").replace("{count}", count.toLocaleString())}
            inputPlaceholder={t("inputPlaceholder")}
            minNumberPlaceholder={t("minNumberPlaceholder")}
            maxNumberPlaceholder={t("maxNumberPlaceholder")}
            minDatePlaceholder={t("minDatePlaceholder")}
            maxDatePlaceholder={t("maxDatePlaceholder")}
            enterWorkflowAriaLabel={t("enterWorkflow")}
            leaveWorkflowAriaLabel={t("leaveWorkflow")}
            selectOptionAriaLabel={t("selectOption")}
            onApplyFilters={applyFilters}
            removeFilterAriaLabel={t("delete")}
            comparisonOperatorsLabels={comparisonOperatorsLabels}
            sortingConfigLabels={sortingConfigLabels}
        />
    );
}, arePropsEqual);
