import { Flex, HStack, Icon, Text, VStack } from "@volocopter/design-library-react";
import { differenceInSeconds } from "date-fns";
import { useFormatDateTime } from "@voloiq/dates";
import { formatDuration } from "@voloiq/utils";

type HomebaseSectionProps = {
    departureVertiportCode?: string;
    estimatedDepartureDateTime?: string;
    arrivalVertiportCode?: string;
    estimatedArrivalDateTime?: string;
};

export const HomebaseSection = (props: HomebaseSectionProps) => {
    const { departureVertiportCode, estimatedDepartureDateTime, arrivalVertiportCode, estimatedArrivalDateTime } =
        props;

    const { formatTime, formatDate } = useFormatDateTime();
    const flightDifferenceInSeconds = differenceInSeconds(
        new Date(estimatedArrivalDateTime ?? ""),
        new Date(estimatedDepartureDateTime ?? "")
    );
    return (
        <Flex width="100%" gap={1} alignItems="center" justifyContent="space-between">
            <HStack width="100%" justifyContent="space-between" spacing={0}>
                <VStack alignItems="flex-start" pr={0.5}>
                    <Text fontSize="xs" fontWeight="semibold" lineHeight={6}>
                        {departureVertiportCode}
                    </Text>
                    <Text fontSize="xs" fontWeight="normal" lineHeight={6}>
                        {estimatedDepartureDateTime ? formatTime(estimatedDepartureDateTime) : "-"}
                    </Text>
                </VStack>
                <VStack>
                    <Icon icon="arrowRight" size={6} />
                    <Text fontSize="xs" fontWeight="normal" lineHeight={6} overflow="hidden" textOverflow="ellipsis">
                        {`${estimatedDepartureDateTime && formatDate(estimatedDepartureDateTime)} • `}
                        {formatDuration(flightDifferenceInSeconds)}
                    </Text>
                </VStack>
                <VStack alignItems="flex-end" pl={0.5}>
                    <Text fontSize="xs" lineHeight={6} fontWeight="semibold">
                        {arrivalVertiportCode}
                    </Text>
                    <Text fontSize="xs" fontWeight="normal" lineHeight={6}>
                        {estimatedArrivalDateTime ? formatTime(estimatedArrivalDateTime) : "-"}
                    </Text>
                </VStack>
            </HStack>
        </Flex>
    );
};
