import { Box } from "@volocopter/design-library-react";

export type ExpandedEventItemProps = {
    itemCount: number;
};
export const ExpandedEventItem = (props: ExpandedEventItemProps) => {
    const { itemCount } = props;

    return (
        <Box
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
            }}
        >
            <Box
                background="mono500Gray750"
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
