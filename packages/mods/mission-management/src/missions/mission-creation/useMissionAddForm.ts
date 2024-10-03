import { MissionCreate, Service, TypeOfOperation } from "@voloiq-typescript-api/network-scheduling-types";
import { useMemo, useState } from "react";
import { useFormatDateTime } from "@voloiq/dates";
import type { InitialValues, OnCreateHandler, SelectOption } from "@voloiq/form";
import { createFormControl, datetime, isSelectOption, object, select, string } from "@voloiq/form";
import { useAddMission } from "@voloiq/network-schedule-management-api/v1";
import { useRequestWithErrorHandling } from "../errors/useRequestWithErrorHandling";
import type { MissionTranslationFunction } from "../translations/useMissionTranslations";
import { useMissionTranslations } from "../translations/useMissionTranslations";
import { createFormAttributeTypeGuard } from "./createFormAttributeTypeGuard";
import { useVertiportOptions } from "./useVertiportOptions";

const createMissionAddSchema = (
    departureVertiportOptions: SelectOption[],
    arrivalVertiportOptions: SelectOption[],
    t: MissionTranslationFunction,
    formatDateTime: Function
) =>
    object({
        flightNumber: string()
            .matches(/^[\dA-Z]{2}[1-9]\d{0,3}$/, t("generic.flightNumber error"))
            .required()
            .label(t("Flight number")),
        ftoNumber: string()
            .max(30, t("generic.maxLength error"))
            .matches(/^[\d .A-z-]*$/, t("generic.pattern error"))
            .label(t("FTO number")),
        departureDateTime: datetime()
            .min(
                new Date(),
                t("generic.scheduledDeparture error", {
                    minScheduledDepartureDate: formatDateTime(new Date()),
                })
            )
            .required()
            .label(t("Departure date")),
        departureVertiport: select({
            placeholder: t("dropdown placeholder"),
            options: departureVertiportOptions,
            errorMessage: t("dropdown error"),
        })
            .required()
            .label(t("Departure vertiport")),
        arrivalDateTime: datetime()
            .when(
                "departureDateTime",
                (departureDateTime, yup) =>
                    departureDateTime &&
                    yup.min(
                        departureDateTime,
                        t("generic.scheduledArrial error", {
                            minScheduledArrivalDate: formatDateTime(departureDateTime),
                        })
                    )
            )
            .required()
            .label(t("Arrival date")),
        arrivalVertiport: select({
            placeholder: t("dropdown placeholder"),
            options: arrivalVertiportOptions,
            errorMessage: t("dropdown error"),
        })
            .required()
            .label(t("Arrival vertiport")),
        typeOfOperation: select<TypeOfOperation>({
            placeholder: t("dropdown placeholder"),
            options: [
                { value: TypeOfOperation.PILOTED, label: t("type-of-operation.PILOTED") },
                { value: TypeOfOperation.REMOTE_PILOTED, label: t("type-of-operation.REMOTE_PILOTED") },
            ],
            errorMessage: t("dropdown error"),
        })
            .required()
            .label(t("Type of operation")),
        service: select<Service>({
            placeholder: t("dropdown placeholder"),
            options: [
                { value: Service.TEST, label: t("Test") },
                { value: Service.TRAINING, label: t("Training") },
                { value: Service.FERRY_FLIGHT, label: t("FerryFlight") },
            ],
            errorMessage: t("dropdown error"),
        })
            .required()
            .label(t("Service")),
    });

export type MissionAddSchema = ReturnType<typeof createMissionAddSchema>;

export const useMissionAddForm = () => {
    const [departureVertiportOptions, setDepartureVertiportOptions] = useState<SelectOption[]>([]);
    const { t } = useMissionTranslations();
    const { vertiportOptions } = useVertiportOptions();
    const [service, setService] = useState(Service.TEST);
    const { sendRequest } = useAddMission();
    const onChangeServiceOption = (element: unknown) => {
        if (isSelectOption(element)) {
            setService(element.value as Service);
        }
    };
    const { formatDateTime } = useFormatDateTime();

    const onChangeDepartureVertiportOption = (element: unknown) => {
        if (isSelectOption(element)) {
            setDepartureVertiportOptions(vertiportOptions(element.value));
        }
    };

    const initialValues: InitialValues<MissionAddSchema> = {
        service: { value: Service.TEST },
    };

    const missionAddSchema = useMemo(
        () => createMissionAddSchema(vertiportOptions(), departureVertiportOptions, t, formatDateTime),
        [vertiportOptions, departureVertiportOptions, t, formatDateTime]
    );

    const { makeRequestWithErrorHandling } = useRequestWithErrorHandling({
        isFieldName: createFormAttributeTypeGuard(missionAddSchema),
        makeRequest: sendRequest,
        schema: missionAddSchema,
    });

    const onCreate: OnCreateHandler<MissionAddSchema> = (formData) => {
        const data: MissionCreate = {
            flightNumber: formData.flightNumber,
            ftoNumber: formData.service.value === Service.TEST ? formData.ftoNumber : undefined,
            typeOfOperation: formData.typeOfOperation.value,
            departureVertiportId: formData.departureVertiport.value,
            arrivalVertiportId: formData.arrivalVertiport.value,
            departureDateTime: formData.departureDateTime.toISOString(),
            arrivalDateTime: formData.arrivalDateTime.toISOString(),
            service: formData.service.value,
            source: "NETWORK_SCHEDULE",
        };
        return makeRequestWithErrorHandling({ data });
    };

    const MissionFormControl = createFormControl<MissionAddSchema>();

    return {
        onCreate,
        schema: missionAddSchema,
        initialValues,
        onChangeServiceOption,
        service,
        onChangeDepartureVertiportOption,
        MissionFormControl,
    };
};
