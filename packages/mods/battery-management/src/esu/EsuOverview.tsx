import { isSizeBasedPagination } from "@voloiq/service";
import { useDeleteEsu } from "../api-hooks/useEsuService";
import { OverviewLayout, OverviewPagination } from "../components";
import { useResourcesTranslation } from "../translations/useResourcesTranslation";
import { EsuMenuContent } from "./EsuMenuContent";
import { EsuList } from "./list/EsuList";
import { useEsuOverviewPage } from "./useEsuOverviewPage";

export const EsuOverview = () => {
    const { t } = useResourcesTranslation();
    const { data, state, error, pagination, setPage, sendRequest } = useEsuOverviewPage();
    const { sendRequestById: sendDeleteRequest } = useDeleteEsu();

    return (
        <OverviewLayout>
            <OverviewLayout.Page
                heading={t("esu.overview.heading")}
                subheading={t("esu.overview.subheading")}
                state={state}
                error={error}
                refetch={sendRequest}
                onDelete={sendDeleteRequest}
                entityName={t("esu.model.name")}
            >
                <EsuList esus={data} />
                {isSizeBasedPagination(pagination) && pagination.totalPages > 1 && (
                    <OverviewPagination
                        data-testid="overview-pagination"
                        totalItems={pagination?.totalElements ?? -1}
                        onCurrentPageChange={(newPage) => setPage(newPage)}
                        currentPage={pagination?.page ?? -1}
                    />
                )}
            </OverviewLayout.Page>
            <OverviewLayout.Menu menuKey="main">
                <EsuMenuContent refetch={sendRequest} />
            </OverviewLayout.Menu>
        </OverviewLayout>
    );
};
