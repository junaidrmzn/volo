import { Button, ButtonGroup, HStack } from "@volocopter/design-library-react";
import { CommercialSchedulingModal } from "@voloiq/commercial-scheduling-components";
import { FormProvider } from "@voloiq/form";
import { usePlanSummaryTranslation } from "../translations/usePlanSummaryTranslation";
import { EditPriceAndOfferFields } from "./EditPriceAndOfferFields";
import { UseEditPlanSummaryFormOptions, useEditPlanSummaryForm } from "./useEditPlanSummaryForm";

type EditPlanSummaryModalProps = {
    isOpen: boolean;
} & UseEditPlanSummaryFormOptions;

export const EditPlanSummaryModal = (props: EditPlanSummaryModalProps) => {
    const { isOpen, closeModal, planSummary, reload, overwrite } = props;
    const { planSummarySchema, onEdit, initialValues, FormControl } = useEditPlanSummaryForm({
        planSummary,
        closeModal,
        reload,
        overwrite,
    });
    const { t } = usePlanSummaryTranslation();

    return (
        <CommercialSchedulingModal
            size="xl"
            heading={overwrite ? t("modal.edit.heading overwrite") : t("modal.edit.heading")}
            subHeading={t("modal.edit.subheading")}
            isOpen={isOpen}
            onClose={closeModal}
        >
            <FormProvider formType="edit" schema={planSummarySchema} initialValues={initialValues} onEdit={onEdit}>
                <FormControl fieldName="flightNumber" isNotEditable />
                <EditPriceAndOfferFields {...props} />

                <FormControl showLabel={false} fieldName="offerCustomerApp" checkboxSize="sm" />

                <FormControl placeholder={t("modal.edit.commentPlaceholder")} fieldName="customComments" />
                <HStack alignSelf="flex-end">
                    <ButtonGroup isAttached>
                        <Button type="reset" onClick={closeModal}>
                            {t("generic.Cancel")}
                        </Button>
                        <Button variant="primary" type="submit">
                            {overwrite ? t("modal.edit.heading overwrite") : t("generic.Confirm")}
                        </Button>
                    </ButtonGroup>
                </HStack>
            </FormProvider>
        </CommercialSchedulingModal>
    );
};
