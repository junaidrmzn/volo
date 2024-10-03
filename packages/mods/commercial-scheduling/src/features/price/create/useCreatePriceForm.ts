import { useToast } from "@volocopter/design-library-react";
import { useMemo } from "react";
import { useAddPrice } from "@voloiq/commercial-scheduling-api/v1";
import { OnCreateHandler, createFormControl, number, object, select } from "@voloiq/form";
import { PriceTranslationFunction, usePriceTranslation } from "../translations/usePriceTranslation";

const priceSchemaFactory = (t: PriceTranslationFunction) => {
    return object({
        currency: select({
            placeholder: t("dropdown.placeholder"),
            options: [
                {
                    value: "EUR",
                    label: t("modal.add.EuroCurrency"),
                },
            ],
            errorMessage: t("dropdown.errorMessage"),
        }).label(t("modal.add.Currency")),
        price: number().required().label(t("modal.add.Standard Price")),
    });
};

export type PriceSchema = ReturnType<typeof priceSchemaFactory>;

export type UseCreatePriceFormOptions = {
    priceId: string;
    closeModal: () => void;
    refetchPrice: () => void;
};

export const useCreatePriceForm = (options: UseCreatePriceFormOptions) => {
    const { priceId, closeModal, refetchPrice } = options;
    const { t } = usePriceTranslation();
    const { sendRequest } = useAddPrice(priceId ?? "-1");
    const toast = useToast();

    const priceSchema = useMemo(() => priceSchemaFactory(t), [t]);

    const onCreate: OnCreateHandler<PriceSchema> = (data) => {
        sendRequest({
            data: {
                price: data.price,
                currency: data.currency?.value ?? "EUR",
            },
        })
            .then(() => {
                toast({
                    status: "success",
                    title: t("modal.add.successMessages.priceAdded title"),
                    description: t("modal.add.successMessages.priceAdded desc"),
                });
                refetchPrice();
                closeModal();
            })
            .catch(() => {
                toast({
                    status: "error",
                    title: t("modal.add.errorMessages.priceAdded title"),
                    description: t("modal.add.errorMessages.priceAdded desc"),
                });
            });
    };

    const FormControl = createFormControl<typeof priceSchema>();

    return { priceSchema, onCreate, FormControl };
};
