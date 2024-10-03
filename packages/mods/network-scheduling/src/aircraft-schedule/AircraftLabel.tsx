import { Box, HStack, Spacer, Tag, VStack } from "@volocopter/design-library-react";
import { CrewConfiguration } from "@voloiq-typescript-api/aircraft-management-types";
import { AircraftTechnicalStatus } from "@voloiq-typescript-api/network-scheduling-types";
import { match } from "ts-pattern";
import { Aircraft } from "@voloiq/network-scheduling-management-api/v1";
import { IdentifierStack, TextWithLabel } from "@voloiq/text-layouts";
import { useAircraftScheduleTranslation } from "./translations/useAircraftScheduleTranslation";

export type AircraftLabelProps = {
    aircraft: Aircraft;
};
export const AircraftLabel = (props: AircraftLabelProps) => {
    const { aircraft } = props;
    const { registration, aircraftTypeName, msn, technicalStatus, crewConfiguration, homebaseName, services } =
        aircraft;
    const { t } = useAircraftScheduleTranslation();

    return (
        <VStack width="100%" maxWidth={350} p={4} columnGap={2} spacing={0} alignItems="flex-start">
            <HStack width="100%" alignItems="flex-start">
                <Box maxWidth={200}>
                    <IdentifierStack
                        mainIdentifier={registration ?? ""}
                        secondaryIdentifier={aircraftTypeName}
                        thirdIdentifier={msn}
                    />
                </Box>
                <Spacer />
                {technicalStatus &&
                    match(technicalStatus)
                        .with(AircraftTechnicalStatus.SERVICEABLE, () => (
                            <Tag colorScheme="teal">{t("Technical status.SHORT.SERVICEABLE")}</Tag>
                        ))
                        .with(AircraftTechnicalStatus.SERVICEABLE_WITH_LIMITATIONS, () => (
                            <Tag colorScheme="warning-subtle">
                                {t("Technical status.SHORT.SERVICEABLE_WITH_LIMITATIONS.LIMITATIONS")}
                            </Tag>
                        ))
                        .with(AircraftTechnicalStatus.UNSERVICEABLE, () => (
                            <Tag colorScheme="error-subtle">{t("Technical status.SHORT.UNSERVICEABLE")}</Tag>
                        ))
                        .with(AircraftTechnicalStatus.UNKNOWN, () => (
                            <Tag colorScheme="error-subtle">{t("Technical status.SHORT.UNSERVICEABLE")}</Tag>
                        ))
                        .exhaustive()}
            </HStack>
            <HStack boxSize="full" justifyContent="space-between">
                <TextWithLabel label={t("Service")} text={services?.join(", ")} />
                <TextWithLabel
                    label={t("Crew conf.")}
                    text={
                        crewConfiguration &&
                        match(crewConfiguration)
                            .with(CrewConfiguration.CREWED, () => t("Crew.CREWED"))
                            .with(CrewConfiguration.UNCREWED, () => t("Crew.UNCREWED"))
                            .exhaustive()
                    }
                />
                <TextWithLabel label={t("Homebase")} text={homebaseName} />
            </HStack>
        </VStack>
    );
};
