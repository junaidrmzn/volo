import { attachment, object, select, string } from "@voloiq/form";
import { SoftwareConfigTypeEnum } from "@voloiq/logbook-api/v6";
import { useSoftwareConfigTranslations } from "../translations/useSoftwareConfigTranslations";

export const useAddSoftwareConfigurationSchema = () => {
    const { t } = useSoftwareConfigTranslations();

    return object({
        configurationType: select({
            placeholder: t("form.select.placeholder"),
            options: [{ value: SoftwareConfigTypeEnum.FC, label: SoftwareConfigTypeEnum.FC }],
            errorMessage: t("form.select.requiredErrorMessage"),
        })
            .required()
            .label(t("addSoftwareConfiguration.configurationTypeLabel")),
        gitHash: string().required().label(t("addSoftwareConfiguration.gitHashLabel")),
        softwareConfigurationFile: attachment({
            accept: [".h"],
            deleteAriaLabel: t("form.fileInput.deleteFileAriaLabel"),
            rejectedFilesErrorMessage: t("form.fileInput.rejectedFilesErrorMessage", {
                acceptedFiles: ".h",
            }),
            selectFilesLabel: t("form.fileInput.selectFilesLabel"),
            dropFilesLabel: t("form.fileInput.dropFileLabel"),
            orLabel: t("form.fileInput.orLabel"),
        })
            .min(1, t("form.fileInput.requiredErrorMessage"))
            .required()
            .label(t("addSoftwareConfiguration.softwareConfigurationFileLabel")),
    });
};
