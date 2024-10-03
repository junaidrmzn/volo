import { Box, useColorModeValue } from "@volocopter/design-library-react";

type SidebarProps = {
    w?: string;
};
export const Sidebar: FCC<SidebarProps> = (props) => {
    const { children, w } = props;
    const backgroundColor = useColorModeValue("white", "gray.900");

    return (
        <Box
            position="relative"
            w={w || "350px"}
            overflow="hidden"
            overflowY="auto"
            h="100%"
            backgroundColor={backgroundColor}
        >
            {children}
        </Box>
    );
};
