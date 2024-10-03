import { Heading } from "@volocopter/design-library-react";
import type { ReactElement } from "react";
import type { FormControlProps } from "@voloiq/form";
import { useResourcesTranslation } from "../../translations/useResourcesTranslation";
import type { AircraftTypeCreateSchema } from "./useAircraftTypeCreateForm";

type CreateAircraftTypeFormFieldsProps = {
    FormControl: (props: FormControlProps<AircraftTypeCreateSchema>) => ReactElement | null;
};

export const CreateAircraftTypeFields = (props: CreateAircraftTypeFormFieldsProps) => {
    const { t } = useResourcesTranslation();
    const { FormControl } = props;

    return (
        <>
            <FormControl fieldName="name" additionalInfo={t("aircraft-type.additionalInfo.type")} />
            <FormControl fieldName="validFrom" additionalInfo={t("aircraft-type.additionalInfo.validFrom")} />
            <FormControl fieldName="validTo" additionalInfo={t("aircraft-type.additionalInfo.validTo")} />
            <FormControl fieldName="productLine" additionalInfo={t("aircraft-type.additionalInfo.productLine")} />
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
            <>
                <Heading as="h3" marginTop="2em" marginBottom="1em">
                    {t("aircraft-type.massAndBalanceData")}
                </Heading>
                <FormControl fieldName="mbCgPositionX" additionalInfo={t("aircraft-type.additionalInfo.xCoordinate")} />
                <FormControl fieldName="mbCgPositionY" additionalInfo={t("aircraft-type.additionalInfo.yCoordinate")} />
                <FormControl fieldName="mbBem" additionalInfo={t("aircraft-type.additionalInfo.basicEmptyMass")} />
                <FormControl fieldName="mbMtom" additionalInfo={t("aircraft-type.additionalInfo.maximumTakeOffMass")} />
            </>
        </>
    );
};
