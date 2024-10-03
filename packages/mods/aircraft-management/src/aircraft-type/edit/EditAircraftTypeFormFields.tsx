import { Heading } from "@volocopter/design-library-react";
import type { AircraftType } from "@voloiq-typescript-api/aircraft-management-types";
import type { ReactElement } from "react";
import type { FormControlProps } from "@voloiq/form";
import { useForm } from "@voloiq/form";
import { adjustEndDateOnDateChange } from "@voloiq/utils";
import { useResourcesTranslation } from "../../translations/useResourcesTranslation";
import { PerformanceDataFileUpload } from "./performanceFileUpload/PerformanceDataFileUpload";
import type { AircraftTypeEditSchema } from "./useAircraftTypeEditForm";

export type EditAircraftTypeFormFieldsProps = {
    resource: AircraftType;
    FormControl: (props: FormControlProps<AircraftTypeEditSchema>) => ReactElement | null;
    version?: number;
};

type FromChangeType = {
    originalStartDate: Date | undefined;
    originalEndDate: Date | undefined;
    changeEvent: Date;
    updateLabel: string;
};

const EditAircraftTypeFormFields = (props: EditAircraftTypeFormFieldsProps) => {
    const { FormControl, version, resource } = props;
    const { t } = useResourcesTranslation();
    const { setValue } = useForm();

    const fromChangeHandler = (props: FromChangeType) => {
        const { originalStartDate, originalEndDate, changeEvent, updateLabel } = props;
        if (originalStartDate && originalEndDate) {
            const returned = adjustEndDateOnDateChange({
                originalStartDate,
                originalEndDate,
                adjustedStartDate: changeEvent,
            });
            if (returned) {
                setValue(updateLabel, returned);
            }
        }
    };

    return (
        <>
            <FormControl
                fieldName="validFrom"
                additionalInfo={t("aircraft-type.additionalInfo.validFrom")}
                onChange={(event) => {
                    if (event instanceof Date) {
                        fromChangeHandler({
                            originalStartDate: new Date(resource.validFrom),
                            originalEndDate: resource.validTo ? new Date(resource.validTo) : undefined,
                            changeEvent: event,
                            updateLabel: "validTo",
                        });
                    }
                }}
            />
            <FormControl fieldName="validTo" additionalInfo={t("aircraft-type.additionalInfo.validTo")} />
            <FormControl
                fieldName="productLine"
                isNotEditable
                additionalInfo={t("aircraft-type.additionalInfo.productLine")}
            />
            <FormControl
                fieldName="minimumTemperature"
                additionalInfo={t("aircraft-type.additionalInfo.minimumTemperature")}
            />
            <FormControl
                fieldName="maximumTemperature"
                additionalInfo={t("aircraft-type.additionalInfo.maximumTemperature")}
            />
            <FormControl fieldName="windSpeed" additionalInfo={t("aircraft-type.additionalInfo.maximumWindSpeed")} />
            <FormControl
                fieldName="relativeHumidity"
                additionalInfo={t("aircraft-type.additionalInfo.relativeHumidity")}
            />
            <FormControl fieldName="rain" additionalInfo={t("aircraft-type.additionalInfo.maximumPrecipitation")} />
            <FormControl fieldName="visibility" additionalInfo={t("aircraft-type.additionalInfo.minimumVisibility")} />
            <FormControl fieldName="cloudCeilingHeight" />
            <FormControl fieldName="airDensity" additionalInfo={t("aircraft-type.additionalInfo.airDensity")} />
            <FormControl
                fieldName="performanceModel"
                additionalInfo={t("aircraft-type.model.aircraftResources performaceModelInfo")}
            />
            <FormControl
                fieldName="maxDurationToCsfl"
                additionalInfo={t("aircraft-type.model.aircraftResources maxDurationToCsflInfo")}
            />
            <FormControl
                fieldName="voltageThreshold"
                additionalInfo={t("aircraft-type.model.aircraftResources voltageThresholdInfo")}
            />
            <Heading as="h3" marginTop="2em" marginBottom="1em">
                {t("aircraft-type.performance data")}
            </Heading>
            <PerformanceDataFileUpload version={version} />
            <Heading as="h3" marginTop="2em" marginBottom="1em">
                {t("aircraft-type.massAndBalanceData")}
            </Heading>
            <FormControl fieldName="mbCgPositionX" additionalInfo={t("aircraft-type.additionalInfo.xCoordinate")} />
            <FormControl fieldName="mbCgPositionY" additionalInfo={t("aircraft-type.additionalInfo.yCoordinate")} />
            <FormControl fieldName="mbBem" additionalInfo={t("aircraft-type.additionalInfo.basicEmptyMass")} />
            <FormControl fieldName="mbMtom" additionalInfo={t("aircraft-type.additionalInfo.maximumTakeOffMass")} />
        </>
    );
};

export { EditAircraftTypeFormFields };
