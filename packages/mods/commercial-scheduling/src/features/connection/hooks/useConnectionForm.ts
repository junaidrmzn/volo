import { useMemo, useState } from "react";
import { AircraftType, Category, Connection, Region, Vertiport } from "@voloiq/commercial-scheduling-api/v1";
import { createFormControl, datetime, number, object, select, string } from "@voloiq/form";
import { useEntityFormatter } from "@voloiq/utils";
import { ConnectionTranslationFunction, useConnectionTranslation } from "../translations/useConnectionTranslation";
import { useConnectionFormQueries } from "./useConnectionFormQueries";

const connectionSchemaFactory = (
    t: ConnectionTranslationFunction,
    regions: Region[],
    vertiports: Vertiport[],
    aircraftTypes: AircraftType[],
    isDepartureVertiportRequired: boolean,
    isArrivalVertiportRequired: boolean,
    formatWithParentheses: Function,
    connection?: Connection
) => {
    const regionOptions = regions.map((region) => ({ value: region.id, label: region.name }));
    const vertiportOptions = vertiports
        .filter((vertiport) => !!vertiport.code)
        .map((vertiport) => ({
            value: vertiport.id,
            label: formatWithParentheses(vertiport.code, vertiport.name),
        }));
    const aircraftTypeOptions = aircraftTypes
        .filter((aircraftType) => {
            if (aircraftType.id === connection?.aircraftTypeId) {
                return true;
            }

            if (!aircraftType.name.trim()) {
                return false;
            }

            if (!aircraftType.validTo) {
                return true;
            }

            const validTo = new Date(aircraftType.validTo).toDateString();
            const today = new Date().toDateString();
            const validToTime = new Date(validTo).getTime();
            const todayTime = new Date(today).getTime();

            return validToTime >= todayTime;
        })
        .map((aircraftType) => ({ value: aircraftType.id, label: aircraftType.name }));

    let departureVertiport = select({
        placeholder: t("generic.dropdown placeholder"),
        options: vertiportOptions,
        errorMessage: t("generic.dropdown error"),
    }).label(t("model.departureVertiportId"));
    let arrivalVertiport = select({
        placeholder: t("generic.dropdown placeholder"),
        options: vertiportOptions,
        errorMessage: t("generic.dropdown error"),
    }).label(t("model.arrivalVertiportId"));

    if (isDepartureVertiportRequired) {
        departureVertiport = departureVertiport.required(t("generic.required error"));
    }
    if (isArrivalVertiportRequired) {
        arrivalVertiport = arrivalVertiport.required(t("generic.required error"));
    }

    return object({
        name: string()
            .required(t("generic.required error"))
            .max(20, t("generic.maxLength error"))
            .label(t("model.name")),
        region: select({
            placeholder: t("generic.dropdown placeholder"),
            options: regionOptions,
            errorMessage: t("generic.dropdown error"),
        })
            .required(t("generic.required error"))
            .label(t("model.region")),
        departureVertiport,
        arrivalVertiport,
        aircraftType: select({
            placeholder: t("generic.dropdown placeholder"),
            options: aircraftTypeOptions,
            errorMessage: t("generic.dropdown error"),
        })
            .required(t("generic.required error"))
            .label(t("model.aircraftType")),
        flightDuration: number()
            .required(t("generic.required error"))
            .max(720, t("generic.maxNumber error"))
            .min(1, t("generic.minNumber error"))
            .label(t("model.flightDurationInMin")),
        validFrom: datetime({ withUtcTime: true }).required(t("generic.required error")).label(t("model.validFrom")),
        validTo: datetime({ withUtcTime: true }).required(t("generic.validTo error")).label(t("model.validTo")),
        title: string()
            .required(t("generic.required error"))
            .max(30, t("generic.maxLength error"))
            .label(t("model.title")),
        subtitle: string().max(30, t("generic.maxLength error")).label(t("model.subtitle")).nullable(),
        category: select<Category>({
            placeholder: t("generic.dropdown placeholder"),
            options: [
                { value: "DIRECT", label: t("model.direct") },
                { value: "SIGHTSEEING", label: t("model.sightseeing") },
                { value: "ROUNDTRIP", label: t("model.roundtrip") },
            ],
            errorMessage: t("generic.dropdown error"),
        })
            .required(t("generic.required error"))
            .label(t("model.category")),
    });
};

export type ConnectionSchema = ReturnType<typeof connectionSchemaFactory>;

type UseConnectionFormOptions = {
    connection?: Connection;
    isDepartureVertiportRequired?: boolean;
    isArrivalVertiportRequired?: boolean;
};

export const useConnectionForm = (options: UseConnectionFormOptions = {}) => {
    const { connection, isArrivalVertiportRequired = true, isDepartureVertiportRequired = true } = options;
    const [selectedRegionId, setSelectedRegionId] = useState<string | undefined>(connection?.regionId);
    const [selectedAircraftTypeId, setSelectedAircraftTypeId] = useState<string | undefined>(
        connection?.aircraftTypeId
    );
    const [selectedArrivalVertiportId, setSelectedArrivalVertiportId] = useState<string | undefined>(
        connection?.arrivalVertiportUuid
    );
    const [selectedDepartureVertiportId, setSelectedDepartureVertiportId] = useState<string | undefined>(
        connection?.departureVertiportUuid
    );

    const { t } = useConnectionTranslation();
    const { regions, aircraftTypes, vertiports } = useConnectionFormQueries({
        regionId: selectedRegionId,
        aircraftTypeId: selectedAircraftTypeId,
        arrivalVertiportId: selectedArrivalVertiportId,
        departureVertiportId: selectedDepartureVertiportId,
    });
    const { formatWithParentheses } = useEntityFormatter();

    const connectionSchema = useMemo(
        () =>
            connectionSchemaFactory(
                t,
                regions,
                vertiports,
                aircraftTypes,
                isDepartureVertiportRequired,
                isArrivalVertiportRequired,
                formatWithParentheses,
                connection
            ),
        [
            t,
            regions,
            vertiports,
            aircraftTypes,
            isDepartureVertiportRequired,
            isArrivalVertiportRequired,
            formatWithParentheses,
            connection,
        ]
    );

    const FormControl = createFormControl<typeof connectionSchema>();

    const onChangeSelectedRegion = (regionId: string) => {
        setSelectedRegionId(regionId);
        setSelectedArrivalVertiportId(undefined);
        setSelectedDepartureVertiportId(undefined);
    };

    const onChangeSelectedAircraftType = (aircraftTypeId: string) => {
        setSelectedAircraftTypeId(aircraftTypeId);
    };
    const onChangeSelectedArrivalVertiport = (arrivalVertiportId: string) => {
        setSelectedArrivalVertiportId(arrivalVertiportId);
    };
    const onChangeSelectedDepartureVertiport = (departureVertiportId: string) => {
        setSelectedDepartureVertiportId(departureVertiportId);
    };

    const passengerSeats = aircraftTypes.find((it: AircraftType) => it.id === selectedAircraftTypeId)?.passengerSeats;
    const isVertiportFormControlsVisible = !!selectedRegionId;

    return {
        FormControl,
        connectionSchema,
        aircraftTypes,
        vertiports,
        onChangeSelectedRegion,
        onChangeSelectedAircraftType,
        onChangeSelectedArrivalVertiport,
        onChangeSelectedDepartureVertiport,
        passengerSeats,
        isVertiportFormControlsVisible,
    };
};
