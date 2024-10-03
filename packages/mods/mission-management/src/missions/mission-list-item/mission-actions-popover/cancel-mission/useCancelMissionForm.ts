import { SelectOption, createFormControl, object, select, textarea } from "@voloiq/form";
import { CancellationKey, useGetAllCancellationCodes } from "@voloiq/network-schedule-management-api/v1";
import { MissionTranslationFunction } from "../../../translations/useMissionTranslations";

export type CancellationCodeType = {
    cancellationCode: SelectOption<CancellationKey>;
    cancellationDescription?: string;
};

export const cancelMissionFormSchema = (
    cancellationCodes: SelectOption<CancellationKey>[],
    t: MissionTranslationFunction
) => {
    return object({
        cancellationCode: select({
            options: cancellationCodes,
            placeholder: t("dropdown placeholder"),
            errorMessage: t("dropdown error"),
        })
            .required()
            .label(t("Cancellation Code")),
        cancellationDescription: textarea().max(300, t("generic.maxLength error")).label(t("Reason")),
    });
};

type cancelMissionFormSchemaType = ReturnType<typeof cancelMissionFormSchema>;

export const FormControl = createFormControl<cancelMissionFormSchemaType>();

export const useCancelMissionForm = (t: MissionTranslationFunction) => {
    const { data: cancellationCodes } = useGetAllCancellationCodes();

    const cancellationCodeOptions = cancellationCodes.map((code) => ({
        label: code.description,
        value: code.key,
    }));

    const cancelMissionFormSchemaObject = cancelMissionFormSchema(cancellationCodeOptions, t);

    return {
        FormControl,
        cancelMissionFormSchemaObject,
    };
};
