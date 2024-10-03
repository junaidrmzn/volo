import type { PaginationProps } from "@volocopter/design-library-react";
import { Pagination } from "@volocopter/design-library-react";
import type { Optional } from "@voloiq/utils";
import { useResourcesTranslation } from "../../translations/useResourcesTranslation";

export type OverviewPaginationProps = Optional<
    PaginationProps,
    "nextPageAriaLabel" | "previousPageAriaLabel" | "ariaLabel"
>;

export const OverviewPagination = (props: OverviewPaginationProps) => {
    const { t } = useResourcesTranslation();

    return (
        <Pagination
            nextPageAriaLabel={t("generic.pagination.nextPageAriaLabel")}
            previousPageAriaLabel={t("generic.pagination.previousPageAriaLabel")}
            ariaLabel={t("generic.pagination.ariaLabel")}
            pt={6}
            {...props}
        />
    );
};
