import { useMemo } from "react";
import { Plan, useUpdatePlan } from "@voloiq/commercial-scheduling-api/v1";
import { OnEditHandler, createFormControl, datetime, number, object, string } from "@voloiq/form";
import { PlanTranslationFunction, usePlanTranslation } from "../translations/usePlanTranslation";

type UseEditPlanFormOptions = {
    plan: Plan;
    closeModal: () => void;
    reloadList: () => void;
};

const planSchemaFactory = (t: PlanTranslationFunction) =>
    object({
        planName: string().required().label(t("modal.Plan Name")),
        totalScheduleItems: number().label(t("edit.Numbers of missions in plan")),
        validFrom: datetime().label(t("edit.Start Date")),
        validTo: datetime().label(t("edit.End Date")),
    });

export type PlanSchema = ReturnType<typeof planSchemaFactory>;

export const useEditPlanForm = (options: UseEditPlanFormOptions) => {
    const { plan, closeModal, reloadList } = options;
    const { t } = usePlanTranslation();
    const { sendRequest } = useUpdatePlan(plan.id);

    const planSchema = useMemo(() => planSchemaFactory(t), [t]);

    const onEdit: OnEditHandler<PlanSchema> = (data) => {
        sendRequest({
            data: { planName: data.planName },
        }).then(() => {
            reloadList();
            closeModal();
        });
    };

    const FormControl = createFormControl<typeof planSchema>();

    return { planSchema, FormControl, onEdit };
};
