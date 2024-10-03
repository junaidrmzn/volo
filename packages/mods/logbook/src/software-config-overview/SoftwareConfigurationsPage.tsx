import { Icon } from "@volocopter/design-library-react";
import type { CardListItemProps } from "@voloiq/card-list-item";
import type { SoftwareConfig } from "@voloiq/logbook-api/v6";
import { ResourceOverview } from "@voloiq/resource-overview";
import { AddSoftwareConfigurationPage } from "./add/AddSoftwareConfigurationPage";
import { SoftwareConfigListItem } from "./list/SoftwareConfigListItem";
import { SoftwareConfigPreview } from "./preview/SoftwareConfigPreview";
import { useSoftwareConfigTranslations } from "./translations/useSoftwareConfigTranslations";
import { useSoftwareConfigsMachineConfig } from "./useSoftwareConfigsMachineConfig";
import { useSoftwareConfigurationPage } from "./useSoftwareConfigurationPage";

export const SoftwareConfigurationsPage = () => {
    const { softwareConfigMachineConfig } = useSoftwareConfigsMachineConfig();
    const { handleDownloadButtonPress } = useSoftwareConfigurationPage();
    const { t } = useSoftwareConfigTranslations();

    return (
        <ResourceOverview<SoftwareConfig> machineConfig={softwareConfigMachineConfig}>
            <ResourceOverview.ListItem>
                {(softwareConfig: SoftwareConfig, cardListItemProps: CardListItemProps) => (
                    <SoftwareConfigListItem softwareConfig={softwareConfig} {...cardListItemProps} />
                )}
            </ResourceOverview.ListItem>
            <ResourceOverview.Preview>
                {(softwareConfig: SoftwareConfig) => <SoftwareConfigPreview softwareConfig={softwareConfig} />}
            </ResourceOverview.Preview>
            <ResourceOverview.PreviewActionButtons>
                {(softwareConfig: SoftwareConfig) => (
                    <ResourceOverview.PreviewActionButton
                        icon={<Icon icon="download" />}
                        onClick={() => handleDownloadButtonPress(softwareConfig.id)}
                        variant="ghost"
                    >
                        {t("preview.downloadButton")}
                    </ResourceOverview.PreviewActionButton>
                )}
            </ResourceOverview.PreviewActionButtons>
            <ResourceOverview.Add>{AddSoftwareConfigurationPage}</ResourceOverview.Add>
        </ResourceOverview>
    );
};
