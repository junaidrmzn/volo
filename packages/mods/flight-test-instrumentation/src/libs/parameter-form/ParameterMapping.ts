import { SelectOption } from "@voloiq/form";
import { AircraftWithStatus, Parameter, ParameterInsert, ParameterPatch } from "../fti-api/apiModels";
import type { BaseParameterFormProps, EditParameterFormProps } from "./ParameterFormType";

export const createInsertParameterFromBulkFormData = (
    formData: Parameters<BaseParameterFormProps["onSubmit"]>[0] & { requesterEmail: string; requesterName: string }
): ParameterInsert => ({
    accuracy: formData.accuracyValue,
    aircraftIds: (formData.aircraft as SelectOption<string>[]).map((option) => option.value),
    aircraftZoneId: formData.aircraftZone.value,
    ataIspecId: formData.ataIspec?.value,
    description: formData.description,
    maxValue: formData.maxValue,
    minValue: formData.minValue,
    minimumSamplingFrequency: formData.minimumSamplingFrequency,
    parameterSourceId: formData.parameterSource?.value,
    requesterEmail: formData.requesterEmail,
    requesterName: formData.requesterName,
    sensorTypeId: formData.sensorType?.value,
    shortDescription: formData.shortDescription,
    unitId: formData.unit?.value,
    workgroupId: formData.workgroup?.value,
    isSafetyOfFlightCritical: formData.isSafetyOfFlightCritical,
});

export const createFormDataFromParameter = (
    parameter: Parameter,
    options: { canEditSensorTypeAndIspec: boolean }
): Parameters<EditParameterFormProps["onSubmit"]>[0] => ({
    description: parameter.description,
    maxValue: parameter.maxValue,
    minValue: parameter.minValue,
    minimumSamplingFrequency: parameter.minimumSamplingFrequency,
    parameterSource: parameter.parameterSource ? { value: parameter.parameterSource?.id } : undefined,
    aircraftZone: { value: parameter.aircraftZone.id },
    accuracyValue: parameter.accuracy,
    ataIspec: parameter.ataIspec && options.canEditSensorTypeAndIspec ? { value: parameter.ataIspec?.id } : undefined,
    sensorType:
        parameter.sensorType && options.canEditSensorTypeAndIspec ? { value: parameter.sensorType?.id } : undefined,
    unit: parameter.unit ? { value: parameter.unit?.id } : undefined,
    shortDescription: parameter.shortDescription,
    workgroup: { value: parameter.workgroup.id },
    isSafetyOfFlightCritical: parameter.isSafetyOfFlightCritical,
});

export const createParameterPatchFromFormData = (
    data: AircraftWithStatus[],
    formData: Parameters<EditParameterFormProps["onSubmit"]>[0]
): ParameterPatch => ({
    description: formData.description,
    maxValue: formData.maxValue,
    minValue: formData.minValue,
    minimumSamplingFrequency: formData.minimumSamplingFrequency,
    parameterSourceId: formData.parameterSource?.value,
    aircraftZoneId: formData.aircraftZone?.value,
    accuracy: formData.accuracyValue,
    aircraftIds: data.map((aircraft) => aircraft.id),
    ataIspecId: formData.ataIspec?.value,
    sensorTypeId: formData.sensorType?.value,
    unitId: formData.unit?.value,
    shortDescription: formData.shortDescription,
    workgroupId: formData.workgroup?.value,
    isSafetyOfFlightCritical: formData.isSafetyOfFlightCritical,
});

export const createOnlyMultiAircraftParameterPatchFromFormData = (data: AircraftWithStatus[]): ParameterPatch => ({
    aircraftIds: data.map((aircraft) => aircraft.id),
});
