import { MasterModel, StatusModel, TestTypeEnum } from "@voloiq-typescript-api/ftd-types";
import type { FilterProperty } from "@voloiq/resource-overview";
import { useDefinitionFilterTranslation } from "./translations/useDefinitionFilterTranslation";

export const useGetAllFilterProperties = () => {
    const { t } = useDefinitionFilterTranslation();
    const getAllFilterProperties = (): FilterProperty[] => {
        return [
            {
                type: "text",
                propertyName: "title",
                label: t("Filter Panel.Title"),
                group: t("Filter Panel.Filters"),
            },
            {
                type: "text",
                propertyName: "requesterName",
                label: t("Filter Panel.Requester Name"),
                group: t("Filter Panel.Filters"),
            },
            {
                type: "number",
                propertyName: "ata",
                label: t("Filter Panel.Ata"),
                group: t("Filter Panel.Filters"),
            },
            {
                type: "select",
                propertyName: "masterModel",
                options: [
                    { label: t("Filter Panel.Master Model.2X").toUpperCase(), value: MasterModel["2X"] },
                    {
                        label: t("Filter Panel.Master Model.VC2-1").toUpperCase(),
                        value: MasterModel["VC2-1"],
                    },
                    {
                        label: t("Filter Panel.Master Model.VD150").toUpperCase(),
                        value: MasterModel.VD150,
                    },
                ],
                label: t("Filter Panel.Master Model.Name"),
                group: t("Filter Panel.Filters"),
            },
            {
                type: "select",
                propertyName: "testType",
                options: [
                    { label: t("Filter Panel.Test Type.Flight").toUpperCase(), value: TestTypeEnum.FLIGHT },
                    {
                        label: t("Filter Panel.Test Type.Ground").toUpperCase(),
                        value: TestTypeEnum.GROUND,
                    },
                ],
                label: t("Filter Panel.Test Type.Name"),
                group: t("Filter Panel.Filters"),
            },
            {
                type: "select",
                propertyName: "status",
                options: [
                    { label: t("Filter Panel.Definition Status.Draft"), value: StatusModel.DRAFT },
                    { label: t("Filter Panel.Definition Status.Released"), value: StatusModel.APPROVED },
                ],
                label: t("Filter Panel.Status"),
                group: t("Filter Panel.Filters"),
            },
            {
                type: "date-range",
                propertyName: "createTime",
                minLabel: t("Filter Panel.To"),
                maxLabel: t("Filter Panel.From"),
                label: t("Filter Panel.Created Date"),
                withUtcTime: true,
                group: t("Filter Panel.Filters"),
            },
            {
                type: "select",
                propertyName: "msn",
                label: "MSN",
                options: [
                    { value: "01", label: t("Filter Panel.msn.01") },
                    { value: "02", label: t("Filter Panel.msn.02") },
                    { value: "03", label: t("Filter Panel.msn.03") },
                    { value: "04", label: t("Filter Panel.msn.04") },
                    { value: "05", label: t("Filter Panel.msn.05") },
                    { value: "B0-01", label: t("Filter Panel.msn.B0-01") },
                    { value: "B0-02", label: t("Filter Panel.msn.B0-02") },
                    {
                        value: "MSN01",
                        label: t("Filter Panel.msn.MSN01"),
                    },
                    {
                        value: "MSN03",
                        label: t("Filter Panel.msn.MSN03"),
                    },
                    {
                        value: "MSN04",
                        label: t("Filter Panel.msn.MSN04"),
                    },
                    {
                        value: "MSN05",
                        label: t("Filter Panel.msn.MSN05"),
                    },
                    {
                        value: "MSN06",
                        label: t("Filter Panel.msn.MSN06"),
                    },
                ],
                group: t("Filter Panel.Filters"),
            },
        ];
    };

    return { getAllFilterProperties };
};
