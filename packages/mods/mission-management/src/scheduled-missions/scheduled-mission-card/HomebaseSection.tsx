import { Flex, HStack, Icon, Text, VStack } from "@volocopter/design-library-react";
import { differenceInSeconds } from "date-fns";
import { useFormatDateTime } from "@voloiq/dates";
import { ShortInfoMission } from "@voloiq/network-schedule-management-api/v1";
import { formatDuration } from "@voloiq/utils";

type HomebaseSectionProps = {
    mission: ShortInfoMission;
};

export const HomebaseSection = (props: HomebaseSectionProps) => {
    const { mission } = props;
    const { formatTime, formatDate } = useFormatDateTime();
    const flightDifferenceInSeconds = differenceInSeconds(
        new Date(mission.estimatedArrivalDateTime ?? ""),
        new Date(mission.estimatedDepartureDateTime ?? "")
    );
    return (
        <Flex width="100%" gap={1} alignItems="center" justifyContent="space-between">
            <HStack width="100%" justifyContent="space-between">
                <VStack>
                    <Text fontSize="xs" fontWeight="bold" lineHeight={6}>
                        {mission.departureVertiportCode}
                    </Text>
                    <Text fontSize="xs" fontWeight="normal" lineHeight={6}>
                        {mission?.estimatedDepartureDateTime ? formatTime(mission?.estimatedDepartureDateTime) : "-"}
                    </Text>
                </VStack>
                <VStack>
                    <Icon icon="arrowRight" size={6} />
                    <Text fontSize="xs" fontWeight="normal" lineHeight={6} overflow="hidden" textOverflow="ellipsis">
                        {`${mission.estimatedDepartureDateTime && formatDate(mission.estimatedDepartureDateTime)} •`}
                        {formatDuration(flightDifferenceInSeconds)}
                    </Text>
                </VStack>
                <VStack>
                    <Text fontSize="xs" lineHeight={6} fontWeight="bold">
                        {mission.arrivalVertiportCode}
                    </Text>
                    <Text fontSize="xs" fontWeight="normal" lineHeight={6}>
                        {mission.estimatedArrivalDateTime ? formatTime(mission.estimatedArrivalDateTime) : "-"}
                    </Text>
                </VStack>
            </HStack>
        </Flex>
    );
};
