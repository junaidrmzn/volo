import { Box, HStack, Icon, Text, VStack } from "@volocopter/design-library-react";
import { StatusOfMission } from "@voloiq-typescript-api/network-scheduling-types";
import { Mission } from "@voloiq/network-schedule-management-api/v1";
import { TagWithTooltip } from "@voloiq/network-scheduling-components";
import { SynchronizedWithLeonTag } from "../SynchronizedWithLeonTag";
import { useMissionTranslations } from "../translations/useMissionTranslations";
import { MissionDates } from "./MissionDates";
import { MissionStatusTag } from "./MissionStatusTag";
import { ActionsPopover } from "./mission-actions-popover/ActionsPopover";
import { ActionsPopoverProvider } from "./mission-actions-popover/popover-context/ActionsPopoverProvider";

export type MissionListItemTitleProps = {
    mission: Mission;
    onReloadList: () => void;
    onExpandItem: React.Dispatch<React.SetStateAction<string[]>>;
    expandedItems: string[];
};

const toggleItemInArray = (array: string[], item: string) => {
    if (array.includes(item)) {
        return array.filter((existingItem) => existingItem !== item);
    }
    return [...array, item];
};

export const MissionListItemTitle = (props: MissionListItemTitleProps) => {
    const { mission, onExpandItem, expandedItems } = props;
    const { t } = useMissionTranslations();
    const {
        id,
        flightNumber,
        assignments,
        arrivalVertiportCode,
        actualArrivalVertiportCode,
        departureVertiportCode,
        statusOfMission,
        missionConflicts,
        synchronizedWithLeon,
        cancellationDescription,
    } = mission;

    const handleCardToggle = () => {
        onExpandItem(toggleItemInArray(expandedItems, id));
    };
    return (
        <HStack spacing={3} boxSize="full" width="100%" alignItems="flex-start" onClick={handleCardToggle}>
            <HStack spacing={6} flex={1}>
                <VStack spacing={0} alignItems="flex-start">
                    <HStack>
                        <Box fontWeight="bold" fontSize="md" lineHeight="short" mr={1} marginBottom={1}>
                            {flightNumber}
                        </Box>
                        <MissionStatusTag
                            aircraftTechnicalStatus={assignments?.aircraftTechnicalStatus}
                            statusOfMission={statusOfMission}
                            mBStatus={missionConflicts ?? undefined}
                        />
                    </HStack>
                    <HStack>
                        <Text fontSize="sm">{departureVertiportCode}</Text>
                        <Icon icon="arrowRight" size={4} marginLeft={2} marginRight={2} />
                        <Text fontSize="sm" as={statusOfMission === StatusOfMission.DIVERTED ? "s" : "samp"}>
                            {arrivalVertiportCode}
                        </Text>
                        {statusOfMission === StatusOfMission.DIVERTED && (
                            <>
                                <Icon color="red.500" icon="warning" size={4} />
                                <Text fontSize="sm" color="red.500">
                                    {actualArrivalVertiportCode}
                                </Text>
                            </>
                        )}
                    </HStack>
                    <MissionDates mission={mission} />
                </VStack>
            </HStack>
            <VStack spacing={0} alignItems="flex-end" alignContent="flex-start">
                <HStack spacing={3} flex={1}>
                    {synchronizedWithLeon && <SynchronizedWithLeonTag />}
                    <TagWithTooltip
                        placement="top"
                        colorScheme="blue"
                        tooltipLabel={cancellationDescription && `${t("Reason")}: ${cancellationDescription}`}
                        tagContent={statusOfMission}
                    />
                    <ActionsPopoverProvider>
                        <ActionsPopover {...props} />
                    </ActionsPopoverProvider>
                </HStack>
            </VStack>
        </HStack>
    );
};
