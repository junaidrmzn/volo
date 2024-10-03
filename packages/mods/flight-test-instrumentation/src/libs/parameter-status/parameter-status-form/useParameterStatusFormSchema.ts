import { ParameterStatusEnum } from "@voloiq-typescript-api/fti-types";
import { datetime, object, select } from "@voloiq/form";
import { useParameterStatusTranslation } from "../translations/useParameterStatusTranslation";

const useOptions = (initialStatus?: ParameterStatusEnum) => {
    const { t } = useParameterStatusTranslation();
    return [
        {
            label: t("status.REQUESTED"),
            value: ParameterStatusEnum.REQUESTED,
            isDisabled: initialStatus && initialStatus !== ParameterStatusEnum.REQUESTED,
        } as const,
        {
            label: t("status.DRAFT"),
            value: ParameterStatusEnum.DRAFT,
            isDisabled:
                initialStatus && ![ParameterStatusEnum.DRAFT, ParameterStatusEnum.REQUESTED].includes(initialStatus),
        } as const,
        {
            label: t("status.RELEASED"),
            value: ParameterStatusEnum.RELEASED,
            isDisabled:
                initialStatus && [ParameterStatusEnum.REQUESTED, ParameterStatusEnum.CANCELLED].includes(initialStatus),
        } as const,
        {
            label: t("status.CANCELLED"),
            value: ParameterStatusEnum.CANCELLED,
            isDisabled:
                initialStatus && [ParameterStatusEnum.FROZEN, ParameterStatusEnum.RELEASED].includes(initialStatus),
        } as const,
        {
            label: t("status.FROZEN"),
            value: ParameterStatusEnum.FROZEN,
            isDisabled:
                initialStatus && [ParameterStatusEnum.REQUESTED, ParameterStatusEnum.CANCELLED].includes(initialStatus),
        } as const,
    ];
};

export const useReadableOptions = () => {
    return useOptions();
};
export const useEditableOptions = (initialStatus: ParameterStatusEnum) => {
    return useOptions(initialStatus);
};

export const useParameterStatusFormSchema = (initialStatus: ParameterStatusEnum) => {
    const { t } = useParameterStatusTranslation();
    const selectOptions = useEditableOptions(initialStatus);
    return object({
        status: select({
            options: selectOptions,
            placeholder: t("parameterStatusForm.selectPlaceholder"),
            errorMessage: t("parameterStatusForm.selectError"),
        })
            .required()
            .label(t("parameterStatusForm.selectLabel")),
        validFrom: datetime().required().label(t("parameterStatusForm.datePickerLabel")),
    });
};
