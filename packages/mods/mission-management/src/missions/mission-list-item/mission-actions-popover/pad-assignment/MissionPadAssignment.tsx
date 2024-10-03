import { Box, Button, Flex, HStack, Icon, RadioGroup, Spinner, Text } from "@volocopter/design-library-react";
import { Mission } from "@voloiq/network-schedule-management-api/v1";
import { useMissionTranslations } from "../../../translations/useMissionTranslations";
import { PadState } from "../popover-context/ActionsPopoverContext";
import { PadCard } from "./PadCard";
import { useMissionPadAssignment } from "./useMissionPadAssignment";

type MissionFatoAssignmentProps = {
    mission: Mission;
    onReloadList: () => void;
    onClose: () => void;
    actionsPadState: PadState;
};

export const MissionPadAssignment = (props: MissionFatoAssignmentProps) => {
    const { mission, onReloadList, onClose, actionsPadState } = props;

    const { t } = useMissionTranslations();
    const {
        onSubmit,
        pads,
        selectedPads,
        setSelectedPads,
        startDate,
        endDate,
        state,
        goToVertiportResource,
        assignPadState,
    } = useMissionPadAssignment({
        mission,
        onReloadList,
        onClose,
        actionsPadState,
    });

    const handleFatoSelection = (value: string) => {
        setSelectedPads(value);
    };
    return (
        <>
            <Box bg="monochrome.200" p={3} borderRadius="sm">
                <RadioGroup onChange={handleFatoSelection} value={selectedPads}>
                    <Box overflowY="scroll" maxH="50vh">
                        {state === "success" ? (
                            pads.length > 0 ? (
                                pads.map((pad) => (
                                    <PadCard
                                        key={pad.id}
                                        pad={pad}
                                        startDate={startDate}
                                        endDate={endDate}
                                        reservationSlotStartDate={
                                            mission.estimatedDepartureDateTime ?? new Date().toISOString()
                                        }
                                        reservationSlotEndDate={
                                            mission.estimatedArrivalDateTime ?? new Date().toISOString()
                                        }
                                    />
                                ))
                            ) : (
                                <Text align="center">{t("padAssignment.errorEmpty")}</Text>
                            )
                        ) : (
                            <HStack alignItems="center" justifyContent="center">
                                <Spinner />
                            </HStack>
                        )}
                    </Box>
                </RadioGroup>
            </Box>
            <Flex justifyContent="space-between" alignItems="center" mt={4}>
                <Button rightIcon={<Icon icon="internalLink" size={4} />} onClick={goToVertiportResource}>
                    {t("missionAssignments.goToResource")}
                </Button>
                <Button
                    type="submit"
                    form="missionAssignmentAircraftForm"
                    leftIcon={assignPadState === "pending" ? <Spinner /> : <Icon icon="check" size={4} />}
                    size="lg"
                    variant="primary"
                    isDisabled={selectedPads === "" || assignPadState === "pending"}
                    onClick={onSubmit}
                >
                    {t("buttons.assign")}
                </Button>
            </Flex>
        </>
    );
};
