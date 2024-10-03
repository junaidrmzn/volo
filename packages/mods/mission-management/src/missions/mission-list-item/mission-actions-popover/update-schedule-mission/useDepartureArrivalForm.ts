import type { FieldName, SelectOption } from "@voloiq/form";
import { createFormControl, datetime, multiselect, object } from "@voloiq/form";
import {
    DelayCode,
    Mission,
    MissionEstimatedDateTimes,
    useGetAllDelayCodesQuery,
    useUpdateMission,
} from "@voloiq/network-schedule-management-api/v1";
import { useRequestWithErrorHandling } from "../../../errors/useRequestWithErrorHandling";
import type { MissionTranslationFunction } from "../../../translations/useMissionTranslations";
import { useMissionTranslations } from "../../../translations/useMissionTranslations";

type UseDepartureArrivalFormOptions = {
    delayCodes: DelayCode[];
    t: MissionTranslationFunction;
};

const createDepartureArrivalFormSchema = (options: UseDepartureArrivalFormOptions) => {
    const { delayCodes, t } = options;

    return object({
        estimatedDepartureDateTime: datetime().required(t("required error")).label(t("Departure estimated")),
        estimatedArrivalDateTime: datetime()
            .when("estimatedDepartureDateTime", (estimatedDepartureDateTime, yup) =>
                yup.min(estimatedDepartureDateTime, t("EstimatedArrival error"))
            )
            .required(t("required error"))
            .label(t("Arrival estimated")),
        delayReason: multiselect({
            options: delayCodes.map((delayCode) => ({
                label: `${delayCode.code} - ${delayCode.description} (${delayCode.delayCategory.replace(/_/g, " ")})`,
                value: delayCode.code,
            })),
            placeholder: t("dropdown placeholder"),
            errorMessage: t("dropdown error"),
        })
            .required(t("required error"))
            .label(t("Delay Reason")),
    });
};

type DepartureArrivalFormSchema = ReturnType<typeof createDepartureArrivalFormSchema>;

type UseDepartureArrivalFormProps = {
    mission: Mission;
    onReloadList: () => void;
    onClose: () => void;
    initialValues?: {
        estimatedDepartureDateTime?: Date;
        estimatedArrivalDateTime?: Date;
    };
};

export const useDepartureArrivalForm = (props: UseDepartureArrivalFormProps) => {
    const { mission, onReloadList, onClose, initialValues } = props;
    const { t } = useMissionTranslations();
    const delayCodesQuery = useGetAllDelayCodesQuery({ isEnabled: true });
    const delayCodes = delayCodesQuery.data || [];

    const departureArrivalFormSchema = createDepartureArrivalFormSchema({ delayCodes, t });

    const isDepartureArrivalFieldName = (attribute: unknown): attribute is FieldName<DepartureArrivalFormSchema> =>
        Object.keys(departureArrivalFormSchema.describe().fields).includes(
            attribute as FieldName<DepartureArrivalFormSchema>
        );

    const { sendRequest: updateMission } = useUpdateMission({ missionId: mission.id });

    const { makeRequestWithErrorHandling } = useRequestWithErrorHandling({
        isFieldName: isDepartureArrivalFieldName,
        makeRequest: (requestConfig: { data: MissionEstimatedDateTimes }) => updateMission(requestConfig),
        schema: departureArrivalFormSchema,
    });

    const FormControl = createFormControl<DepartureArrivalFormSchema>();

    const onFormSubmit = async (
        formData: {
            estimatedDepartureDateTime: Date;
            estimatedArrivalDateTime: Date;
            delayReason: SelectOption[];
        },
        version: number
    ) => {
        const data = {
            estimatedDepartureDateTime: formData.estimatedDepartureDateTime.toISOString(),
            estimatedArrivalDateTime: formData.estimatedArrivalDateTime.toISOString(),
            delayCodes: formData.delayReason.map((delayReason) => delayReason.value),
            version,
        };

        return makeRequestWithErrorHandling({ data }).then((response) => {
            if (Object.keys(response).length === 0) {
                onClose();
                onReloadList();
            }
            return response;
        });
    };

    const estimatedDepartureArrivalInitialValues = {
        estimatedDepartureDateTime: mission.estimatedDepartureDateTime
            ? new Date(mission.estimatedDepartureDateTime)
            : undefined,
        estimatedArrivalDateTime: mission.estimatedArrivalDateTime
            ? new Date(mission.estimatedArrivalDateTime)
            : undefined,
        delayReason: mission.delayCodes.map((delayCode) => ({ value: delayCode })),
        ...initialValues,
    };

    return {
        FormControl,
        departureArrivalFormSchema,
        estimatedDepartureArrivalInitialValues,
        onFormSubmit,
        isFetchingDelayCodes: delayCodesQuery.isFetching,
    };
};
