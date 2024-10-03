import { Box } from "@volocopter/design-library-react";
import { useScheduleColors } from "../useScheduleColors";

export type ExpandedEventItemProps = {
    itemCount: number;
    isBlockedForMission?: boolean;
};
export const ExpandedEventItem = (props: ExpandedEventItemProps) => {
    const { itemCount, isBlockedForMission } = props;
    const { expandedEventBackgroundColor, eventBackgroundColor } = useScheduleColors();
    const backgroundImage = `repeating-linear-gradient(120deg, rgba(0,0,0,0.4), rgba(0,0,0,0.4) 0.5rem, transparent 0.5rem, transparent 0.75rem)`;

    return (
        <Box
            bg={expandedEventBackgroundColor}
            p={1}
            whiteSpace="nowrap"
            boxSize="full"
            color="darkBlue.900"
            borderRadius="sm"
            position="relative"
            _before={{
                content: `""`,
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                width: "10px",
                background: "monochrome.300",
                backgroundImage: isBlockedForMission ? backgroundImage : undefined,
            }}
        >
            <Box
                background={eventBackgroundColor}
                position="absolute"
                top={-2}
                right={-2}
                borderRadius="full"
                fontWeight="bold"
                px={1}
                fontSize="sm"
            >
                {itemCount}
            </Box>
            &nbsp;
        </Box>
    );
};
