import type { CardListItemProps } from "@volocopter/design-library-react";
import { Box, Grid, Tag, VStack } from "@volocopter/design-library-react";
import { CrewConfiguration, Service } from "@voloiq-typescript-api/aircraft-management-types";
import { match } from "ts-pattern";
import type { Aircraft } from "@voloiq/aircraft-management-api/v1";
import { CardListItem } from "@voloiq/card-list-item";
import { useFormatDateTime } from "@voloiq/dates";
import { IdentifierStack, TextWithLabel } from "@voloiq/text-layouts";
import { useContainerQuery } from "@voloiq/utils";
import { useAircraftTranslation } from "../../translations/useAircraftTranslation";
import { TechnicalStatusTag } from "./TechnicalStatusTag";
import { useAircraftListItemTranslation } from "./translations/useAircraftListItemTranslation";

export type AircraftListItemProps = {
    aircraft: Aircraft;
} & CardListItemProps;

export const AircraftListItem = (props: AircraftListItemProps) => {
    const { aircraft, onClick, isSelected } = props;
    const {
        id,
        aircraftTypeName,
        crewConfiguration,
        homebaseVertiportName,
        msn,
        registration,
        services,
        technicalStatus,
        validFrom,
        validTo,
        synchronizedWithLeon,
    } = aircraft;

    const { t } = useAircraftListItemTranslation();
    const { t: aircraftTranslation } = useAircraftTranslation();
    const { formatDateTime } = useFormatDateTime();

    const [ref, { gridProps }] = useContainerQuery({
        0: {
            gridProps: {
                spacing: 1,
                templateColumns: "repeat(3, 8rem)",
                gap: "1rem",
            },
        },
        1080: {
            gridProps: {
                spacing: 1,
                templateColumns: "repeat(3, 17rem)",
                gap: "1rem",
            },
        },
    });

    const serviceText = services
        ?.map((service) =>
            match(service)
                .with(Service.CARGO, () => t("cargo"))
                .with(Service.PASSENGER, () => t("passenger"))
                .with(Service.TEST, () => t("test"))
                .with(Service.TRAINING, () => t("training"))
                .with(Service.FERRY_FLIGHT, () => t("ferry flight"))
                .with(Service.CARPOOL, () => t("carpool"))
                .with(Service.UNKNOWN, () => t("unknown"))
                .exhaustive()
        )
        .join(", ");

    return (
        <div ref={ref} data-testid="aircraft-list-item">
            <CardListItem key={id} onClick={onClick!} isSelected={isSelected} ariaLabel={msn}>
                <CardListItem.Identifier>
                    <IdentifierStack
                        mainIdentifier={msn}
                        secondaryIdentifier={aircraftTypeName}
                        thirdIdentifier={registration}
                    />
                </CardListItem.Identifier>
                <CardListItem.AdditionalContent>
                    <Grid {...gridProps}>
                        <TextWithLabel label={t("service")} text={serviceText} />
                        <TextWithLabel
                            label={t("crew configuration")}
                            text={match(crewConfiguration)
                                .with(CrewConfiguration.CREWED, () => t("crewed"))
                                .with(CrewConfiguration.UNCREWED, () => t("uncrewed"))
                                .with(CrewConfiguration.UNKNOWN, () => t("unknown"))
                                .exhaustive()}
                        />
                        <TextWithLabel label={t("homebase")} text={homebaseVertiportName} />
                    </Grid>
                </CardListItem.AdditionalContent>
                <CardListItem.Status>
                    <VStack spacing={0} alignItems="flex-end" height="full">
                        <Box flex={1}>
                            {synchronizedWithLeon && (
                                <Tag colorScheme="info-subtle" mr={1}>
                                    <Tag.Label variant="light">{aircraftTranslation("leon")}</Tag.Label>
                                </Tag>
                            )}
                            <TechnicalStatusTag technicalStatus={technicalStatus} />
                        </Box>
                        <Box>{formatDateTime(validFrom)}</Box>
                        <Box>-&nbsp;{validTo ? formatDateTime(validTo) : "N/A"}</Box>
                    </VStack>
                </CardListItem.Status>
            </CardListItem>
        </div>
    );
};
