import { Pagination } from "@volocopter/design-library-react";
import { useGlobalState } from "../global-state/useGlobalState";
import { useResourceListTranslations } from "./translations/useResourceOverviewTranslation";
import { usePaginationParameters } from "./usePaginationParameters";
import { useResourcePagination } from "./useResourcePagination";

export const ResourcePagination = () => {
    const [state, send] = useGlobalState();
    const { t } = useResourceListTranslations();

    const { context } = state;

    const {
        meta: {
            resourceOverview: { getResourceName },
        },
    } = state;

    const { page, setPage } = usePaginationParameters(getResourceName());

    useResourcePagination(page, setPage, context.page);

    return (
        <Pagination
            ariaLabel={t("pagination.label")}
            nextPageAriaLabel={t("pagination.nextPageAriaLabel")}
            previousPageAriaLabel={t("pagination.previousPageAriaLabel")}
            totalItems={context.totalItems}
            currentPage={page}
            itemsPerPage={context.pageSize}
            onCurrentPageChange={(page) => {
                setPage(page);
                send({ type: "CHANGE_PAGE", page });
            }}
        />
    );
};
