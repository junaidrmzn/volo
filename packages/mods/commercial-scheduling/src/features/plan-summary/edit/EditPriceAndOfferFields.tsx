import { Button, HStack } from "@volocopter/design-library-react";
import { useForm } from "@voloiq/form";
import { usePlanSummaryTranslation } from "../translations/usePlanSummaryTranslation";
import { UseEditPlanSummaryFormOptions, useEditPlanSummaryForm } from "./useEditPlanSummaryForm";

export const EditPriceAndOfferFields = (props: UseEditPlanSummaryFormOptions) => {
    const { t } = usePlanSummaryTranslation();
    const { planSummary, closeModal, reload } = props;
    const { setValue } = useForm();
    const { FormControl } = useEditPlanSummaryForm({
        planSummary,
        closeModal,
        reload,
        overwrite: false,
    });

    const handlePriceReset = () => {
        setValue("customPrice", planSummary.prices[0]?.price);
    };
    const handleOfferReset = () => {
        setValue("customOfferRunwayValue", planSummary.offers[0]?.offerRunwayValue);
        setValue("customOfferRunwayUnit", { value: planSummary.offers[0]?.offerRunwayUnit });
    };
    return (
        <>
            <FormControl fieldName="customPrice" />
            <HStack justifyContent="end" alignItems="start">
                <Button size="sm" variant="ghost" onClick={handlePriceReset}>
                    {t("modal.edit.resetToDefault")}
                </Button>
            </HStack>

            <HStack>
                <FormControl fieldName="customOfferRunwayValue" />
                <FormControl fieldName="customOfferRunwayUnit" />
            </HStack>
            <HStack justifyContent="end" alignItems="start">
                <Button size="sm" variant="ghost" onClick={handleOfferReset}>
                    {t("modal.edit.resetToDefault")}
                </Button>
            </HStack>
        </>
    );
};
