import { CardListItem, Icon } from "@volocopter/design-library-react";
import type { ChargingLog } from "@voloiq-typescript-api/battery-management-types";
import type { CardListItemProps } from "@voloiq/card-list-item";
import { useFeatureFlags } from "@voloiq/feature-flags";
import { ResourceOverview } from "@voloiq/resource-overview";
import { LoadingSpinner } from "../components";
import { useResourcesTranslation } from "../translations/useResourcesTranslation";
import { ChargingLogListItem } from "./list/ChargingLogListItem";
import { ChargingLogPreview } from "./preview/ChargingLogPreview";
import { useChargingLogOverviewConfig } from "./useChargingLogOverviewConfig";
import { useGenerateChargingReportButton } from "./useGenerateChargingReportButton";
import { useGenerateRawMeasurementDataButton } from "./useGenerateRawMeasurementDataButton";

export const ChargingLogOverview = () => {
    const { isFeatureFlagEnabled } = useFeatureFlags();
    const { t } = useResourcesTranslation();
    let selectedEsu = "";
    const { chargingLogOverviewConfig } = useChargingLogOverviewConfig();
    const { handleGenerateReportClick, isUploadSuccessfulOrIncomplete, reportGenerationInProgress } =
        useGenerateChargingReportButton();
    const {
        handleGenerateRawDataMeasurementButtonClick,
        isUploadSuccessfulOrIncomplete: rawDataAvailableForDownload,
        rawMeasurementDataCollectionInProgress,
    } = useGenerateRawMeasurementDataButton();

    const getEsuSelectionFromLogPreview = (selectedEsuFromPreview: string) => {
        selectedEsu = selectedEsuFromPreview;
        return selectedEsu;
    };

    return (
        <ResourceOverview<ChargingLog> machineConfig={chargingLogOverviewConfig}>
            <ResourceOverview.ListItem>
                {(chargingLog: ChargingLog, cardListItemProps: CardListItemProps) => (
                    <CardListItem {...cardListItemProps}>
                        <ChargingLogListItem chargingLog={chargingLog} />
                    </CardListItem>
                )}
            </ResourceOverview.ListItem>
            <ResourceOverview.Preview>
                {(chargingLog: ChargingLog) => (
                    <ChargingLogPreview chargingLog={chargingLog} onEsuSelection={getEsuSelectionFromLogPreview} />
                )}
            </ResourceOverview.Preview>
            <ResourceOverview.PreviewActionButtons>
                {(chargingLog: ChargingLog) => (
                    <>
                        {isFeatureFlagEnabled("vbm-450-reports") && (
                            <>
                                {isUploadSuccessfulOrIncomplete(chargingLog) ? (
                                    <ResourceOverview.PreviewActionButton
                                        icon={<Icon icon="file" />}
                                        onClick={() => handleGenerateReportClick(chargingLog, selectedEsu)}
                                        variant="ghost"
                                    >
                                        {reportGenerationInProgress ? (
                                            <LoadingSpinner />
                                        ) : (
                                            t("generic.generate report button")
                                        )}
                                    </ResourceOverview.PreviewActionButton>
                                ) : null}
                            </>
                        )}
                        {isFeatureFlagEnabled("vbm-450") && (
                            <>
                                {rawDataAvailableForDownload(chargingLog) ? (
                                    <ResourceOverview.PreviewActionButton
                                        icon={<Icon icon="download" />}
                                        onClick={() => handleGenerateRawDataMeasurementButtonClick(chargingLog)}
                                        variant="ghost"
                                    >
                                        {rawMeasurementDataCollectionInProgress ? (
                                            <LoadingSpinner />
                                        ) : (
                                            t("generic.generate raw measurement")
                                        )}
                                    </ResourceOverview.PreviewActionButton>
                                ) : null}
                            </>
                        )}
                    </>
                )}
            </ResourceOverview.PreviewActionButtons>
        </ResourceOverview>
    );
};
