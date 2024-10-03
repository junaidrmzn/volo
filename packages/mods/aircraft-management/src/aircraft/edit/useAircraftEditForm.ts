import type { Aircraft, AircraftResource, MassAndBalanceData } from "@voloiq-typescript-api/aircraft-management-types";
import { CrewConfiguration, Service, TechnicalStatus } from "@voloiq-typescript-api/aircraft-management-types";
import { useCallback, useEffect, useMemo } from "react";
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

const editAircraftSchemaFactory = (
    resourceTranslation: ResourcesTranslationFunction,
    aircraftTranslation: AircraftTranslationFunction,
    homebaseVertiports: SelectOption[]
) => {
    const baseAircraftSpec = {
        registration: string()
            .max(8, resourceTranslation("generic.maxLength error"))
            .label(aircraftTranslation("model.registration"))
            .nullable(),
        msn: string()
            .max(8, resourceTranslation("generic.maxLength error"))
            .required(resourceTranslation("generic.required error"))
            .matches(/^\d+$/, { message: aircraftTranslation("create.msn error numbers-only") })
            .label(aircraftTranslation("model.msn")),
        validFrom: datetime().required().label(aircraftTranslation("model.validFrom")),
        validTo: datetime()
            .when(
                "validFrom",
                (validFrom, yup) => validFrom && yup.min(validFrom, resourceTranslation("generic.validTo error"))
            )
            .label(aircraftTranslation("model.validTo")),
        aircraftType: string().label(aircraftTranslation("model.aircraftType")),
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
    };

    return object({
        ...baseAircraftSpec,
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

type EditAircraftSchema = ReturnType<typeof editAircraftSchemaFactory>;

export type UseAircraftTypeEditFormOptions = {
    resource: Aircraft;
};

export const useAircraftEditForm = (options: UseAircraftTypeEditFormOptions) => {
    const { resource } = options;
    const { t: aircraftTranslation } = useAircraftTranslation();
    const { t: resourceTranslation } = useResourcesTranslation();
    const { data: aircraftTypes, state: aircraftTypesGetState } = useGetAllAircraftTypes();
    const { vertiportOptions } = useGetAllVertiportOptions();

    const aircraftName: string = resource.registration ?? "n/a";
    const msn: string = resource?.msn ?? "n/a";

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

    const setAircraftTypeData = useCallback(
        (aircraftResources: AircraftResource[] | undefined, massAndBalanceData: MassAndBalanceData | undefined) => {
            if (aircraftResources) {
                setAircraftResources(
                    aircraftResources.map((aircraftResource) => ({ ...aircraftResource, editMode: false }))
                );
            }

            if (!massAndBalanceData) {
                return;
            }

            setMassAndBalanceData(massAndBalanceData);

            if (massAndBalanceData.longCgEnvelopePoints) {
                setMassAndBalanceLongPoints(
                    massAndBalanceData.longCgEnvelopePoints.map((point) => ({ ...point, editMode: false }))
                );
            }

            if (massAndBalanceData.latCgEnvelopePoints) {
                setMassAndBalanceLatPoints(
                    massAndBalanceData.latCgEnvelopePoints.map((point) => ({ ...point, editMode: false }))
                );
            }
        },
        [setAircraftResources, setMassAndBalanceData, setMassAndBalanceLongPoints, setMassAndBalanceLatPoints]
    );

    useEffect(() => {
        if (aircraftTypes.length === 0 || !resource) {
            return;
        }

        const selectedAircraftType = aircraftTypes.find((aircraftType) => aircraftType.id === resource.aircraftTypeId);
        if (!selectedAircraftType) {
            return;
        }

        const aircraftResources = resource.aircraftResources ?? selectedAircraftType.aircraftResources;
        const massAndBalanceData = resource.massAndBalanceData ?? selectedAircraftType.massAndBalanceData;
        setAircraftTypeData(aircraftResources, massAndBalanceData);
    }, [resource, aircraftTypes, setAircraftTypeData]);

    const editAircraftSchema = useMemo(
        () => editAircraftSchemaFactory(resourceTranslation, aircraftTranslation, vertiportOptions),
        [resourceTranslation, aircraftTranslation, vertiportOptions]
    );

    const aircraftInitialValues = {
        ...resource,
        services: resource?.services?.map((service) => {
            return { value: service };
        }),
        technicalStatus: { value: resource?.technicalStatus },
        crewConfiguration: { value: resource?.crewConfiguration },
        homebaseVertiport: { value: resource?.homebaseVertiportId },
        aircraftType: resource?.aircraftTypeId ? resource?.aircraftTypeName : "n/a",
        validFrom: resource?.validFrom ? new Date(resource?.validFrom) : undefined,
        validTo: resource?.validTo ? new Date(resource?.validTo) : undefined,
    };

    const isEditAircraftFieldName = (attribute: unknown): attribute is FieldName<EditAircraftSchema> =>
        Object.keys(editAircraftSchema.describe().fields).includes(attribute as FieldName<EditAircraftSchema>);

    const FormControl = createFormControl();

    const resetAircraftTypeData = () => {
        if (aircraftTypes.length === 0 || !resource) {
            return;
        }

        const selectedAircraftType = aircraftTypes.find((aircraftType) => aircraftType.id === resource.aircraftTypeId);
        if (!selectedAircraftType) {
            return;
        }

        const { aircraftResources, massAndBalanceData } = selectedAircraftType;
        setAircraftTypeData(aircraftResources, massAndBalanceData);
    };

    return {
        FormControl,
        editAircraftSchema,
        aircraftInitialValues,
        aircraftName,
        msn,
        aircraftTypesGetState,
        isEditAircraftFieldName,
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
        resetAircraftTypeData,
    };
};
