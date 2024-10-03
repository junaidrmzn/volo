import type { BoxProps } from "@volocopter/design-library-react";
import { Box } from "@volocopter/design-library-react";
import { ExpandableFilterBar } from "@volocopter/filter-react";
import { useResourceFilterTranslations } from "./translations/useResourceFilterTranslations";
import { useFiltersFromLocalStorage } from "./useFiltersFromLocalStorage";

type ResourceFilterBarProps = BoxProps & {
    isReadOnly?: boolean;
};

export const ResourceFilterBar = (props: ResourceFilterBarProps) => {
    const { isReadOnly } = props;
    const { t } = useResourceFilterTranslations();

    const { properties, applyFilters, sortingConfig } = useFiltersFromLocalStorage();

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
        <Box {...props}>
            <ExpandableFilterBar
                isReadOnly={isReadOnly}
                properties={properties}
                sortingConfig={sortingConfig}
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
                role="toolbar"
                removeFilterAriaLabel={t("delete")}
                comparisonOperatorsLabels={comparisonOperatorsLabels}
                sortingConfigLabels={sortingConfigLabels}
            />
        </Box>
    );
};
