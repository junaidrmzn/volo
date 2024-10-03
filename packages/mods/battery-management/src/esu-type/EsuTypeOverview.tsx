import { isSizeBasedPagination } from "@voloiq/service";
import { useDeleteEsuType } from "../api-hooks/useEsuTypeService";
import { OverviewLayout, OverviewPagination } from "../components";
import { useResourcesTranslation } from "../translations/useResourcesTranslation";
import { EsuTypeMenuContent } from "./EsuTypeMenuContent";
import { EsuTypeList } from "./list/EsuTypeList";
import { useEsuTypeOverviewPage } from "./useEsuTypeOverviewPage";

export const EsuTypeOverview = () => {
    const { t } = useResourcesTranslation();
    const { data, state, error, pagination, setPage, sendRequest, page } = useEsuTypeOverviewPage();
    const { sendRequestById: sendDeleteRequest } = useDeleteEsuType();

    return (
        <OverviewLayout>
            <OverviewLayout.Page
                heading={t("esu-type.overview.heading")}
                subheading={t("esu-type.overview.subheading")}
                state={state}
                error={error}
                refetch={sendRequest}
                onDelete={sendDeleteRequest}
                entityName={t("esu-type.model.name")}
            >
                <EsuTypeList esuTypes={data} />
                {isSizeBasedPagination(pagination) && pagination.totalPages > 1 && (
                    <OverviewPagination
                        totalItems={pagination?.totalElements ?? -1}
                        onCurrentPageChange={(newPage) => setPage(newPage)}
                        currentPage={page}
                    />
                )}
            </OverviewLayout.Page>
            <OverviewLayout.Menu menuKey="main">
                <EsuTypeMenuContent refetch={sendRequest} />
            </OverviewLayout.Menu>
        </OverviewLayout>
    );
};
