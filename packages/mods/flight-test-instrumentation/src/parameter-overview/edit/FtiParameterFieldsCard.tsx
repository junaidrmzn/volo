import { Grid, HStack, VStack } from "@volocopter/design-library-react";
import { useFormatDateTime } from "@voloiq/dates";
import { TextWithLabel } from "@voloiq/text-layouts";
import { Parameter } from "../../libs/fti-api/apiModels";
import { getPlaceholderIfUndefined } from "../utils";
import { useFtiEditTranslation } from "./translations/useFtiEditTranslation";

export type FtiParameterFieldsCardProps = {
    parameter: Parameter;
};

export const FtiParameterFieldsCard = (props: FtiParameterFieldsCardProps) => {
    const { parameter } = props;
    const { t } = useFtiEditTranslation();
    const { formatDateTime } = useFormatDateTime();
    const {
        aircraftZone,
        ataIspec,
        isSafetyOfFlightCritical,
        sensorType,
        parameterSource,
        requesterName,
        unit,
        minValue,
        maxValue,
        accuracy,
        description,
        minimumSamplingFrequency,
        workgroup,
        shortDescription,
        createTime,
    } = parameter;
    return (
        <HStack
            aria-label={t("parameterInfoCard")}
            gap={6}
            alignItems="flex-start"
            justifyContent="space-between"
            width="100%"
        >
            <VStack width="100%" gap={3}>
                <Grid templateColumns="repeat(5,1fr)" width="100%">
                    <TextWithLabel
                        size="small"
                        label={t("cardContent.aircraftZone")}
                        text={getPlaceholderIfUndefined(aircraftZone.label)}
                    />
                    <TextWithLabel
                        size="small"
                        label={t("cardContent.workgroup")}
                        text={getPlaceholderIfUndefined(workgroup.label)}
                    />
                    <TextWithLabel
                        size="small"
                        label={t("cardContent.shortDescription")}
                        text={getPlaceholderIfUndefined(shortDescription)}
                    />

                    <TextWithLabel
                        size="small"
                        label={t("cardContent.sensorType")}
                        text={getPlaceholderIfUndefined(sensorType?.label)}
                    />
                    <TextWithLabel
                        size="small"
                        label={t("cardContent.ataIspec2200")}
                        text={getPlaceholderIfUndefined(ataIspec?.label)}
                    />
                </Grid>
                <Grid templateColumns="repeat(5,1fr)" width="100%">
                    <TextWithLabel
                        size="small"
                        label={t("cardContent.parameterSource")}
                        text={getPlaceholderIfUndefined(parameterSource?.label)}
                    />
                    <TextWithLabel
                        size="small"
                        label={t("cardContent.unit")}
                        text={getPlaceholderIfUndefined(unit?.label)}
                    />
                    <TextWithLabel
                        size="small"
                        label={t("cardContent.minValue")}
                        text={getPlaceholderIfUndefined(minValue)}
                    />
                    <TextWithLabel
                        size="small"
                        label={t("cardContent.maxValue")}
                        text={getPlaceholderIfUndefined(maxValue)}
                    />
                    <TextWithLabel
                        size="small"
                        label={t("cardContent.accuracy")}
                        text={getPlaceholderIfUndefined(accuracy)}
                    />
                </Grid>
                <Grid templateColumns="repeat(5,1fr)" width="100%">
                    <TextWithLabel
                        size="small"
                        label={t("cardContent.minSamplingFrequency")}
                        text={getPlaceholderIfUndefined(minimumSamplingFrequency)}
                    />

                    <TextWithLabel
                        size="small"
                        label={t("cardContent.safetyOfFlight")}
                        text={isSafetyOfFlightCritical ? "Yes" : "No"}
                    />
                    <TextWithLabel
                        size="small"
                        label={t("cardContent.requestedBy")}
                        text={getPlaceholderIfUndefined(requesterName)}
                    />
                    <TextWithLabel
                        size="small"
                        label={t("cardContent.requestedOn")}
                        text={formatDateTime(createTime)}
                    />
                </Grid>
                <Grid templateColumns="repeat(5,1fr)" width="100%" justifySelf="flex-start">
                    <TextWithLabel
                        size="small"
                        label={t("cardContent.description")}
                        text={getPlaceholderIfUndefined(description)}
                    />
                </Grid>
            </VStack>
        </HStack>
    );
};
