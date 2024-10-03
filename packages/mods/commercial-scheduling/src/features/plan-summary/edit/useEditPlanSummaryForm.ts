import { useMemo } from "react";
import {
    OfferRunwayUnit,
    PlanSummary,
    useAddPlanSummary,
    useEditPlanSummary,
    useOverwritePlanSummary,
} from "@voloiq/commercial-scheduling-api/v1";
import { OnEditHandler, boolean, createFormControl, number, object, select, string, textarea } from "@voloiq/form";
import { PlanSummaryTranslationFunction, usePlanSummaryTranslation } from "../translations/usePlanSummaryTranslation";

const planSummarySchemaFactory = (t: PlanSummaryTranslationFunction) => {
    return object({
        flightNumber: string().label(t("modal.edit.flightNumber")),
        customOfferRunwayValue: number().min(0).label(t("modal.edit.customOfferRunway")),
        customOfferRunwayUnit: select<OfferRunwayUnit>({
            placeholder: t("generic.dropdown.placeholder"),
            options: [
                { value: "HOURS", label: t("units.HOURS") },
                { value: "DAYS", label: t("units.DAYS") },
                { value: "WEEKS", label: t("units.WEEKS") },
                { value: "MONTHS", label: t("units.MONTHS") },
            ],
            errorMessage: t("generic.dropdown.errorMessage"),
        }).label(t("modal.edit.days")),
        customPrice: number().label(t("modal.edit.customPrice")),
        customComments: textarea().required().label(t("modal.edit.editComment")),
        offerCustomerApp: boolean().label(t("modal.edit.isNoCustomOffer")),
    });
};

export type PlanSummarySchema = ReturnType<typeof planSummarySchemaFactory>;

export type UseEditPlanSummaryFormOptions = {
    planSummary: PlanSummary;
    closeModal: () => void;
    reload: () => void;
    overwrite: boolean;
};

export const useEditPlanSummaryForm = (props: UseEditPlanSummaryFormOptions) => {
    const { planSummary, closeModal, reload, overwrite } = props;
    const { sendRequest: sendAddRequest } = useAddPlanSummary();
    const { sendRequest: sendEditRequest } = useEditPlanSummary(planSummary.customCommercialScheduleItemId ?? "-1");
    const { sendRequest: sendOverwriteRequest } = useOverwritePlanSummary(
        planSummary.customCommercialScheduleItemId ?? "-1"
    );

    const { t } = usePlanSummaryTranslation();

    const initialValues = {
        flightNumber: planSummary.flightNumber,
        customOfferRunwayValue: planSummary.isCustomized
            ? planSummary.customOfferRunwayValue ?? 0
            : planSummary.offers && planSummary.offers.length > 0
            ? planSummary.offers[0]?.offerRunwayValue
            : undefined,

        customOfferRunwayUnit: {
            value: planSummary.isCustomized
                ? planSummary.customOfferRunwayUnit ?? undefined
                : planSummary.offers && planSummary.offers.length > 0
                ? planSummary.offers[0]?.offerRunwayUnit
                : undefined,
        },
        customPrice: planSummary.isCustomized
            ? planSummary.customPrice ?? 0
            : planSummary.prices && planSummary.prices.length > 0
            ? planSummary.prices[0]?.price
            : undefined,
        customComments: planSummary.customComments,
        offerCustomerApp: !!planSummary.isNoCustomOffer,
    };

    const planSummarySchema = useMemo(() => planSummarySchemaFactory(t), [t]);

    const onEdit: OnEditHandler<PlanSummarySchema> = (data) => {
        if (overwrite) {
            sendOverwriteRequest({
                data: {
                    customPrice: data.customPrice,
                    customOfferRunwayValue: data.customOfferRunwayValue,
                    customOfferRunwayUnit: data.customOfferRunwayUnit?.value,
                    isNoCustomOffer: data.offerCustomerApp,
                    customComments: data.customComments,
                },
            }).then(() => {
                reload();
                closeModal();
            });
        } else if (!planSummary.isCustomized) {
            sendAddRequest({
                data: {
                    ...data,
                    customOfferRunwayUnit: data.customOfferRunwayUnit?.value,
                    commercialScheduleItemId: planSummary.id,
                    isNoCustomOffer: data.offerCustomerApp,
                },
            }).then(() => {
                reload();
                closeModal();
            });
        } else {
            sendEditRequest({
                data: {
                    ...data,
                    customOfferRunwayUnit: data.customOfferRunwayUnit?.value,
                    isNoCustomOffer: data.offerCustomerApp,
                },
            }).then(() => {
                reload();
                closeModal();
            });
        }
    };

    const FormControl = createFormControl<typeof planSummarySchema>();

    return { planSummarySchema, onEdit, initialValues, FormControl };
};
