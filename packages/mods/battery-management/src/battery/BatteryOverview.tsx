import { isSizeBasedPagination } from "@voloiq/service";
import { useDeleteBattery } from "../api-hooks/useBatteryService";
import { OverviewLayout, OverviewPagination } from "../components";
import { useResourcesTranslation } from "../translations/useResourcesTranslation";
import { BatteryMenuContent } from "./BatteryMenuContent";
import { BatteryList } from "./list/BatteryList";
import { useBatteryOverviewPage } from "./useBatteryOverviewPage";

export const BatteryOverview = () => {
    const { t } = useResourcesTranslation();
    const { data, state, error, pagination, setPage, sendRequest, page } = useBatteryOverviewPage();
    const { sendRequestById: sendDeleteRequest } = useDeleteBattery();

    return (
        <OverviewLayout>
            <OverviewLayout.Page
                heading={t("battery.overview.heading")}
                subheading={t("battery.overview.subheading")}
                state={state}
                error={error}
                refetch={sendRequest}
                onDelete={sendDeleteRequest}
                entityName={t("battery.model.name")}
            >
                <BatteryList batteries={data} />
                {isSizeBasedPagination(pagination) && pagination.totalPages > 1 && (
                    <OverviewPagination
                        totalItems={pagination?.totalElements ?? -1}
                        onCurrentPageChange={(newPage) => setPage(newPage)}
                        currentPage={page}
                    />
                )}
            </OverviewLayout.Page>
            <OverviewLayout.Menu menuKey="main">
                <BatteryMenuContent refetch={sendRequest} />
            </OverviewLayout.Menu>
        </OverviewLayout>
    );
};
