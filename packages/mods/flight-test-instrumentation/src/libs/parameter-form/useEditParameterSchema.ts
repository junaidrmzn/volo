import { boolean, number, object, select, string, textarea } from "@voloiq/form";
import { useFtiParameterFormTranslation } from "./translations/useFtiTranslation";
import { UseParameterFormSchemaProps } from "./useParameterFormSchema";

export type UseParameterFormSchemaWithEditFlag = UseParameterFormSchemaProps & {
    isParameterEditable?: boolean;
};
export const useEditParameterSchema = (props: UseParameterFormSchemaWithEditFlag) => {
    const {
        aircraftZones = [],
        parameterSources = [],
        units = [],
        workgroups = [],
        ataIspecs = [],
        sensorTypes = [],
        isParameterEditable = true,
    } = props;
    const { t } = useFtiParameterFormTranslation();
    const sharedSelectProps = {
        placeholder: t("select.placeholder"),
        errorMessage: t("select.requiredErrorMessage"),
    };

    let aircraftZoneSchema = select({
        options: aircraftZones.map((aircraftZone) => ({
            label: aircraftZone.label,
            value: aircraftZone.id,
        })),
        ...sharedSelectProps,
    }).label(t("aircraftZoneLabel"));

    let workGroupSchema = select({
        options: workgroups.map((workgroup) => ({
            label: workgroup.label,
            value: workgroup.id,
        })),
        ...sharedSelectProps,
    }).label(t("workgroupLabel"));

    let shortDescriptionSchema = string().label(t("shortDescriptionLabel"));

    if (isParameterEditable) {
        aircraftZoneSchema = aircraftZoneSchema.required();
        workGroupSchema = workGroupSchema.required();
        shortDescriptionSchema = shortDescriptionSchema.required();
    }

    return object({
        aircraftZone: aircraftZoneSchema,
        workgroup: workGroupSchema,
        shortDescription: shortDescriptionSchema,
        description: textarea().label(t("descriptionLabel")),
        sensorType: select({
            options: sensorTypes.map((sensorType) => ({
                label: sensorType.label,
                value: sensorType.id,
            })),
            ...sharedSelectProps,
        }).label(t("sensorTypeLabel")),
        ataIspec: select({
            options: ataIspecs.map((ataIspec) => ({
                label: ataIspec.label,
                value: ataIspec.id,
            })),
            ...sharedSelectProps,
        }).label(t("ataIspec2200Label")),
        parameterSource: select({
            options: parameterSources.map((parameterSource) => ({
                label: parameterSource.label,
                value: parameterSource.id,
            })),
            ...sharedSelectProps,
        }).label(t("parameterSourceLabel")),
        unit: select({
            options: units.map((unit) => ({
                label: unit.label,
                value: unit.id,
            })),
            ...sharedSelectProps,
        }).label(t("unitLabel")),
        minValue: number().label(t("minValueLabel")),
        maxValue: number()
            .label(t("maxValueLabel"))
            .when("minValue", (minValue, schema) => {
                return minValue !== undefined ? schema.min(minValue, t("maxValueError")) : schema;
            }),
        accuracyValue: number().label(t("accuracyValueLabel")),
        minimumSamplingFrequency: number().label(t("minimumSamplingFrequencyLabel")),
        isSafetyOfFlightCritical: boolean().label(t("safetyOfFlightLabel")),
    });
};

export type EditParameterFormSchema = ReturnType<typeof useEditParameterSchema>;
