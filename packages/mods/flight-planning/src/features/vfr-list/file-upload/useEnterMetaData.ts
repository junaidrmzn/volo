import { format } from "date-fns";
import { useMemo } from "react";
import { createFormControl, datetime, object, select, string } from "@voloiq/form";
import { usePostCreateTile } from "../../../api-hooks/vfr-layers/postCreateTile";
import { useFlightPlanningTranslation } from "../../../translations";
import type { FormMetaData, VfrOption } from "../types";

type UseEnterMetaDataProps = { changeUploadTileId: (selectedUploadTileId: string) => void };

const formatDateTimeInputDate = (date: Date) => {
    const formattedDate = format(date, "yyyy-MM-dd HH:mm");
    return `${formattedDate} UTC`;
};

export const useEnterMetadataSchema = (props: UseEnterMetaDataProps) => {
    const { changeUploadTileId } = props;
    const { t } = useFlightPlanningTranslation();
    const { postCreateTile } = usePostCreateTile();

    const vfrTypeOptions: VfrOption[] = [
        { value: "Aerodrome(AIP VFR)", label: "Aerodrome(AIP VFR)" },
        { value: "Aerodrome(IFR)", label: "Aerodrome(IFR)" },
        { value: "IFR(enroute)", label: "IFR(enroute)" },
        { value: "IFR(Terminal)", label: "IFR(Terminal)" },
        { value: "VFR", label: "VFR" },
    ];

    const vfrRegionOptions: VfrOption[] = [
        { value: "France", label: "France" },
        { value: "Italy", label: "Italy" },
        { value: "Singapore", label: "Singapore" },
        { value: "Rest of Europe", label: "Rest of Europe" },
        { value: "Rest of Asia", label: "Rest of Asia" },
    ];

    const onSubmitActions = async (formData: FormMetaData) => {
        const { data } = await postCreateTile({
            vfr_type: formData.vfr_type.label!,
            region_id: formData.region_id.value!,
            file_name: `${formData.file_name}.mbtiles`,
            valid_to: formData.valid_to,
        });
        // Store generated tileId of response in state for fileupload
        if (data && data[0]) changeUploadTileId(data[0].id);
    };

    const enterMetadataSchema = useMemo(
        () =>
            object({
                vfr_type: select({
                    placeholder: t("vfrLayer.metadata.type"),
                    options: vfrTypeOptions,
                    errorMessage: t("common.requiredError"),
                })
                    .required(t("common.requiredError"))
                    .label(t("vfrLayer.metadata.type")),
                valid_to: datetime({
                    formatDate: formatDateTimeInputDate,
                    placeholder: t("vfrLayer.metadata.validTo"),
                })
                    .required("Required")
                    .label(t("vfrLayer.metadata.validTo")),
                file_name: string().required("Required").label("Name"),

                region_id: select({
                    placeholder: t("vfrLayer.metadata.region"),
                    options: vfrRegionOptions,
                    errorMessage: t("common.requiredError"),
                })
                    .required(t("common.requiredError"))
                    .label(t("vfrLayer.metadata.region")),
            }),
        [t]
    );

    const FormControl = createFormControl<typeof enterMetadataSchema>();
    return { FormControl, enterMetadataSchema, onSubmitActions };
};
