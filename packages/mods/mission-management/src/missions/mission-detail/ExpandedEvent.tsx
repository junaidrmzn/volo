import { Box } from "@volocopter/design-library-react";

export type ExpandedEventProps = {
    itemCount: number;
};
export const ExpandedEvent = (props: ExpandedEventProps) => {
    const { itemCount } = props;
    return (
        <Box
            bg="gray.200"
            p={1}
            whiteSpace="nowrap"
            width="100%"
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
                background: "gray.300",
            }}
        >
            <Box
                background="gray.100"
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
