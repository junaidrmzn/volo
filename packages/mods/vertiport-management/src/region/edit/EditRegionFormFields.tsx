import { useForm } from "@voloiq/form";
import { adjustEndDateOnDateChange } from "@voloiq/utils";
import type { Region } from "@voloiq/vertiport-management-api/v1";
import { useVertiportTranslation } from "../../translations/useVertiportTranslation";
import { useRegionEditForm } from "./useRegionEditForm";

export type EditRegionFormFieldsProps = {
    region: Region;
};

type FromChangeType = {
    originalStartDate: Date | undefined;
    originalEndDate: Date | undefined;
    changeEvent: Date;
    updateLabel: string;
};

const EditRegionFormFields = (props: EditRegionFormFieldsProps) => {
    const { region } = props;
    const { regionInitialValues } = useRegionEditForm(region);
    const { FormControl } = useRegionEditForm(region);
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
            <FormControl fieldName="name" additionalInfo={t("region.additionalInfo.name")} />
            <FormControl
                fieldName="validFrom"
                additionalInfo={t("region.additionalInfo.validFrom")}
                onChange={(event) => {
                    if (event instanceof Date) {
                        fromChangeHandler({
                            originalStartDate: regionInitialValues.validFrom,
                            originalEndDate: regionInitialValues.validTo,
                            changeEvent: event,
                            updateLabel: "validTo",
                        });
                    }
                }}
            />
            <FormControl fieldName="validTo" additionalInfo={t("region.additionalInfo.validTo")} />
            <FormControl
                fieldName="publicFrom"
                additionalInfo={t("region.additionalInfo.publicFrom")}
                onChange={(event) => {
                    if (event instanceof Date) {
                        fromChangeHandler({
                            originalStartDate: regionInitialValues.publicFrom,
                            originalEndDate: regionInitialValues.publicTo,
                            changeEvent: event,
                            updateLabel: "publicTo",
                        });
                    }
                }}
            />
            <FormControl fieldName="publicTo" additionalInfo={t("region.additionalInfo.publicTo")} />
        </>
    );
};

export { EditRegionFormFields };
