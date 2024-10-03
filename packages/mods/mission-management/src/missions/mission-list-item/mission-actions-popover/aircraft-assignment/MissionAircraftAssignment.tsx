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
import { AircraftCard } from "./AircraftCard";
import { useAircraftFilterPropterties } from "./useAircraftFilterProperties";
import { useMissionAircraftAssignment } from "./useMissionAircraftAssignment";

type MissionAircraftAssignmentProps = {
    mission: Mission;
    onReloadList: () => void;
    onClose: () => void;
};

export const MissionAircraftAssignment = (props: MissionAircraftAssignmentProps) => {
    const { mission, onReloadList, onClose } = props;
    const { t } = useMissionTranslations();
    const {
        onSubmit,
        aircrafts,
        setSelectedAircraft,
        selectedAircraft,
        toggleState,
        setToggleState,
        startDate,
        endDate,
        handleFilterChange,
        state,
    } = useMissionAircraftAssignment({
        mission,
        onReloadList,
        onClose,
    });

    const { properties } = useAircraftFilterPropterties();

    const handleAircraftSelection = (value: string) => {
        setSelectedAircraft(value);
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
                <RadioGroup onChange={handleAircraftSelection} value={selectedAircraft}>
                    {match(state)
                        .with("success", () =>
                            aircrafts.length > 0 ? (
                                <Box overflowY="scroll" maxH="50vh">
                                    {aircrafts.map((aircraft) => (
                                        <AircraftCard
                                            key={aircraft.aircraftId}
                                            aircraft={aircraft}
                                            startDate={startDate}
                                            endDate={endDate}
                                            reservationSlotStartDate={mission.aircraftReservationStartDateTime}
                                            reservationSlotEndDate={mission.aircraftReservationEndDateTime}
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
                    form="missionAssignmentAircraftForm"
                    leftIcon={<Icon icon="check" size={4} />}
                    size="lg"
                    variant="primary"
                    isDisabled={selectedAircraft === ""}
                    onClick={onSubmit}
                >
                    {t("buttons.assign")}
                </Button>
            </Flex>
        </>
    );
};
