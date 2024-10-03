import { useIsAuthorizedTo } from "@voloiq/auth";
import type { CardListItemProps } from "@voloiq/card-list-item";
import type { ResourcePreviewOptions } from "@voloiq/resource-overview";
import { ResourceOverview } from "@voloiq/resource-overview";
import { useNavigate } from "@voloiq/routing";
import { Parameter } from "../libs/fti-api/apiModels";
import { LoadingPage } from "../libs/loading-page/LoadingPage";
import { BulkCreateParameters } from "./add/BulkCreateParameters";
import { EditParameter } from "./edit/EditParameter";
import { ParameterListItem } from "./list/ParameterListItem";
import { ParameterPreview } from "./preview/ParameterPreview";
import { useFtiOverviewTranslation } from "./translations/useFtiTranslation";
import { useParameterMachineConfig } from "./useParameterMachineConfig";

export const OverviewPage = () => {
    const { parameterMachineConfig, isFilterLoading } = useParameterMachineConfig();
    const { t } = useFtiOverviewTranslation();
    const navigate = useNavigate();
    const canImport = useIsAuthorizedTo(["create"], ["ParameterBulkImportLog"]);

    if (isFilterLoading) return <LoadingPage />;

    return (
        <ResourceOverview machineConfig={parameterMachineConfig}>
            {canImport && (
                <ResourceOverview.ListActionButtons>
                    <ResourceOverview.ListActionButton onClick={() => navigate("import")}>
                        {t("header.importButton")}
                    </ResourceOverview.ListActionButton>
                </ResourceOverview.ListActionButtons>
            )}
            <ResourceOverview.ListItem>
                {(parameter: Parameter, cardListItemProps: CardListItemProps) => (
                    <ParameterListItem parameter={parameter} {...cardListItemProps} />
                )}
            </ResourceOverview.ListItem>
            <ResourceOverview.Preview>
                {(parameter: Parameter, options: ResourcePreviewOptions) => (
                    <ParameterPreview
                        parameter={parameter}
                        onStatusChange={() => {
                            options.reloadPreview();
                            options.reloadList();
                        }}
                    />
                )}
            </ResourceOverview.Preview>
            <ResourceOverview.Add>{BulkCreateParameters}</ResourceOverview.Add>
            <ResourceOverview.Edit>{EditParameter}</ResourceOverview.Edit>
        </ResourceOverview>
    );
};
