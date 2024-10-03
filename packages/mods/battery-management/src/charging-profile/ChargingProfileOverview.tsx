import { isSizeBasedPagination } from "@voloiq/service";
import { useDeleteChargingProfile } from "../api-hooks/useChargingProfileService";
import { OverviewLayout, OverviewPagination } from "../components";
import { useResourcesTranslation } from "../translations/useResourcesTranslation";
import { ChargingProfileMenuContent } from "./ChargingProfileMenuContent";
import { ChargingProfileList } from "./list/ChargingProfileList";
import { useChargingProfileOverviewPage } from "./useChargingProfileOverviewPage";

export const ChargingProfileOverview = () => {
    const { t } = useResourcesTranslation();
    const { data, state, error, pagination, setPage, sendRequest, page } = useChargingProfileOverviewPage();
    const { sendRequestById: sendDeleteRequest } = useDeleteChargingProfile();

    return (
        <OverviewLayout>
            <OverviewLayout.Page
                heading={t("charging-profile.overview.heading")}
                subheading={t("charging-profile.overview.subheading")}
                state={state}
                error={error}
                refetch={sendRequest}
                onDelete={sendDeleteRequest}
                entityName={t("charging-profile.model.name")}
            >
                <ChargingProfileList chargingProfiles={data} />
                {isSizeBasedPagination(pagination) && pagination.totalPages > 1 && (
                    <OverviewPagination
                        totalItems={pagination?.totalElements ?? -1}
                        onCurrentPageChange={(newPage) => setPage(newPage)}
                        currentPage={page}
                    />
                )}
            </OverviewLayout.Page>
            <OverviewLayout.Menu menuKey="main">
                <ChargingProfileMenuContent refetch={sendRequest} />
            </OverviewLayout.Menu>
        </OverviewLayout>
    );
};
