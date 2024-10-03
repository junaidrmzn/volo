import { Button, ButtonGroup, HStack } from "@volocopter/design-library-react";
import { Plan } from "@voloiq/commercial-scheduling-api/v1";
import { FormProvider } from "@voloiq/form";
import { usePlanTranslation } from "../translations/usePlanTranslation";
import { useEditPlanForm } from "./useEditPlanForm";

type EditPlanProps = {
    plan: Plan;
    closeModal: () => void;
    reloadList: () => void;
};

export const EditPlanForm = (props: EditPlanProps) => {
    const { plan, closeModal, reloadList } = props;
    const { planName, commercialSchedule } = plan;
    const { validFrom, validTo, totalScheduleItems } = commercialSchedule ?? {};
    const initalValues = { planName, validFrom: new Date(validFrom), validTo: new Date(validTo), totalScheduleItems };
    const { t } = usePlanTranslation();
    const { planSchema, FormControl, onEdit } = useEditPlanForm({ plan, closeModal, reloadList });

    return (
        <FormProvider formType="edit" schema={planSchema} initialValues={initalValues} onEdit={onEdit}>
            <FormControl fieldName="planName" />
            <FormControl fieldName="totalScheduleItems" isNotEditable />
            <HStack>
                <FormControl fieldName="validFrom" isNotEditable />
                <FormControl fieldName="validTo" isNotEditable />
            </HStack>
            <HStack alignSelf="flex-end">
                <ButtonGroup isAttached>
                    <Button type="reset" onClick={closeModal}>
                        {t("generic.cancel")}
                    </Button>
                    <Button variant="primary" type="submit">
                        {t("generic.edit")}
                    </Button>
                </ButtonGroup>
            </HStack>
        </FormProvider>
    );
};
