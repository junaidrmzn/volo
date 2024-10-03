import { GridItem, Text } from "@volocopter/design-library-react";
import React from "react";

type PreviewSectionSubheaderProps = {
    text: String;
};

export const PreviewSectionSubheader = (props: PreviewSectionSubheaderProps) => {
    const { text } = props;
    return (
        <GridItem gridColumn="1 / -1">
            <Text
                fontSize="xs"
                lineHeight="1.5rem"
                size="medium"
                fontWeight="bold"
                color="blue500Mono500"
                height="fit-content"
                alignSelf="end"
            >
                {text}
            </Text>
        </GridItem>
    );
};
