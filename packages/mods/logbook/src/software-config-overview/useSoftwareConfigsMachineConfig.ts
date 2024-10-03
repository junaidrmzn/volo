import { useMemo } from "react";
import { useIsAuthorizedTo } from "@voloiq/auth";
import { useFeatureFlags } from "@voloiq/feature-flags";
import type { SoftwareConfig } from "@voloiq/logbook-api/v6";
import { ResourceMachineConfigBuilder } from "@voloiq/resource-overview";
import { useSoftwareConfigTranslations } from "./translations/useSoftwareConfigTranslations";
import { useMachineApis } from "./useMachineApis";

export const useSoftwareConfigsMachineConfig = () => {
    const { t, i18n } = useSoftwareConfigTranslations();
    const { deleteSoftwareConfig, fetchSoftwareConfig, fetchAllSoftwareConfigs } = useMachineApis();
    const canCreate = useIsAuthorizedTo(["create"], ["SoftwareConfiguration"]);
    const canRead = useIsAuthorizedTo(["read"], ["SoftwareConfiguration"]);
    const canUpdate = useIsAuthorizedTo(["update"], ["SoftwareConfiguration"]);
    const canDelete = useIsAuthorizedTo(["delete"], ["SoftwareConfiguration"]);
    const { isFeatureFlagEnabled } = useFeatureFlags();

    const softwareConfigMachineConfig = useMemo(
        () =>
            new ResourceMachineConfigBuilder({
                canCreate,
                canRead,
                canUpdate,
                canDelete,
                getResourceName: () => t("resourceLabel"),
            })
                .withList<SoftwareConfig>({
                    fetchAllResources: fetchAllSoftwareConfigs,
                    getListItemName: () => t("resourceLabel"),
                    getListTitle: () =>
                        isFeatureFlagEnabled("vte-1596") ? t("Software Configurations") : t("headerTitle"),
                    getListDescription: () => t("Description"),
                    usesNewNavigationConcept: isFeatureFlagEnabled("vte-1596"),
                    getModuleTitle: () => t("moduleName"),
                    pageSize: 10,
                    getListAriaLabel: () => t("listAriaLabel"),
                })
                .withPreview<SoftwareConfig>({
                    fetchPreviewResource: fetchSoftwareConfig,
                    getPreviewTitle: () => t("resourceLabel"),
                })
                .withDelete({
                    deleteResource: deleteSoftwareConfig,
                    getDeleteTexts: () => ({
                        confirmationModal: {
                            headerText: t("deletionHeader"),
                            bodyText: t("deletionText"),
                            deleteButtonText: t("delete"),
                            cancelButtonText: t("cancel"),
                        },
                        deleteButtonText: t("delete"),
                    }),
                })
                .withAdd()
                .withSort({
                    sortingOptions: [
                        {
                            id: "createTime",
                            label: t("createTime"),
                        },
                    ],
                })
                .build(),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [fetchSoftwareConfig, fetchAllSoftwareConfigs, i18n.language]
    );

    return {
        softwareConfigMachineConfig,
    };
};
