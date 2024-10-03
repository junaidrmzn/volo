import type { Aircraft } from "@voloiq-typescript-api/fti-types";
import { useMemo } from "react";
import { attachment, multiselect, object } from "@voloiq/form";
import { useFtiImportTranslation } from "../translations/useFtiImportTranslation";

type UseImportFormSchemaProps = {
    aircraft: Aircraft[];
};

export const useImportFormSchema = (props: UseImportFormSchemaProps) => {
    const { aircraft } = props;
    const { t, i18n } = useFtiImportTranslation();
    const aircraftSchema = () =>
        multiselect({
            placeholder: t("form.select.placeholder"),
            options: aircraft.map((aircraft) => ({
                label: `${aircraft.productLine} - ${aircraft.aircraftType} - ${aircraft.msn}`,
                value: aircraft.id,
            })),
            errorMessage: t("form.select.requiredErrorMessage"),
        });

    return useMemo(
        () =>
            object({
                aircraft: aircraftSchema().required().label(t("form.aircraftLabel")),
                files: attachment({
                    accept: [".csv"],
                    rejectedFilesErrorMessage: t("form.fileInput.rejectedFilesErrorMessage", {
                        acceptedFiles: ".csv",
                    }),
                    deleteAriaLabel: t("form.fileInput.deleteFileAriaLabel"),
                    selectFilesLabel: t("form.fileInput.selectMultipleFilesLabel"),
                    dropFilesLabel: t("form.fileInput.dropMultipleFilesLabel"),
                    orLabel: t("form.fileInput.orLabel"),
                    allowMultiple: false,
                })
                    .min(1, t("form.fileInput.requiredErrorMessage"))
                    .required()
                    .label(t("form.attachmentLabel")),
            }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [aircraft, i18n.language]
    );
};
