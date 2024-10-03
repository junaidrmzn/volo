import {
    Box,
    Button,
    Divider,
    Flex,
    HStack,
    Icon,
    RadioGroup,
    Spinner,
    Switch,
    Text,
    VStack,
} from "@volocopter/design-library-react";
import { match } from "ts-pattern";
import { Mission } from "@voloiq/network-schedule-management-api/v1";
import { FilterBar } from "@voloiq/network-scheduling-components";
import { useMissionTranslations } from "../../../translations/useMissionTranslations";
import { PilotCard } from "./PilotCard";
import { useMissionPilotAssignment } from "./useMissionPilotAssignment";
import { usePilotFilterProperties } from "./usePilotFilterProperties";

type MissionPilotAssignmentProps = {
    mission: Mission;
    onReloadList: () => void;
    onClose: () => void;
};

export const MissionPilotAssignment = (props: MissionPilotAssignmentProps) => {
    const { mission, onReloadList, onClose } = props;
    const { t } = useMissionTranslations();
    const {
        onSubmit,
        pilots,
        setSelectedPilot,
        selectedPilot,
        toggleState,
        setToggleState,
        startDate,
        endDate,
        handleFilterChange,
        state,
    } = useMissionPilotAssignment({
        mission,
        onReloadList,
        onClose,
    });

    const { properties } = usePilotFilterProperties();

    const handlePilotSelection = (value: string) => {
        setSelectedPilot(value);
    };

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
                            aria-label={t("aircrafAssignment.toggleLabel")}
                            isChecked={toggleState}
                            onChange={(event) =>
                                event.target.checked ? setToggleState(event.target.checked) : setToggleState(false)
                            }
                        />
                        <Text fontSize="xs" lineHeight={6}>
                            {t("aircrafAssignment.conflictToggle")}
                        </Text>
                    </HStack>
                </VStack>

                <Divider />
                <RadioGroup onChange={handlePilotSelection} value={selectedPilot}>
                    {match(state)
                        .with("success", () =>
                            pilots.length > 0 ? (
                                <Box overflowY="scroll" maxH="50vh">
                                    {pilots.map((pilot) => (
                                        <PilotCard
                                            key={pilot.id}
                                            pilot={pilot}
                                            startDate={startDate}
                                            endDate={endDate}
                                            reservationSlotStartDate={mission.crewReservationStartDateTime}
                                            reservationSlotEndDate={mission.crewReservationEndDateTime}
                                            synchronizedWithLeon={pilot.synchronizedWithLeon}
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
                </RadioGroup>
            </Box>
            <Flex justifyContent="flex-end" mt={4}>
                <Button
                    type="submit"
                    leftIcon={<Icon icon="cornerDownRight" size={4} />}
                    size="lg"
                    variant="primary"
                    isDisabled={selectedPilot === ""}
                    onClick={onSubmit}
                >
                    {t("buttons.assign")}
                </Button>
            </Flex>
        </>
    );
};
