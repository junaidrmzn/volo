import { useMemo } from "react";
import { useIsAuthorizedTo } from "@voloiq/auth";
import { useFeatureFlags } from "@voloiq/feature-flags";
import type { TestPointParameter } from "@voloiq/flight-test-definition-api/v1";
import { useDeleteParameter, useFetchAllParameters, useFetchParameter } from "@voloiq/flight-test-definition-api/v1";
import { ResourceMachineConfigBuilder } from "@voloiq/resource-overview";
import { useGetAllFilterProperties } from "./filter/useGetAllFilterProperties";
import { useParameterMachineConfigTranslation } from "./translations/useParameterOverviewTranslation";

export const useParameterMachineConfig = () => {
    const { t } = useParameterMachineConfigTranslation();
    const canCreate = useIsAuthorizedTo(["create"], ["TestPointParameter"]);
    const canRead = useIsAuthorizedTo(["read"], ["TestPointParameter"]);
    const canUpdate = useIsAuthorizedTo(["update"], ["TestPointParameter"]);
    const canDelete = useIsAuthorizedTo(["delete"], ["TestPointParameter"]);
    const { fetchAllParameters } = useFetchAllParameters();
    const { fetchParameter } = useFetchParameter();
    const { deleteParameter } = useDeleteParameter();
    const { getAllFilterProperties } = useGetAllFilterProperties();
    const { isFeatureFlagEnabled } = useFeatureFlags();

    const parameterMachineConfig = useMemo(
        () =>
            new ResourceMachineConfigBuilder({
                canCreate,
                canDelete,
                canRead,
                canUpdate,
                getResourceName: () => t("Test Point Parameter"),
            })
                .withList<TestPointParameter>({
                    fetchAllResources: fetchAllParameters,
                    getListTitle: () => t("Test Point Parameters"),
                    getListDescription: () => t("Description"),
                    usesNewNavigationConcept: isFeatureFlagEnabled("vte-1596"),
                    getListItemName: (parameter) => parameter.name,
                    pageSize: 100,
                })
                .withPreview<TestPointParameter>({
                    fetchPreviewResource: fetchParameter,
                    getPreviewTitle: (parameter) => parameter.name,
                })
                .withAdd()
                .withEdit()
                .withDelete<TestPointParameter>({
                    deleteResource: deleteParameter,
                    getDeleteTexts: (parameter) => ({
                        confirmationModal: {
                            headerText: t("Delete test point parameter _name_", { name: parameter.name }),
                            bodyText: t("Are you sure you want to delete the test point parameter _name_ permanently", {
                                name: parameter.name,
                            }),
                        },
                    }),
                })
                .withFilterBar({ getAllFilters: getAllFilterProperties })
                .build(),
        [
            canCreate,
            canDelete,
            canRead,
            canUpdate,
            fetchAllParameters,
            fetchParameter,
            deleteParameter,
            t,
            getAllFilterProperties,
        ]
    );

    return { parameterMachineConfig };
};
