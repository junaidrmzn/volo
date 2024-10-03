import {
    Box,
    Button,
    Divider,
    Flex,
    HStack,
    Icon,
    Spinner,
    Switch,
    Text,
    VStack,
} from "@volocopter/design-library-react";
import { match } from "ts-pattern";
import { Mission } from "@voloiq/network-schedule-management-api/v1";
import { FilterBar } from "@voloiq/network-scheduling-components";
import { useMissionTranslations } from "../../../translations/useMissionTranslations";
import { CrewMemberCard } from "./CrewMemberCard";
import { useTestCrewAssignment } from "./useTestCrewAssignment";
import { useTestCrewFilterPropterties } from "./useTestCrewFilterProperties";

export type MissionTestCrewAssignmentProps = {
    mission: Mission;
    onReloadList: () => void;
    onClose: () => void;
};
export const MissionTestCrewAssignment = (props: MissionTestCrewAssignmentProps) => {
    const { mission, onReloadList, onClose } = props;

    const { t } = useMissionTranslations();
    const {
        onSubmit,
        crewMembers,
        handleCrewMemberSelection,
        handleRoleSelection,
        selectedCrewMembers,
        toggleState,
        setToggleState,
        startDate,
        endDate,
        handleFilterChange,
        state,
    } = useTestCrewAssignment({
        mission,
        onReloadList,
        onClose,
    });

    const { properties } = useTestCrewFilterPropterties();

    return (
        <>
            <Box bg="monochrome.200" p={3} borderRadius="sm">
                <VStack alignItems="stretch" width="full" pb={2}>
                    <FilterBar properties={properties} onFilterChange={handleFilterChange} />
                </VStack>
                <VStack alignItems="stretch" width="full" spacing={0} pb={3}>
                    <HStack spacing={1}>
                        <Switch
                            py="1px"
                            aria-label={t("crewAssignment.toggleLabel")}
                            isChecked={toggleState}
                            onChange={(event) =>
                                event.target.checked ? setToggleState(event.target.checked) : setToggleState(false)
                            }
                        />
                        <Text fontSize="xs" lineHeight={6}>
                            {t("crewAssignment.conflictToggle")}
                        </Text>
                    </HStack>
                </VStack>

                <Divider />
                {match(state)
                    .with("success", () =>
                        crewMembers.length > 0 ? (
                            <Box overflowY="scroll" maxH="50vh">
                                {crewMembers.map((crewMember) => (
                                    <CrewMemberCard
                                        key={crewMember.id}
                                        selectedCrewMembers={selectedCrewMembers}
                                        handleCrewMemberSelection={handleCrewMemberSelection}
                                        handleRoleSelection={handleRoleSelection}
                                        crewMember={crewMember}
                                        startDate={startDate}
                                        endDate={endDate}
                                        reservationSlotStartDate={mission.crewReservationStartDateTime}
                                        reservationSlotEndDate={mission.crewReservationEndDateTime}
                                    />
                                ))}
                            </Box>
                        ) : (
                            <Text py={2} color="red.500" size="sm">
                                {t("noFilteredResourceFound")}
                            </Text>
                        )
                    )
                    .with("idle", "pending", () => (
                        <VStack my={6} justifyContent="center" alignItems="center" width="100%">
                            <Spinner />
                        </VStack>
                    ))
                    .with("error", () => (
                        <Text py={2} color="red.500" size="sm">
                            {t("An error occurred")}
                        </Text>
                    ))
                    .exhaustive()}
            </Box>
            <Flex justifyContent="flex-end" mt={4}>
                <Button
                    type="submit"
                    form="missionAssignmentCrewForm"
                    leftIcon={<Icon icon="check" size={4} />}
                    size="lg"
                    variant="primary"
                    isDisabled={
                        selectedCrewMembers.length <= 0 ||
                        selectedCrewMembers.some((member) => member.crewMemberRole === undefined)
                    }
                    onClick={onSubmit}
                >
                    {t("buttons.assign")}
                </Button>
            </Flex>
        </>
    );
};
