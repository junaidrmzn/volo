import { datetime, object, select } from "@voloiq/form";
import { useVertiportTranslation } from "../../translations/useVertiportTranslation";

export const useRegionBulkEdit = () => {
    const { t } = useVertiportTranslation();

    const regionBulkEditSchema = object({
        property: select({
            options: [
                { value: "validFrom", label: t("region.model.validFrom") },
                { value: "validTo", label: t("region.model.validTo") },
                { value: "publicFrom", label: t("region.model.publicFrom") },
                { value: "publicTo", label: t("region.model.publicTo") },
            ],
            placeholder: t("generic.dropdown placeholder"),
            errorMessage: t("generic.dropdown error"),
        }).label(t("region.model.property")),

        validFrom: datetime().label(t("region.model.changeTo")),
        validTo: datetime().label(t("region.model.changeTo")),
        publicFrom: datetime().label(t("region.model.changeTo")),
        publicTo: datetime().label(t("region.model.changeTo")),
    });

    return { regionBulkEditSchema };
};
