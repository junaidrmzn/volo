import { Box, HStack, Spacer, Stack, Tag, Text } from "@volocopter/design-library-react";
import { useEventCardResize } from "@voloiq/time-scheduler";
import type { Pad, PadEvent } from "@voloiq/vertiport-management-api/v1";
import { ActionsPopover } from "./event-actions-popover/ActionsPopover";
import { ActionsPopoverProvider } from "./event-actions-popover/popover-context/ActionsPopoverProvider";

type PadAvailabilityCardProps = {
    event: PadEvent;
    pad: Pad;
};

export const PadAvailabilityCard = (props: PadAvailabilityCardProps) => {
    const { event, pad } = props;

    const { isStatusBoxVisible, isTitleVisible, isSubtitleVisible, isOptionsIconVisible, outerStackRef } =
        useEventCardResize();

    return (
        <Stack ref={outerStackRef}>
            <HStack width="100%" height="100%" bg="gray.100" borderRadius="sm">
                <Box bg="darkBlue.300" width="5px" borderLeftRadius="sm" height="100%" />
                <Stack pl={5}>
                    <Stack>
                        {isTitleVisible && (
                            <Text fontSize="sm" lineHeight="short" fontWeight="bold">
                                {event.title}
                            </Text>
                        )}
                        {isSubtitleVisible && (
                            <Stack>
                                <Text size="sm">{event.subTitle}</Text>
                            </Stack>
                        )}
                    </Stack>
                </Stack>
                <Spacer />
                {isStatusBoxVisible && (
                    <Box alignItems="self-end" pr={5}>
                        <Tag colorScheme="error-subtle">
                            <Tag.Label variant="light">{event.type}</Tag.Label>
                        </Tag>
                    </Box>
                )}
                {isOptionsIconVisible && (
                    <Box pr={5}>
                        <ActionsPopoverProvider>
                            <ActionsPopover padEvent={event} pad={pad} />
                        </ActionsPopoverProvider>
                    </Box>
                )}
            </HStack>
        </Stack>
    );
};
