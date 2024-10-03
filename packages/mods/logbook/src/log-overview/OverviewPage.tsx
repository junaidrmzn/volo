import { Icon } from "@volocopter/design-library-react";
import type { CardListItemProps } from "@voloiq/card-list-item";
import type { Log } from "@voloiq/logbook-api/v6";
import type { ResourceDetailsOptions } from "@voloiq/resource-overview";
import { ResourceOverview } from "@voloiq/resource-overview";
import { LoadingPage } from "../libs/logbook/loading-page/LoadingPage";
import { LogbookAdd } from "./add/LogbookAdd";
import { LogDetailsPage } from "./details/LogDetailsPage";
import { LogListItemPage } from "./list/LogListItemPage";
import { LogPreviewPage } from "./preview/LogPreviewPage";
import { useLogbookPreviewTranslation } from "./preview/translations/useLogbookPreviewTranslation";
import { useLogbookMachineConfig } from "./useLogbookMachineConfig";
import { useOverviewAnalyticsButton } from "./useOverviewAnalyticsButton";

export const OverviewPage = () => {
    const { logbookMachineConfig, isFilterLoading } = useLogbookMachineConfig();
    const { isAtLeastOneFileProcessed, handleAnalyticsClick } = useOverviewAnalyticsButton();
    const { t } = useLogbookPreviewTranslation();
    if (isFilterLoading) return <LoadingPage />;

    return (
        <ResourceOverview<Log> machineConfig={logbookMachineConfig}>
            <ResourceOverview.ListItem>
                {(log: Log, cardListItemProps: CardListItemProps) => (
                    <LogListItemPage log={log} {...cardListItemProps} />
                )}
            </ResourceOverview.ListItem>
            <ResourceOverview.Details>
                {(log: Log, options: ResourceDetailsOptions) => (
                    <LogDetailsPage log={log} reloadDetails={options.reloadDetails} />
                )}
            </ResourceOverview.Details>
            <ResourceOverview.Preview>{(log: Log) => <LogPreviewPage log={log} />}</ResourceOverview.Preview>
            <ResourceOverview.PreviewActionButtons>
                {(log: Log) => (
                    <>
                        {isAtLeastOneFileProcessed(log) && log.dataState !== "TM_DATA" ? (
                            <ResourceOverview.PreviewActionButton
                                icon={<Icon icon="externalLink" />}
                                onClick={() => handleAnalyticsClick(log.id, log.aircraft.productLine)}
                                variant="ghost"
                            >
                                {t("analyticsButton")}
                            </ResourceOverview.PreviewActionButton>
                        ) : null}
                    </>
                )}
            </ResourceOverview.PreviewActionButtons>

            <ResourceOverview.Add>{LogbookAdd}</ResourceOverview.Add>
        </ResourceOverview>
    );
};
