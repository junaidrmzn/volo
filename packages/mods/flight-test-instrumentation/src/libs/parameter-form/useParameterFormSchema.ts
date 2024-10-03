import type {
    Aircraft,
    AircraftZone,
    AtaIspec,
    ParameterSource,
    SensorType,
    Unit,
    Workgroup,
} from "@voloiq-typescript-api/fti-types";
import { boolean, multiselect, number, object, select, string, textarea } from "@voloiq/form";
import { useFtiParameterFormTranslation } from "./translations/useFtiTranslation";

export type UseParameterFormSchemaProps = {
    aircraft?: Aircraft[];
    aircraftZones?: AircraftZone[];
    parameterSources?: ParameterSource[];
    units?: Unit[];
    workgroups?: Workgroup[];
    ataIspecs?: AtaIspec[];
    sensorTypes?: SensorType[];
};

export type UseParameterFormSchemaWithEditFlag = UseParameterFormSchemaProps & {
    isParameterEditable?: boolean;
};

export const useParameterFormSchema = (props: UseParameterFormSchemaWithEditFlag) => {
    const {
        aircraft = [],
        aircraftZones = [],
        parameterSources = [],
        units = [],
        workgroups = [],
        ataIspecs = [],
        sensorTypes = [],
    } = props;
    const { t } = useFtiParameterFormTranslation();
    const sharedSelectProps = {
        placeholder: t("select.placeholder"),
        errorMessage: t("select.requiredErrorMessage"),
    };

    const aircraftSchema = () => {
        const options = aircraft.map((aircraft) => ({
            label: `${aircraft.productLine} - ${aircraft.aircraftType} - ${aircraft.msn}`,
            value: aircraft.id,
        }));
        return multiselect({
            options,
            ...sharedSelectProps,
        });
    };

    return object({
        aircraft: aircraftSchema().required().label(t("aircraftLabel")),
        aircraftZone: select({
            options: aircraftZones.map((aircraftZone) => ({
                label: aircraftZone.label,
                value: aircraftZone.id,
            })),
            ...sharedSelectProps,
        })
            .required()
            .label(t("aircraftZoneLabel")),
        workgroup: select({
            options: workgroups.map((workgroup) => ({
                label: workgroup.label,
                value: workgroup.id,
            })),
            ...sharedSelectProps,
        })
            .required()
            .label(t("workgroupLabel")),
        shortDescription: string().required().label(t("shortDescriptionLabel")),
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

export type ParameterFormSchema = ReturnType<typeof useParameterFormSchema>;
