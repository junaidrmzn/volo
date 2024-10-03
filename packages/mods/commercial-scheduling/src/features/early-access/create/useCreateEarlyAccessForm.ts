import { useToast } from "@volocopter/design-library-react";
import { useMemo, useState } from "react";
import { match } from "ts-pattern";
import { OfferRunwayUnit, Region, useGetRegions, useUploadPromotion } from "@voloiq/commercial-scheduling-api/v1";
import { OnEditHandler, createFormControl, datetime, number, object, select, string, textarea } from "@voloiq/form";
import { AxiosError } from "@voloiq/service";
import { EarlyAccessTranslationFunction, useEarlyAccessTranslation } from "../translations/useEarlyAccessTranslation";

const earlyAccessSchemaFactory = (regions: Region[], t: EarlyAccessTranslationFunction) => {
    return object({
        name: string().required().label(t("modal.create.promotionName")),
        validFrom: datetime().required().label(t("modal.create.validFrom")),
        validTo: datetime()
            .when("validFrom", (validFrom, yup) => yup.min(validFrom, t("modal.create.validTo.errorMessage")))
            .required()
            .label(t("modal.create.validTo.label")),
        codes: textarea().required().label(t("modal.create.accessCodeList")),
        region: select({
            placeholder: t("modal.create.region.label"),
            options: regions.map((region) => ({ value: region.id, label: region.name })),
            errorMessage: t("modal.create.region.errorMessage"),
        })
            .required()
            .label(t("modal.create.region.label")),
        value: number().required().label(t("modal.create.value")),
        offerRunwayUnit: select<OfferRunwayUnit>({
            placeholder: t("modal.create.offerRunwayUnit.placeholder"),
            options: [
                { value: "HOURS", label: t("modal.create.offerRunwayUnit.options.units.HOURS") },
                { value: "DAYS", label: t("modal.create.offerRunwayUnit.options.units.DAYS") },
                { value: "WEEKS", label: t("modal.create.offerRunwayUnit.options.units.WEEKS") },
                { value: "MONTHS", label: t("modal.create.offerRunwayUnit.options.units.MONTHS") },
            ],
            errorMessage: t("modal.create.offerRunwayUnit.errorMessage"),
        })
            .required()
            .label(t("modal.create.offerRunwayUnit.label")),
    });
};

export type EarlyAccessSchema = ReturnType<typeof earlyAccessSchemaFactory>;

export type UseCreateEarlyAccessFormProps = {
    closeModal: () => void;
    reloadList: () => void;
};

export const useCreateEarlyAccessForm = (props: UseCreateEarlyAccessFormProps) => {
    const { reloadList, closeModal } = props;
    const [errorMessage, setErrorMessage] = useState<string>("");

    const { sendRequest } = useUploadPromotion();
    const { data: regions } = useGetRegions({ manual: false });
    const { t } = useEarlyAccessTranslation();
    const toast = useToast();

    const earlyAccessSchema = useMemo(() => earlyAccessSchemaFactory(regions ?? [], t), [regions, t]);

    const onCreate: OnEditHandler<EarlyAccessSchema> = (data) => {
        const title = t("modal.create.toast.title");
        setErrorMessage("");
        sendRequest({
            data: {
                name: data.name,
                validFrom: data.validFrom.toISOString(),
                validTo: data.validTo.toISOString(),
                regionId: data.region.value,
                regionName: data.region.label ?? "",
                codes: data.codes,
                value: data.value,
                accessType: data.offerRunwayUnit?.value,
                type: "EARLY_ACCESS",
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

    const FormControl = createFormControl<typeof earlyAccessSchema>();

    return { earlyAccessSchema, FormControl, onCreate, errorMessage };
};
