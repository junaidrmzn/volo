import { Tag } from "@volocopter/design-library-react";
import { useMemo } from "react";
import { useIsAuthorizedTo } from "@voloiq/auth";
import { ScheduleItem, ScheduleStatus } from "@voloiq/commercial-scheduling-api/v1";
import { useScheduleStatus } from "@voloiq/commercial-scheduling-utils";
import { ResourceMachineConfigBuilder } from "@voloiq/resource-overview";
import { useGetAllFilters } from "./filter/useGetAllFilters";
import { useGetAllQuickFilters } from "./filter/useGetAllQuickFilters";
import { useScheduleItemTranslation } from "./translations/useScheduleItemTranslation";
import { useScheduleItemOverviewPage } from "./useScheduleOverviewPage";

type ScheduleItemMachineConfigOptions = {
    scheduleId: string;
    scheduleStatus: ScheduleStatus;
    planName: string;
};

export const useScheduleItemMachineConfig = (options: ScheduleItemMachineConfigOptions) => {
    const { scheduleId, scheduleStatus, planName } = options;
    const { variant: scheduleTagVariant, text: scheduleTagText } = useScheduleStatus({ status: scheduleStatus });
    const { t } = useScheduleItemTranslation();
    const canRead = useIsAuthorizedTo(["read"], ["CommercialPlan"]);
    const { fetchAllScheduleItems } = useScheduleItemOverviewPage({ scheduleId });
    const { getAllFilters } = useGetAllFilters();
    const { getAllQuickFilters } = useGetAllQuickFilters();

    const PAGE_SIZE = 10;

    const scheduleItemMachineConfig = useMemo(() => {
        return new ResourceMachineConfigBuilder({
            canCreate: false,
            canRead,
            canUpdate: false,
            canDelete: false,
            getResourceName: () => t("overview.listLabel"),
        })
            .withList<ScheduleItem>({
                fetchAllResources: fetchAllScheduleItems,
                getListItemName: () => "list.listItemName",
                getListTitle: () => t("heading"),
                getModuleTitle: () => "",
                getListTitleTag: () => <Tag colorScheme={scheduleTagVariant}>{scheduleTagText}</Tag>,
                pageSize: PAGE_SIZE,
                getListAriaLabel: () => t("overview.listLabel"),
            })
            .withActionBar({ getResourceInfo: () => t("overview.information", { planName }) })
            .withFilterBar({ getAllFilters })
            .withQuickFilter({ getAllQuickFilters })
            .build();
    }, [
        canRead,
        fetchAllScheduleItems,
        getAllFilters,
        getAllQuickFilters,
        planName,
        scheduleTagText,
        scheduleTagVariant,
        t,
    ]);

    return { scheduleItemMachineConfig };
};
