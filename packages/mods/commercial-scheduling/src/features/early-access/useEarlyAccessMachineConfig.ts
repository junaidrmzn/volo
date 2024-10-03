import { useMemo } from "react";
import { useIsAuthorizedTo } from "@voloiq/auth";
import { EarlyAccess } from "@voloiq/commercial-scheduling-api/v1";
import { ResourceMachineConfigBuilder } from "@voloiq/resource-overview";
import { useEarlyAccessTranslation } from "./translations/useEarlyAccessTranslation";
import { useEarlyAccessOverviewPage } from "./useEarlyAccessOverviewPage";

export const useEarlyAccessMachineConfig = () => {
    const { t } = useEarlyAccessTranslation();
    const canRead = useIsAuthorizedTo(["read"], ["CommercialPromotion"]);
    const { fetchAllEarlyAccesses } = useEarlyAccessOverviewPage();

    const PAGE_SIZE = 10;

    return useMemo(() => {
        const earlyAccessMachineConfig = new ResourceMachineConfigBuilder({
            canCreate: false,
            canRead,
            canUpdate: false,
            canDelete: false,
            getResourceName: () => t("overview.listLabel"),
        })
            .withList<EarlyAccess>({
                fetchAllResources: fetchAllEarlyAccesses,
                getListItemName: () => "list.listItemName",
                getListTitle: () => t("overview.heading"),
                pageSize: PAGE_SIZE,
                getListAriaLabel: () => t("overview.listLabel"),
            })
            .withActionBar({ getResourceInfo: () => t("overview.information") })
            .build();

        return { earlyAccessMachineConfig };
    }, [canRead, fetchAllEarlyAccesses, t]);
};
