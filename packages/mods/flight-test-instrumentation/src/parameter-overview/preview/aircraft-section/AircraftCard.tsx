import { Box, Grid, Icon, IconButton, Tag, Text, Tooltip } from "@volocopter/design-library-react";
import { Aircraft, ParameterStatusEnum } from "@voloiq-typescript-api/fti-types/dist";
import { match } from "ts-pattern";
import { useIsAuthorizedTo } from "@voloiq/auth";
import { useAircraftSectionTranslation } from "./translations/useAircraftSectionTranslation";

export type AircraftCardProps = {
    aircraft: Aircraft;
    openModal: (aircraftId: string) => void;
    status: ParameterStatusEnum;
    isStatusChangeAllowed: boolean;
};

export const getStatusVariant = (status: ParameterStatusEnum) => {
    return match(status)
        .with("REQUESTED", () => "gray" as const)
        .with("DRAFT", () => "warning-subtle" as const)
        .with("CANCELLED", () => "error" as const)
        .with("FROZEN", () => "blue-subtle" as const)
        .with("RELEASED", () => "teal" as const)
        .exhaustive();
};

export const AircraftCard = (props: AircraftCardProps) => {
    const { aircraft, status, openModal, isStatusChangeAllowed } = props;
    const { t } = useAircraftSectionTranslation();
    const isAuthorizedToUpdateStatus = useIsAuthorizedTo(["update"], ["ParameterStatusLog"]);

    return (
        <Grid
            gridTemplateColumns={isAuthorizedToUpdateStatus ? "6fr 1fr 1fr" : "6fr 1fr"}
            background="bgNavigationLayer1"
            borderRadius="sm"
            p={2}
            pl={3}
            mb={3}
            alignItems="center"
            role="listitem"
        >
            <Text fontSize="sm" lineHeight={6} fontWeight="bold">
                {`${aircraft.productLine} - ${aircraft.aircraftType} - ${aircraft.msn}`}
            </Text>
            <Box alignContent="flex-end">
                <Tag colorScheme={getStatusVariant(status)}>{t(`status.${status}`)}</Tag>
            </Box>
            {isAuthorizedToUpdateStatus && (
                <Text fontSize="xs" lineHeight={4} color="darkBlue.700" textAlign="end">
                    {isStatusChangeAllowed ? (
                        <IconButton
                            variant="ghost"
                            icon={<Icon icon="exchange" size={4} />}
                            aria-label={t("statusButton")}
                            onClick={() => openModal(aircraft.id)}
                        />
                    ) : (
                        <Tooltip mr={5} label={t("toolTipStatusButton")}>
                            <Box>
                                <IconButton
                                    variant="ghost"
                                    icon={<Icon icon="exchange" size={4} />}
                                    aria-label={t("statusButton")}
                                    onClick={() => openModal(aircraft.id)}
                                    disabled={!isStatusChangeAllowed}
                                />
                            </Box>
                        </Tooltip>
                    )}
                </Text>
            )}
        </Grid>
    );
};
