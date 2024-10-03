import { Box, Text } from "@volocopter/design-library-react";
import { ReactNode } from "react";

type PageProps = {
    children: ReactNode;
    pageNumber: number;
    totalPages: number;
    width?: string;
    height?: string;
};

export const Page = (props: PageProps) => {
    const { children, pageNumber, width = "21cm", height = "29.7cm", totalPages } = props;

    return (
        <Box
            className="page"
            style={{
                width,
                height,
                margin: "0 auto",
                padding: "2.5cm",
                position: "relative",
                pageBreakAfter: "always",
                backgroundColor: "white",
            }}
        >
            <Box height="inherit">{children}</Box>
            <Box position="absolute" bottom={5} right={5}>
                <Text fontSize="sm">
                    Page {pageNumber} of {totalPages}
                </Text>
            </Box>
        </Box>
    );
};
