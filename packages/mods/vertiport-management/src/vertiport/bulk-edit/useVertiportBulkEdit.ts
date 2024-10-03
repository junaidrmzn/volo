import { datetime, multiselect, number, object, select, string } from "@voloiq/form";
import { useGetRegions } from "../../api-hooks/useRegionService";
import { useGetVertiportServices } from "../../api-hooks/useVertiportServicesService";
import { useVertiportTranslation } from "../../translations/useVertiportTranslation";

export const useVertiportBulkEdit = () => {
    const { t } = useVertiportTranslation();
    const { data: regions } = useGetRegions(1);
    const { data: vertiportServices } = useGetVertiportServices(1);

    const vertiportBulkEditSchema = object({
        property: select({
            options: [
                { value: "validFrom", label: t("vertiport.model.validFrom") },
                { value: "validTo", label: t("vertiport.model.validTo") },
                { value: "publicFrom", label: t("vertiport.model.publicFrom") },
                { value: "publicTo", label: t("vertiport.model.publicTo") },
                { value: "region", label: t("vertiport.model.regionId") },
                { value: "timeZone", label: t("vertiport.model.timeZone") },
                { value: "services", label: t("vertiport.model.services") },
                { value: "country", label: t("vertiport.model.country") },
                { value: "countryCode", label: t("vertiport.model.countryCode") },
                { value: "popularity", label: t("vertiport.model.popularity") },
            ],
            placeholder: t("generic.dropdown placeholder"),
            errorMessage: t("generic.dropdown error"),
        }).label(t("vertiport.model.property")),

        validFrom: datetime().label(t("vertiport.model.changeTo")),
        validTo: datetime().label(t("vertiport.model.changeTo")),
        publicFrom: datetime().label(t("vertiport.model.changeTo")),
        publicTo: datetime().label(t("vertiport.model.changeTo")),
        region: select({
            placeholder: t("generic.dropdown placeholder"),
            options: regions.map((region) => ({
                label: region.name,
                value: region.id,
            })),
            errorMessage: t("generic.dropdown error"),
        }).label(t("vertiport.model.changeTo")),
        timeZone: string().label(t("vertiport.model.changeTo")),
        services: multiselect({
            placeholder: t("generic.dropdown placeholder"),
            options: vertiportServices.map((vertservice) => ({
                label: vertservice.key,
                value: vertservice.key,
            })),
            errorMessage: t("generic.dropdown error"),
        }).label(t("vertiport.model.changeTo")),
        country: string().label(t("vertiport.model.changeTo")),
        countryCode: string()
            .nullable()
            .matches(/^[A-Z]{2}$/, t("generic.countryCode error"))
            .label(t("vertiport.model.changeTo")),
        popularity: number().label(t("vertiport.model.changeTo")),
    });

    return { vertiportBulkEditSchema };
};
