import type { PaginationProps } from "@volocopter/design-library-react";
import { Pagination } from "@volocopter/design-library-react";
import React from "react";
import type { Optional } from "@voloiq/utils";
import { useCrewApiTranslation } from "../../translations/useCrewApiTranslation";

export type OverviewPaginationProps = Optional<
    PaginationProps,
    "nextPageAriaLabel" | "previousPageAriaLabel" | "ariaLabel"
>;

export const OverviewPagination = (props: OverviewPaginationProps) => {
    const { t } = useCrewApiTranslation();

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
