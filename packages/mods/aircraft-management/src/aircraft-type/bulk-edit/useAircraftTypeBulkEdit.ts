import { ProductLine } from "@voloiq-typescript-api/aircraft-management-types";
import { useMemo } from "react";
import { useGetQueryState } from "@voloiq/aircraft-management-api/helpers";
import { datetime, object, select } from "@voloiq/form";
import { ResourcesTranslationFunction, useResourcesTranslation } from "../../translations/useResourcesTranslation";

const aircraftTypeBulkEditSchemaFactory = (t: ResourcesTranslationFunction, productLines: ProductLine[] = []) => {
    return object({
        property: select({
            options: [
                { value: "validFrom", label: t("aircraft-type.model.validFrom") },
                { value: "validTo", label: t("aircraft-type.model.validTo") },
                { value: "productLine", label: t("aircraft-type.model.productLine") },
            ],
            placeholder: t("generic.dropdown placeholder"),
            errorMessage: t("generic.dropdown error"),
        }).label(t("aircraft-type.model.property")),
        validFrom: datetime().label(t("aircraft-type.model.changeTo")),
        validTo: datetime().label(t("aircraft-type.model.changeTo")),
        productLine: select({
            options: productLines.map((productLine) => ({
                value: productLine,
                label: productLine,
            })),
            placeholder: t("generic.dropdown placeholder"),
            errorMessage: t("generic.dropdown error"),
        }).label(t("aircraft-type.model.changeTo")),
    });
};

export const useAircraftTypeBulkEdit = () => {
    const { t } = useResourcesTranslation();
    const { data: productLines, isLoading: isLoadingProductLines } = useGetQueryState<ProductLine[]>(["product-lines"]);

    const aircraftTypeBulkEditSchema = useMemo(
        () => aircraftTypeBulkEditSchemaFactory(t, productLines),
        [t, productLines]
    );

    return {
        aircraftTypeBulkEditSchema,
        isLoadingProductLines,
    };
};
