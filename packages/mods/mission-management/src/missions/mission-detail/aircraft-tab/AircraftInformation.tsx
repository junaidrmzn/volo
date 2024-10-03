import { Button, Flex, HStack, Icon, IconButton, Text, useDisclosure } from "@volocopter/design-library-react";
import { Aircraft } from "@voloiq-typescript-api/aircraft-management-types";
import { StatusOfMission } from "@voloiq-typescript-api/network-scheduling-types";
import { match } from "ts-pattern";
import { Mission } from "@voloiq/network-schedule-management-api/v1";
import { InfoCard, Section } from "@voloiq/network-scheduling-components";
import { useNavigate } from "@voloiq/routing";
import { MissionAircraftAssignmentModal } from "../../mission-list-item/mission-actions-popover/aircraft-assignment/MissionAircraftAssignmentModal";
import { useMissionTranslations } from "../../translations/useMissionTranslations";
import { ReservationStatusIcon } from "../../utils/ReservationStatusIcon";
import { UnAssignAircraftModal } from "./UnAssignAircraftModal";

type AircraftInformationProps = {
    mission: Mission;
    onReloadList: () => void;
    aircraftData?: Aircraft;
};

export const AircraftInformation = (props: AircraftInformationProps) => {
    const { t } = useMissionTranslations();
    const { mission, onReloadList, aircraftData } = props;
    const { assignments, service, statusOfMission } = mission;

    const {
        isOpen: isAircraftAssignmentModalOpen,
        onClose: onCloseAircraftAssignmentModal,
        onOpen: onOpenAircraftAssignmentModal,
    } = useDisclosure();

    const {
        isOpen: isAircraftUnAssignmentModalOpen,
        onClose: onCloseAircraftUnAssignmentModal,
        onOpen: onOpenAircraftUnAssignmentModal,
    } = useDisclosure();

    const goToAircraft = "/aircraft-management/aircraft/overview/";
    const navigation = useNavigate();

    const isAircraftCrewed =
        assignments?.crewMemberAssignments && assignments?.crewMemberAssignments?.length > 0
            ? t("aircraftTab.crewConfiguration.crewed")
            : t("aircraftTab.crewConfiguration.uncrewed");

    const missionService = match(service)
        .with("CARGO", () => t("service.CARGO"))
        .with("CARPOOL", () => t("service.CARPOOL"))
        .with("FERRY_FLIGHT", () => t("service.FERRY_FLIGHT"))
        .with("PASSENGER", () => t("service.PASSENGER"))
        .with("TEST", () => t("service.TEST"))
        .with("TRAINING", () => t("service.TRAINING"))
        .with("UNKNOWN", () => t("service.UNKNOWN"))
        .exhaustive();

    return (
        <>
            <Section
                headerLabel={t("aircraftTab.aircraftInformation")}
                resourceLabel={assignments?.aircraftTypeName}
                headerIcon={
                    assignments?.aircraftId && (
                        <IconButton
                            variant="ghost"
                            size="sm"
                            aria-label="externalLink"
                            data-testid="external-resource-button"
                            onClick={() => {
                                navigation(`${goToAircraft}${assignments?.aircraftId}`);
                            }}
                        >
                            <Icon icon="externalLink" size={4} />
                        </IconButton>
                    )
                }
                actions={
                    <HStack>
                        {assignments?.aircraftId && (
                            <Button
                                size="sm"
                                onClick={() => {
                                    onOpenAircraftUnAssignmentModal();
                                }}
                            >
                                {t("aircraftTab.headerActions.unassign")}
                            </Button>
                        )}
                        {statusOfMission !== StatusOfMission.CANCELLED && (
                            <Button
                                size="sm"
                                variant="primary"
                                onClick={() => {
                                    onOpenAircraftAssignmentModal();
                                }}
                            >
                                {assignments?.aircraftId
                                    ? t("aircraftTab.headerActions.reassign")
                                    : t("aircraftTab.headerActions.assign")}
                            </Button>
                        )}
                    </HStack>
                }
                bodyContent={
                    <Flex width="100%" gap={3} alignItems="flex-start">
                        <HStack width="100%">
                            <InfoCard
                                headerLabel={t("aircraftTab.aircraftSpecs")}
                                tagLabel={assignments?.aircraftTechnicalStatus}
                                tagType={assignments?.aircraftTechnicalStatus === "SERVICEABLE" ? "normal" : "error"}
                                tagPosition="left"
                                bodyContent={
                                    <HStack>
                                        <Text fontSize="xs">
                                            {assignments?.aircraftId ? (
                                                <>
                                                    {`${assignments?.aircraftTypeName} • MSN ${
                                                        assignments?.aircraftMSN
                                                    }${
                                                        assignments?.aircraftRegistration
                                                            ? ` • ${assignments?.aircraftRegistration}`
                                                            : ""
                                                    }`}
                                                    <ReservationStatusIcon
                                                        reservationStatus={assignments.aircraftReservationStatus}
                                                        declineMessages={assignments.aircraftReservationDeclineMessages}
                                                        blockingEntities={
                                                            assignments.aircraftReservationBlockingEntities
                                                        }
                                                    />
                                                </>
                                            ) : (
                                                t("noAssignment")
                                            )}
                                        </Text>
                                    </HStack>
                                }
                            />
                            <InfoCard
                                headerLabel={t("aircraftTab.configuration")}
                                bodyContent={
                                    <HStack>
                                        {assignments?.aircraftId ? (
                                            <Text fontSize="xs">{`${missionService} • ${isAircraftCrewed} • ${t(
                                                `aircrafAssignment.${
                                                    aircraftData?.passengerSeats === 1 ? "seat" : "seats"
                                                }`,
                                                {
                                                    seatCount: aircraftData?.passengerSeats,
                                                }
                                            )}`}</Text>
                                        ) : (
                                            <Text>-</Text>
                                        )}
                                    </HStack>
                                }
                            />
                            <InfoCard
                                headerLabel={t("aircraftTab.homebase")}
                                bodyContent={
                                    <HStack>
                                        <Text fontSize="xs">
                                            {assignments?.aircraftId && aircraftData?.homebaseVertiportName
                                                ? aircraftData?.homebaseVertiportName
                                                : t("noAssignment")}
                                        </Text>
                                    </HStack>
                                }
                            />
                        </HStack>
                    </Flex>
                }
            />
            <MissionAircraftAssignmentModal
                mission={mission}
                onReloadList={onReloadList}
                isOpen={isAircraftAssignmentModalOpen}
                onClose={onCloseAircraftAssignmentModal}
            />

            <UnAssignAircraftModal
                mission={mission}
                onReloadList={onReloadList}
                isOpen={isAircraftUnAssignmentModalOpen}
                onClose={onCloseAircraftUnAssignmentModal}
            />
        </>
    );
};
