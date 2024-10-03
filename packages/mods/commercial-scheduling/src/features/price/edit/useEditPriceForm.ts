import { useToast } from "@volocopter/design-library-react";
import { useMemo } from "react";
import { Currency, Price, useEditPrice } from "@voloiq/commercial-scheduling-api/v1";
import { OnEditHandler, createFormControl, number, object, select } from "@voloiq/form";
import { PriceTranslationFunction, usePriceTranslation } from "../translations/usePriceTranslation";

const priceSchemaFactory = (t: PriceTranslationFunction) => {
    return object({
        currency: select<Currency>({
            placeholder: t("dropdown.placeholder"),
            options: [
                {
                    value: "EUR",
                    label: t("modal.edit.EuroCurrency"),
                },
            ],
            errorMessage: t("dropdown.errorMessage"),
        }).label(t("modal.edit.Currency")),
        price: number().required().label(t("modal.edit.Standard Price")),
    });
};

export type PriceSchema = ReturnType<typeof priceSchemaFactory>;

export type UseEditPriceFormOptions = {
    price: Price;
    closeModal: () => void;
    onEditSuccess: () => void;
};

export const useEditPriceForm = (props: UseEditPriceFormOptions) => {
    const { price, closeModal, onEditSuccess } = props;
    const priceItem = price.commercialPriceItems[0];
    const { t } = usePriceTranslation();
    const toast = useToast();
    const { sendRequest } = useEditPrice(priceItem.id);

    const priceSchema = useMemo(() => priceSchemaFactory(t), [t]);

    const onEdit: OnEditHandler<PriceSchema> = (data) => {
        sendRequest({
            data: {
                currency: data.currency?.value ?? "EUR",
                price: data.price,
            },
        })
            .then(() => {
                toast({
                    status: "success",
                    title: t("modal.edit.successMessages.priceEdited title"),
                    description: t("modal.edit.successMessages.priceEdited desc"),
                });
                closeModal();
                onEditSuccess();
            })
            .catch(() => {
                toast({
                    status: "error",
                    title: t("modal.edit.errorMessages.priceEdited title"),
                    description: t("modal.edit.errorMessages.priceEdited desc"),
                });
            });
    };

    const initialValues = {
        currency: {
            value: priceItem.currency,
        },
        price: priceItem.price,
    };

    const FormControl = createFormControl<typeof priceSchema>();

    return { priceSchema, onEdit, initialValues, FormControl };
};
