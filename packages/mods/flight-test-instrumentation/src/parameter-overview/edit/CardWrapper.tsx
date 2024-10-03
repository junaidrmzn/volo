import { Box } from "@volocopter/design-library-react";
import { ReactNode } from "react";

export type CardWrapperProps = {
    children: ReactNode;
};

export const CardWrapper = (props: CardWrapperProps) => {
    const { children } = props;
    return (
        <Box
            mt={4}
            p={4}
            borderWidth="thin"
            borderColor="decorative1Muted"
            borderRadius="sm"
            backgroundColor="bgContentLayer"
        >
            {children}
        </Box>
    );
};
