import { useToast } from "@volocopter/design-library-react";
import { useMemo } from "react";
import { OfferRunwayUnit, useCreateOfferItem } from "@voloiq/commercial-scheduling-api/v1";
import { OnEditHandler, createFormControl, number, object, select } from "@voloiq/form";
import { OfferTranslationFunction, useOfferTranslation } from "../translations/useOfferTranslation";

export type UseCreateOfferFormOptions = {
    offerId: string;
    closeModal: () => void;
    reloadList: () => void;
};

const offerItemSchemaFactory = (t: OfferTranslationFunction) =>
    object({
        offerRunwayValue: number().min(1).required().label(t("modal.edit.fields.enterNumber")),
        offerRunwayUnit: select<OfferRunwayUnit>({
            placeholder: t("dropdown.placeholder"),
            options: [
                { value: "HOURS", label: t("units.HOURS") },
                { value: "DAYS", label: t("units.DAYS") },
                { value: "WEEKS", label: t("units.WEEKS") },
                { value: "MONTHS", label: t("units.MONTHS") },
            ],
            errorMessage: t("dropdown.errorMessage"),
        })
            .required()
            .label(t("modal.edit.fields.days")),
    });

export type OfferItemSchema = ReturnType<typeof offerItemSchemaFactory>;

export const useCreateOfferForm = (options: UseCreateOfferFormOptions) => {
    const { offerId, closeModal, reloadList } = options;
    const { t } = useOfferTranslation();
    const { sendRequest } = useCreateOfferItem(offerId ?? "-1");
    const toast = useToast();

    const offerItemSchema = useMemo(() => offerItemSchemaFactory(t), [t]);

    const onCreate: OnEditHandler<OfferItemSchema> = (params) => {
        const {
            offerRunwayUnit: { value: offerRunwayUnit },
            offerRunwayValue,
        } = params;
        sendRequest({
            data: {
                offerRunwayUnit,
                offerRunwayValue,
            },
        })
            .then(() => {
                toast({
                    status: "success",
                    title: t("modal.add.toast.success.title"),
                    description: t("modal.add.toast.success.description"),
                });
                reloadList();
                closeModal();
            })
            .catch(() => {
                toast({
                    status: "error",
                    title: t("modal.add.toast.error.title"),
                    description: t("modal.add.toast.error.description"),
                });
            });
    };

    const FormControl = createFormControl<typeof offerItemSchema>();

    return { offerItemSchema, FormControl, onCreate };
};
