import { useToast } from "@volocopter/design-library-react";
import { useMemo } from "react";
import { OfferItem, OfferRunwayUnit, useEditOfferItem } from "@voloiq/commercial-scheduling-api/v1";
import { OnEditHandler, createFormControl, number, object, select } from "@voloiq/form";
import { OfferTranslationFunction, useOfferTranslation } from "../translations/useOfferTranslation";

export type UseEditOfferFormOptions = {
    offerItem: OfferItem;
    closeModal: () => void;
    reloadList: () => void;
};

const offerItemSchemaFactory = (t: OfferTranslationFunction) =>
    object({
        offerRunwayValue: number().min(0).required().label(t("modal.edit.fields.enterNumber")),
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

export const useEditOfferForm = (options: UseEditOfferFormOptions) => {
    const {
        offerItem: { id },
        closeModal,
        reloadList,
    } = options;
    const { t } = useOfferTranslation();
    const { sendRequest } = useEditOfferItem(id);
    const toast = useToast();

    const offerItemSchema = useMemo(() => offerItemSchemaFactory(t), [t]);

    const onEdit: OnEditHandler<OfferItemSchema> = (params) => {
        const {
            offerRunwayUnit: { value: offerRunwayUnit }, // Select field
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
                    title: t("modal.edit.successMessages.offerEdited title"),
                    description: t("modal.edit.successMessages.offerEdited desc"),
                });
                reloadList();
                closeModal();
            })
            .catch(() => {
                toast({
                    status: "error",
                    title: t("modal.edit.errorMessages.offerEdited title"),
                    description: t("modal.edit.errorMessages.offerEdited desc"),
                });
            });
    };

    const FormControl = createFormControl<typeof offerItemSchema>();

    return { offerItemSchema, FormControl, onEdit };
};
