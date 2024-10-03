import {
    Card,
    CardListItemProps,
    Grid,
    GridItem,
    HStack,
    SimpleGrid,
    Tag,
    Text,
    VStack,
} from "@volocopter/design-library-react";
import { match } from "ts-pattern";
import { TextWithLabel } from "@voloiq/text-layouts";
import { Parameter } from "../../libs/fti-api/apiModels";
import { SafetyOfFlightCriticalBadge } from "../SafetyOfFlightCriticalBadge";
import { useFtiListingTranslation } from "./translations/useFtiListingTranslation";

export type ParameterListItemProps = {
    parameter: Parameter;
} & CardListItemProps;

const getCombinedLabels = (firstLabel: string = "", secondLabel: string = "") => {
    return match([firstLabel, secondLabel])
        .with([firstLabel, ""], () => firstLabel)
        .with(["", secondLabel], () => secondLabel)
        .with([firstLabel, secondLabel], ([firstLabel, secondLabel]) => `${firstLabel} • ${secondLabel}`)
        .otherwise(() => "");
};

export const ParameterListItem = (props: ParameterListItemProps) => {
    const { parameter, ...cardListItemProps } = props;
    const {
        ftiCode,
        shortDescription,
        workgroup,
        aircraftZone,
        ataIspec,
        isSafetyOfFlightCritical,
        sensorType,
        parameterSource,
        aircrafts,
    } = parameter;

    const { t } = useFtiListingTranslation();

    const ataIspecAndParameterSourceLabel = getCombinedLabels(ataIspec?.label, parameterSource?.label);
    const aircraftZoneAndSensorTypeLabel = getCombinedLabels(aircraftZone.label, sensorType?.label);
    const hasRequestedStatus = aircrafts.some((aircraft) => aircraft.status === "REQUESTED");

    return (
        <Card {...cardListItemProps}>
            <SimpleGrid columns={2} width="100%">
                <HStack spacing={3}>
                    <Text fontWeight="bold">{ftiCode ?? t("card.cardTitle.generalTitle")}</Text>
                    {isSafetyOfFlightCritical && <SafetyOfFlightCriticalBadge />}
                </HStack>
                {hasRequestedStatus && (
                    <HStack justifyContent="flex-end">
                        <Tag colorScheme="info-subtle">
                            <Tag.Label>{t("card.cardTitle.openRequest")}</Tag.Label>
                        </Tag>
                    </HStack>
                )}
            </SimpleGrid>
            <SimpleGrid pt={2} columns={2} width="100%">
                <VStack alignItems="flex-start">
                    {ataIspecAndParameterSourceLabel !== "" && (
                        <HStack>
                            <Text>{ataIspecAndParameterSourceLabel}</Text>
                        </HStack>
                    )}
                    {aircraftZoneAndSensorTypeLabel !== "" && (
                        <HStack>
                            <Text>{aircraftZoneAndSensorTypeLabel}</Text>
                        </HStack>
                    )}
                </VStack>
                <Grid boxSize="full" templateColumns="repeat(4, 1fr)">
                    <GridItem colStart={2} justifySelf="flex-start">
                        <TextWithLabel label={t("card.cardTitle.shortDescription")} text={shortDescription} />
                    </GridItem>
                    <GridItem justifySelf="center">
                        <TextWithLabel label={t("card.cardTitle.workgroup")} text={workgroup.label} />
                    </GridItem>
                    <GridItem justifySelf="flex-end">
                        <TextWithLabel
                            label={t("card.cardTitle.msn")}
                            text={
                                <VStack>
                                    {aircrafts.map((aircraft) => (
                                        <Text key={aircraft.id}>{aircraft.msn}</Text>
                                    ))}
                                </VStack>
                            }
                        />
                    </GridItem>
                </Grid>
            </SimpleGrid>
        </Card>
    );
};
