import { useForm } from "@voloiq/form";
import { adjustEndDateOnDateChange } from "@voloiq/utils";
import type { Vertiport } from "@voloiq/vertiport-management-api/v1";
import { useVertiportTranslation } from "../../../../translations/useVertiportTranslation";
import { usePadForm } from "./usePadForm";

export type EditPadFormFieldsProps = {
    vertiport: Vertiport;
    validFrom: Date | undefined;
    validTo: Date | undefined;
};

type FromChangeType = {
    originalStartDate: Date | undefined;
    originalEndDate: Date | undefined;
    changeEvent: Date;
    updateLabel: string;
};

const PadFormFields = (props: EditPadFormFieldsProps) => {
    const { vertiport, validFrom, validTo } = props;
    const { FormControl } = usePadForm({ vertiport });
    const { t } = useVertiportTranslation();

    const { setValue } = useForm();

    const fromChangeHandler = (props: FromChangeType) => {
        const { originalStartDate, originalEndDate, changeEvent, updateLabel } = props;
        if (originalStartDate && originalEndDate) {
            const returned = adjustEndDateOnDateChange({
                originalStartDate,
                originalEndDate,
                adjustedStartDate: changeEvent,
            });
            if (returned) {
                setValue(updateLabel, returned);
            }
        }
    };

    return (
        <>
            <FormControl fieldName="padKey" additionalInfo={t("fatoStand.additionalInfo.key")} />
            <FormControl fieldName="externalId" additionalInfo={t("fatoStand.additionalInfo.externalId")} />
            <FormControl fieldName="services" additionalInfo={t("fatoStand.additionalInfo.services")} />
            <FormControl fieldName="coordinates" additionalInfo={t("fatoStand.additionalInfo.coordinates")} />
            <FormControl fieldName="height" additionalInfo={t("fatoStand.additionalInfo.height")} />
            <FormControl
                fieldName="validFrom"
                additionalInfo={t("fatoStand.additionalInfo.validFrom")}
                onChange={(event) => {
                    if (event instanceof Date) {
                        fromChangeHandler({
                            originalStartDate: validFrom,
                            originalEndDate: validTo,
                            changeEvent: event,
                            updateLabel: "validTo",
                        });
                    }
                }}
            />
            <FormControl fieldName="validTo" additionalInfo={t("fatoStand.additionalInfo.validTo")} />
        </>
    );
};

export { PadFormFields };
