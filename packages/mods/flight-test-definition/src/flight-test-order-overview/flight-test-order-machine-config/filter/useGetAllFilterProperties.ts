import { FilterProperty } from "@voloiq/resource-overview";
import { useFtoFilterTranslation } from "./translation/useFtoFilterTranslation";

export const useGetAllFilterProperties = () => {
    const { t } = useFtoFilterTranslation();

    const getAllFilterProperties = (): FilterProperty[] => {
        return [
            {
                type: "select",
                propertyName: "msn",
                label: "MSN",
                options: [
                    { value: "01", label: t("msn.01") },
                    { value: "02", label: t("msn.02") },
                    { value: "03", label: t("msn.03") },
                    { value: "04", label: t("msn.04") },
                    { value: "05", label: t("msn.05") },
                    { value: "B0-01", label: t("msn.B0-01") },
                    { value: "B0-02", label: t("msn.B0-02") },
                    {
                        value: "MSN01",
                        label: t("msn.MSN01"),
                    },
                    {
                        value: "MSN03",
                        label: t("msn.MSN03"),
                    },
                    {
                        value: "MSN04",
                        label: t("msn.MSN04"),
                    },
                    {
                        value: "MSN05",
                        label: t("msn.MSN05"),
                    },
                    {
                        value: "MSN06",
                        label: t("msn.MSN06"),
                    },
                ],
                group: t("Filter Panel"),
            },
        ];
    };
    return { getAllFilterProperties };
};
