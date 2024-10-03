import type { MissionDivert } from "@voloiq-typescript-api/network-scheduling-types";
import { useFormatDateTime } from "@voloiq/dates";
import type { FieldName, SelectOption } from "@voloiq/form";
import { createFormControl, datetime, object, select } from "@voloiq/form";
import { Mission, useDivertMission } from "@voloiq/network-schedule-management-api/v1";
import { useRequestWithErrorHandling } from "../../../errors/useRequestWithErrorHandling";
import { useVertiportOptions } from "../../../mission-creation/useVertiportOptions";
import type { MissionTranslationFunction } from "../../../translations/useMissionTranslations";
import { useMissionTranslations } from "../../../translations/useMissionTranslations";
import { useActionsPopover } from "../popover-context/useActionsPopover";

type UseDivertMissionOptions = {
    t: MissionTranslationFunction;
    vertiports: SelectOption[];
    mission: Mission;
    formatDateTime: (input: string | Date, specificTimeZone?: string | undefined) => string;
};

const divertMissionSchema = (options: UseDivertMissionOptions) => {
    const { t, vertiports, mission, formatDateTime } = options;
    return object({
        estimatedArrivalDateTime: datetime({ placeholder: t("pickTimePlaceholder") })
            .min(
                mission.actualDepartureDateTime,
                t("actualDeparture error", {
                    actualDepartureDate: mission.actualDepartureDateTime
                        ? formatDateTime(mission.actualDepartureDateTime)
                        : "",
                })
            )
            .required(t("required error"))
            .label(t("Arrival estimated")),
        arrivalVertiport: select({
            placeholder: t("vertiportPlaceholder"),
            options: vertiports,
            errorMessage: t("dropdown error"),
        })
            .required(t("required error"))
            .label(t("divertedArrivalVertiport")),
    });
};

export type DivertMissionSchema = ReturnType<typeof divertMissionSchema>;

type UseDivertMissionFormProps = {
    mission: Mission;
    onReloadList: () => void;
};

export const useDivertMissionForm = (props: UseDivertMissionFormProps) => {
    const { mission, onReloadList } = props;
    const { t } = useMissionTranslations();
    const { onClosePopover } = useActionsPopover();
    const { vertiportOptions } = useVertiportOptions();
    const { formatDateTime } = useFormatDateTime();
    const vertiports = vertiportOptions(mission.departureVertiportId);
    const divertMissionFormSchema = divertMissionSchema({ t, vertiports, mission, formatDateTime });

    const isDivertMissionFieldName = (attribute: unknown): attribute is FieldName<DivertMissionSchema> =>
        Object.keys(divertMissionFormSchema.describe().fields).includes(attribute as FieldName<DivertMissionSchema>);

    const { sendRequest } = useDivertMission(mission.id);

    const { makeRequestWithErrorHandling } = useRequestWithErrorHandling({
        isFieldName: isDivertMissionFieldName,
        makeRequest: (requestConfig: { data: MissionDivert }) =>
            sendRequest({ ...requestConfig, params: { version: mission.version } }),
        schema: divertMissionFormSchema,
    });

    const FormControl = createFormControl<DivertMissionSchema>();

    const initialValues = {
        estimatedArrivalDateTime: mission.estimatedArrivalDateTime
            ? new Date(mission.estimatedArrivalDateTime)
            : new Date(),
        arrivalVertiportId: undefined,
    };

    const onFormSubmit = (formData: { arrivalVertiport: SelectOption; estimatedArrivalDateTime: Date }) => {
        const data: MissionDivert = {
            estimatedArrivalDateTime: formData.estimatedArrivalDateTime.toISOString(),
            arrivalVertiportId: formData.arrivalVertiport.value,
        };
        return makeRequestWithErrorHandling({ data }).then((response) => {
            if (Object.keys(response).length === 0) {
                onClosePopover();
                onReloadList();
            }
            return response;
        });
    };

    return {
        divertMissionFormSchema,
        onFormSubmit,
        onClosePopover,
        FormControl,
        initialValues,
    };
};
