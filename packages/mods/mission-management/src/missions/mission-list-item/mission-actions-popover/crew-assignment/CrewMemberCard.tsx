import {
    Card,
    Checkbox,
    Flex,
    FormControl,
    FormLabel,
    HStack,
    Select,
    Tag,
    Text,
    VStack,
} from "@volocopter/design-library-react";
import type { CrewMemberWithReservations } from "@voloiq-typescript-api/crew-api-types";
import type { CrewMemberAssignment } from "@voloiq-typescript-api/network-scheduling-types/dist";
import type { SelectOption } from "@voloiq/form";
import { ReservationTimeGrid } from "@voloiq/network-scheduling-components";
import { SynchronizedWithLeonTag } from "../../../SynchronizedWithLeonTag";
import { useMissionTranslations } from "../../../translations/useMissionTranslations";
import { getPilotName } from "../../getPilotName";

export type CrewMemberCardProps = {
    crewMember: CrewMemberWithReservations;
    startDate: Date;
    endDate: Date;
    reservationSlotStartDate: string;
    reservationSlotEndDate: string;
    selectedCrewMembers?: CrewMemberAssignment[];
    handleCrewMemberSelection: (crewMemberId: string, isChecked: boolean) => void;
    handleRoleSelection: (crewMemberId: string, crewMemberRole: string) => void;
};

export const CrewMemberCard = (props: CrewMemberCardProps) => {
    const {
        crewMember,
        startDate,
        endDate,
        reservationSlotEndDate,
        reservationSlotStartDate,
        selectedCrewMembers,
        handleCrewMemberSelection,
        handleRoleSelection,
    } = props;
    const {
        available,
        id,
        firstName,
        middleName,
        surName,
        email,
        flightHours,
        reservations,
        roleAssignments,
        synchronizedWithLeon,
    } = crewMember;
    const { t } = useMissionTranslations();
    const selectedCrewMember = selectedCrewMembers?.find((index) => index.crewMemberId === id);
    const selectedRole: SelectOption = {
        label: selectedCrewMember?.crewMemberRole,
        value: selectedCrewMember?.crewMemberRole ?? "",
    };

    const availabilityStatus = available ? t("available") : t("unavailable");
    const crewMemberName = {
        pilotFirstName: firstName,
        pilotMiddleName: middleName,
        pilotSurName: surName,
    };
    return (
        <Card px={2} py={2} my={3}>
            <Flex borderRadius="sm">
                <HStack width="50%" alignItems="flex-start">
                    <Checkbox
                        mt={1}
                        isChecked={Boolean(selectedCrewMember)}
                        onChange={(event) => {
                            handleCrewMemberSelection(id, event.target.checked);
                        }}
                        size="sm"
                        aria-label={`crewMember-${id}`}
                    />
                    <VStack spacing={0} alignItems="flex-start">
                        <HStack>
                            <Text fontSize="sm" lineHeight={6}>
                                {getPilotName(crewMemberName)}
                            </Text>
                            {synchronizedWithLeon && <SynchronizedWithLeonTag />}
                        </HStack>
                        <Text fontSize="sm" lineHeight={6}>
                            {email}
                        </Text>
                    </VStack>
                </HStack>
                <HStack alignItems="flex-end" width="50%" justifyContent="flex-end">
                    <VStack spacing={0} alignItems="flex-end">
                        <Tag colorScheme="blue">
                            <Tag.Label variant="light">{availabilityStatus}</Tag.Label>
                        </Tag>
                        <Text fontSize="sm" lineHeight={6}>
                            {t("crewAssignment.reservedTime", { time: flightHours })}
                        </Text>
                    </VStack>
                </HStack>
            </Flex>
            <VStack py="4">
                <ReservationTimeGrid
                    startDate={startDate}
                    endDate={endDate}
                    reservedSlots={reservations}
                    reservationSlotStartDate={reservationSlotStartDate}
                    reservationSlotEndDate={reservationSlotEndDate}
                />
            </VStack>
            <VStack mt={2}>
                <FormControl isDisabled={!selectedCrewMember} isRequired>
                    <FormLabel>{t("crewAssignment.roleLabel")}</FormLabel>
                    <Select
                        id="selectedRole"
                        placeholder={t("crewAssignment.rolePlaceholder")}
                        value={selectedRole}
                        options={roleAssignments?.map((role) => ({ label: role, value: role }))}
                        onChange={(option) => {
                            if (option?.value) handleRoleSelection(id, option.value);
                        }}
                    />
                </FormControl>
            </VStack>
        </Card>
    );
};
