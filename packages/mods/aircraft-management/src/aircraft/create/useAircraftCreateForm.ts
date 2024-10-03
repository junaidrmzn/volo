import type { AircraftType } from "@voloiq-typescript-api/aircraft-management-types";
import { CrewConfiguration, Service, TechnicalStatus } from "@voloiq-typescript-api/aircraft-management-types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useFormatDateTime } from "@voloiq/dates";
import type { FieldName, SelectOption } from "@voloiq/form";
import { createFormControl, datetime, multiselect, object, select, string } from "@voloiq/form";
import { useAircraftResources } from "../../aircraft-type/hooks/useAircraftResources";
import { useMassAndBalanceData } from "../../aircraft-type/hooks/useMassAndBalanceData";
import { useMassAndBalancePoints } from "../../aircraft-type/hooks/useMassAndBalancePoints";
import { useGetAllVertiportOptions } from "../../api-hooks/useAircraftService";
import { useGetAllAircraftTypes } from "../../api-hooks/useAircraftTypeService";
import type { ResourcesTranslationFunction } from "../../translations/useResourcesTranslation";
import { useResourcesTranslation } from "../../translations/useResourcesTranslation";
import type { AircraftTranslationFunction } from "../translations/useAircraftTranslation";
import { useAircraftTranslation } from "../translations/useAircraftTranslation";

const getAvailableAircraftTypeOptions = (aircraftTypes: AircraftType[] | undefined): SelectOption[] => {
    if (aircraftTypes !== undefined && aircraftTypes.length > 0) {
        return aircraftTypes.map<SelectOption>((aircraftType) => ({
            value: aircraftType.id,
            label: aircraftType.name,
        }));
    }
    return [];
};

const getInitialValues = () => {
    const validFrom = new Date();
    validFrom.setHours(validFrom.getUTCHours() + 1);
    validFrom.setMinutes(validFrom.getMinutes());
    validFrom.setSeconds(0);
    validFrom.setMilliseconds(0);

    return {
        validFrom,
    };
};

const createAircraftSchemaFactory = (
    resourceTranslation: ResourcesTranslationFunction,
    aircraftTranslation: AircraftTranslationFunction,
    aircraftTypes: AircraftType[],
    homebaseVertiports: SelectOption[],
    formatDateTime: Function
) => {
    const { validFrom } = getInitialValues();

    return object({
        registration: string()
            .max(8, resourceTranslation("generic.maxLength error"))
            .label(aircraftTranslation("model.registration")),
        msn: string()
            .max(8, resourceTranslation("generic.maxLength error"))
            .required(resourceTranslation("generic.required error"))
            .matches(/^\d+$/, { message: aircraftTranslation("create.msn error numbers-only") })
            .label(aircraftTranslation("model.msn")),
        validFrom: datetime()
            .min(
                validFrom,
                resourceTranslation("generic.validFrom error", {
                    minValidFromDate: formatDateTime(validFrom),
                })
            )
            .required()
            .label(aircraftTranslation("model.validFrom")),
        validTo: datetime()
            .when(
                "validFrom",
                (validFrom, yup) =>
                    validFrom &&
                    yup.min(
                        validFrom,
                        resourceTranslation("generic.validTo error", {
                            minValidToDate: formatDateTime(validFrom),
                        })
                    )
            )
            .label(aircraftTranslation("model.validTo")),
        aircraftType: select({
            placeholder: resourceTranslation("generic.dropdown placeholder"),
            options: getAvailableAircraftTypeOptions(aircraftTypes),
            errorMessage: resourceTranslation("generic.dropdown error"),
        })
            .required(resourceTranslation("generic.required error"))
            .label(aircraftTranslation("model.aircraftType")),
        technicalStatus: select<TechnicalStatus>({
            placeholder: resourceTranslation("generic.dropdown placeholder"),
            options: [
                {
                    value: TechnicalStatus.SERVICEABLE,
                    label: aircraftTranslation("model.technicalStatus serviceable"),
                },
                {
                    value: TechnicalStatus.SERVICEABLE_WITH_LIMITATIONS,
                    label: aircraftTranslation("model.technicalStatus serviceableWithLimitations"),
                },
                {
                    value: TechnicalStatus.UNSERVICEABLE,
                    label: aircraftTranslation("model.technicalStatus unserviceable"),
                },
            ],
            errorMessage: resourceTranslation("generic.dropdown error"),
        })
            .required(resourceTranslation("generic.required error"))
            .label(aircraftTranslation("model.technicalStatus")),
        homebaseVertiport: select({
            placeholder: resourceTranslation("generic.dropdown placeholder"),
            options: homebaseVertiports,
            errorMessage: resourceTranslation("generic.dropdown error"),
        }).label(aircraftTranslation("model.homebase")),
        crewConfiguration: select<CrewConfiguration>({
            placeholder: resourceTranslation("generic.dropdown placeholder"),
            options: [
                {
                    value: CrewConfiguration.CREWED,
                    label: aircraftTranslation("model.crewConfiguration crewed"),
                },
                {
                    value: CrewConfiguration.UNCREWED,
                    label: aircraftTranslation("model.crewConfiguration uncrewed"),
                },
            ],
            errorMessage: resourceTranslation("generic.dropdown error"),
        })
            .required(resourceTranslation("generic.required error"))
            .label(aircraftTranslation("model.crewConfiguration")),
        services: multiselect({
            placeholder: resourceTranslation("generic.dropdown placeholder"),
            options: [
                { value: Service.PASSENGER, label: aircraftTranslation("model.service Passenger") },
                { value: Service.CARGO, label: aircraftTranslation("model.service Cargo") },
                { value: Service.TEST, label: aircraftTranslation("model.service Test") },
                { value: Service.TRAINING, label: aircraftTranslation("model.service Training") },
                { value: Service.FERRY_FLIGHT, label: aircraftTranslation("model.service FerryFlight") },
                { value: Service.CARPOOL, label: aircraftTranslation("model.service Carpool") },
            ],
            errorMessage: resourceTranslation("generic.dropdown error"),
        })
            .required(resourceTranslation("generic.required error"))
            .label(aircraftTranslation("model.service")),
    });
};

type CreateAircraftSchema = ReturnType<typeof createAircraftSchemaFactory>;

export const useAircraftCreateForm = () => {
    const { formatDateTime } = useFormatDateTime();
    const { t: aircraftTranslation } = useAircraftTranslation();
    const { t: resourceTranslation } = useResourcesTranslation();
    const { data: aircraftTypes, state: aircraftTypesGetState } = useGetAllAircraftTypes();
    const { vertiportOptions } = useGetAllVertiportOptions();
    const [selectedAircraftType, setSelectedAircraftType] = useState<AircraftType>();
    const {
        aircraftResources,
        aircraftResourcesDisplayValues,
        setAircraftResources,
        handleDelete,
        toggleEditMode,
        handleAdd,
        handleChange,
    } = useAircraftResources();
    const {
        massAndBalancePoints: massAndBalanceLongPoints,
        massAndBalanceDisplayPoints: massAndBalanceLongDisplayPoints,
        setMassAndBalancePoints: setMassAndBalanceLongPoints,
        handleAdd: handleMbLongAdd,
        handleChange: handleMbLongChange,
        handleDelete: handleMbLongDelete,
        toggleEditMode: toggleMbLongEditMode,
    } = useMassAndBalancePoints();
    const {
        massAndBalancePoints: massAndBalanceLatPoints,
        massAndBalanceDisplayPoints: massAndBalanceLatDisplayPoints,
        setMassAndBalancePoints: setMassAndBalanceLatPoints,
        handleAdd: handleMbLatAdd,
        handleChange: handleMbLatChange,
        handleDelete: handleMbLatDelete,
        toggleEditMode: toggleMbLatEditMode,
    } = useMassAndBalancePoints();
    const { massAndBalanceData, setMassAndBalanceData, handleChange: handleMbChange } = useMassAndBalanceData();

    const initAircraftTypeState = useCallback(() => {
        if (!selectedAircraftType) {
            return;
        }

        if (selectedAircraftType.aircraftResources) {
            setAircraftResources(
                selectedAircraftType.aircraftResources.map((aircraftResource) => {
                    const { id, ...aircraftResourceWithoutId } = aircraftResource;

                    return {
                        ...aircraftResourceWithoutId,
                        editMode: false,
                    };
                })
            );
        }

        if (selectedAircraftType.massAndBalanceData?.longCgEnvelopePoints) {
            setMassAndBalanceLongPoints(
                selectedAircraftType.massAndBalanceData.longCgEnvelopePoints.map((point) => ({
                    ...point,
                    editMode: false,
                }))
            );
        }

        if (selectedAircraftType.massAndBalanceData?.latCgEnvelopePoints) {
            setMassAndBalanceLatPoints(
                selectedAircraftType.massAndBalanceData.latCgEnvelopePoints.map((point) => ({
                    ...point,
                    editMode: false,
                }))
            );
        }

        if (selectedAircraftType.massAndBalanceData) {
            setMassAndBalanceData(selectedAircraftType.massAndBalanceData);
        }
    }, [
        selectedAircraftType,
        setAircraftResources,
        setMassAndBalanceLongPoints,
        setMassAndBalanceLatPoints,
        setMassAndBalanceData,
    ]);

    useEffect(() => {
        initAircraftTypeState();
    }, [selectedAircraftType, initAircraftTypeState]);

    const createAircraftSchema = useMemo(
        () =>
            createAircraftSchemaFactory(
                resourceTranslation,
                aircraftTranslation,
                aircraftTypes,
                vertiportOptions,
                formatDateTime
            ),
        [resourceTranslation, aircraftTranslation, aircraftTypes, vertiportOptions, formatDateTime]
    );

    const isCreateAircraftFieldName = (attribute: unknown): attribute is FieldName<CreateAircraftSchema> =>
        Object.keys(createAircraftSchema.describe().fields).includes(attribute as FieldName<CreateAircraftSchema>);

    const FormControl = createFormControl();

    const selectAircraftType = (option: SelectOption) =>
        setSelectedAircraftType(aircraftTypes.find((aircraftType) => aircraftType.id === option.value));

    return {
        FormControl,
        createAircraftSchema,
        aircraftTypesGetState,
        isCreateAircraftFieldName,
        selectAircraftType,
        selectedAircraftType,
        aircraftResources: {
            values: aircraftResources,
            displayValues: aircraftResourcesDisplayValues,
            handleAdd,
            handleDelete,
            handleChange,
            toggleEditMode,
        },
        massAndBalanceLongPoints: {
            values: massAndBalanceLongPoints,
            displayValues: massAndBalanceLongDisplayPoints,
            handleAdd: handleMbLongAdd,
            handleChange: handleMbLongChange,
            handleDelete: handleMbLongDelete,
            toggleEditMode: toggleMbLongEditMode,
        },
        massAndBalanceLatPoints: {
            values: massAndBalanceLatPoints,
            displayValues: massAndBalanceLatDisplayPoints,
            handleAdd: handleMbLatAdd,
            handleChange: handleMbLatChange,
            handleDelete: handleMbLatDelete,
            toggleEditMode: toggleMbLatEditMode,
        },
        massAndBalanceData: {
            values: massAndBalanceData,
            handleChange: handleMbChange,
        },
        resetAircraftTypeState: initAircraftTypeState,
    };
};
