import { useToast } from "@volocopter/design-library-react";
import { useMemo, useState } from "react";
import { match } from "ts-pattern";
import {
    Currency,
    DiscountType,
    Region,
    useGetRegions,
    useUploadPromotion,
} from "@voloiq/commercial-scheduling-api/v1";
import { OnCreateHandler, createFormControl, datetime, number, object, select, string, textarea } from "@voloiq/form";
import { AxiosError } from "@voloiq/service";
import { DiscountTranslationFunction, useDiscountTranslation } from "../translations/useDiscountTranslation";

const discountSchemaFactory = (t: DiscountTranslationFunction, regions: Region[], discountType: DiscountType) => {
    let currency = select<Currency>({
        placeholder: t("modal.create.currency.placeholder"),
        options: [
            {
                value: "EUR",
                label: t("modal.create.currency.options.euro"),
            },
        ],
        errorMessage: t("modal.create.currency.errorMessage"),
    }).label(t("modal.create.currency.label"));
    if (discountType === "AMOUNT") {
        currency = currency.required();
    }

    return object({
        name: string().required().label(t("modal.create.promotionName")),
        validFrom: datetime().required().label(t("modal.create.validFrom")),
        validTo: datetime()
            .when("validFrom", (validFrom, yup) => yup.min(validFrom, t("modal.create.validTo.errorMessage")))
            .required()
            .label(t("modal.create.validTo.label")),
        codes: textarea().required().label(t("modal.create.discountCodeList")),
        region: select({
            placeholder: t("modal.create.region.placeholder"),
            options: regions.map((region) => ({ value: region.id, label: region.name })),
            errorMessage: t("modal.create.region.errorMessage"),
        })
            .required()
            .label(t("modal.create.region.label")),
        currency,
        value: number().required().label(t("modal.create.value")),
    });
};

export type DiscountSchema = ReturnType<typeof discountSchemaFactory>;

export type UseCreateDiscountFormOptions = {
    reloadList: () => void;
    closeModal: () => void;
};

export const useCreateDiscountForm = (options: UseCreateDiscountFormOptions) => {
    const { reloadList, closeModal } = options;

    const [discountType, setDiscountType] = useState<DiscountType>("AMOUNT");
    const [errorMessage, setErrorMessage] = useState<string>("");

    const { sendRequest } = useUploadPromotion();
    const { data: regions } = useGetRegions({ manual: false });
    const { t } = useDiscountTranslation();
    const toast = useToast();

    const discountSchema = useMemo(
        () => discountSchemaFactory(t, regions ?? [], discountType),
        [t, regions, discountType]
    );

    const FormControl = createFormControl<typeof discountSchema>();

    const onDiscountTypeChange = (value: DiscountType) => {
        setDiscountType(value);
    };

    const onCreate: OnCreateHandler<DiscountSchema> = (data) => {
        const title = t("modal.create.toast.title");
        setErrorMessage("");
        sendRequest({
            data: {
                name: data.name,
                validFrom: data.validFrom.toISOString(),
                validTo: data.validTo.toISOString(),
                codes: data.codes,
                regionId: data.region.value,
                regionName: data.region.label ?? "",
                discountType,
                value: data.value,
                type: "DISCOUNT",
                ...(discountType === "AMOUNT" ? { currency: data.currency?.value } : null),
            },
        })
            .then(() => {
                toast({
                    status: "success",
                    title,
                    description: t("modal.create.toast.success.description"),
                });
                reloadList();
                closeModal();
            })
            .catch((error: AxiosError) => {
                if (error.response) {
                    const { message } = error.response.data.error;
                    const description = match(true)
                        .with(message.includes("#DUPLICATE"), () => t("modal.create.toast.error.duplicate"))
                        .with(message.includes("#UNIQUE_NAME"), () => t("modal.create.toast.error.unique"))
                        .with(message.includes("#INVALID"), () => t("modal.create.toast.error.invalid"))
                        .otherwise(() => t("modal.create.toast.error.unknown"));
                    setErrorMessage(description);
                }
            });
    };

    return { discountSchema, FormControl, onCreate, discountType, onDiscountTypeChange, errorMessage };
};
