import type {
    Aircraft,
    AircraftZone,
    AtaIspec,
    ParameterSource,
    SensorType,
    Unit,
    Workgroup,
} from "@voloiq-typescript-api/fti-types";
import { FilterProperty } from "@voloiq/resource-overview";
import { useReadableOptions } from "../../libs/parameter-status/parameter-status-form/useParameterStatusFormSchema";
import { useFtiFilterTranslation } from "./translations/useFtiFilterTranslation";

type GetAllFilterPropertiesProps = {
    aircrafts: Aircraft[];
    aircraftZones: AircraftZone[];
    workGroups: Workgroup[];
    parameterSources: ParameterSource[];
    ataIspecs: AtaIspec[];
    sensorTypes: SensorType[];
    units: Unit[];
};

export const useGetAllFilterProperties = () => {
    const { t } = useFtiFilterTranslation();
    const statusSelectOptions = useReadableOptions();

    const getAllFilterProperties = (props: GetAllFilterPropertiesProps): FilterProperty[] => {
        const { aircrafts, workGroups, aircraftZones, parameterSources, ataIspecs, sensorTypes, units } = props;

        return [
            {
                type: "select-multiple",
                propertyName: "aircraftMapping.aircraftId",
                label: t("aircraft.displayName"),
                options: aircrafts.map((aircraft) => ({
                    label: `${aircraft.productLine} - ${aircraft.aircraftType} - ${aircraft.msn}`,
                    value: aircraft.id,
                })),
                group: t("title"),
            },
            {
                type: "text",
                propertyName: "shortDescription",
                label: t("shortDescription.displayName"),
                group: t("title"),
            },
            {
                type: "boolean",
                propertyName: "isSafetyOfFlightCritical",
                label: t("isSafetyOfFlightCritical.displayName"),
                group: t("title"),
                options: [
                    { label: t("isSafetyOfFlightCritical.trueLabel"), value: true },
                    { label: t("isSafetyOfFlightCritical.falseLabel"), value: false },
                ],
            },
            {
                type: "select-multiple",
                propertyName: "workgroupId",
                label: t("workgroup.displayName"),
                options: workGroups.map((workGroup) => ({
                    label: workGroup.label,
                    value: workGroup.id,
                })),
                group: t("title"),
            },
            {
                type: "select-multiple",
                propertyName: "aircraftMapping.status",
                label: t("status.displayName"),
                options: statusSelectOptions,
                group: t("title"),
            },
            {
                type: "text",
                propertyName: "ftiCode",
                label: t("ftiCode.displayName"),
                group: t("title"),
            },
            {
                type: "select-multiple",
                propertyName: "aircraftZoneId",
                label: t("aircraftZone.displayName"),
                options: aircraftZones?.map((aircraftZone) => ({
                    label: aircraftZone.label,
                    value: aircraftZone.id,
                })),
                group: t("title"),
            },
            {
                type: "text",
                propertyName: "requesterName",
                label: t("requesterName.displayName"),
                group: t("title"),
            },
            {
                type: "text",
                propertyName: "description",
                label: t("description.displayName"),
                group: t("title"),
            },
            {
                type: "select-multiple",
                propertyName: "parameterSourceId",
                label: t("parameterSource.displayName"),
                options: parameterSources.map((parameterSource) => ({
                    label: parameterSource.label,
                    value: parameterSource.id,
                })),
                group: t("title"),
            },
            {
                type: "select-multiple",
                propertyName: "ataIspecId",
                label: t("ataIspec2200.displayName"),
                options: ataIspecs.map((ataIspec) => ({
                    label: ataIspec.label,
                    value: ataIspec.id,
                })),
                group: t("title"),
            },
            {
                type: "select-multiple",
                propertyName: "sensorTypeId",
                label: t("sensorType.displayName"),
                options: sensorTypes.map((sensorType) => ({
                    label: sensorType.label,
                    value: sensorType.id,
                })),
                group: t("title"),
            },
            {
                type: "select-multiple",
                propertyName: "unitId",
                label: t("unit.displayName"),
                options: units.map((unit) => ({
                    label: unit.label,
                    value: unit.id,
                })),
                group: t("title"),
            },
            {
                type: "number-range",
                propertyName: "minValue",
                minLabel: t("minValue.fromLabel"),
                maxLabel: t("minValue.toLabel"),
                label: t("minValue.displayName"),
                group: t("title"),
            },
            {
                type: "number-range",
                propertyName: "maxValue",
                minLabel: t("maxValue.fromLabel"),
                maxLabel: t("maxValue.toLabel"),
                label: t("maxValue.displayName"),
                group: t("title"),
            },
            {
                type: "number-range",
                propertyName: "accuracy",
                minLabel: t("accuracy.fromLabel"),
                maxLabel: t("accuracy.toLabel"),
                label: t("accuracy.displayName"),
                group: t("title"),
            },
            {
                type: "number-range",
                propertyName: "minimumSamplingFrequency",
                minLabel: t("minimumSamplingFrequency.fromLabel"),
                maxLabel: t("minimumSamplingFrequency.toLabel"),
                label: t("minimumSamplingFrequency.displayName"),
                group: t("title"),
            },
        ];
    };
    return { getAllFilterProperties };
};
