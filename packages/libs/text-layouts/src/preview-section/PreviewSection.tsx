import type { BoxProps } from "@volocopter/design-library-react";
import { Box, Grid, GridItem } from "@volocopter/design-library-react";
import type { ReactNode } from "react";
import { TextWithLabel } from "../text-with-label";
import { SectionHeader } from "./SectionHeader";

export type PreviewSectionProps = {
    headerLabel: string;
    headerBadge?: ReactNode;
    templateColumns?: string;
} & BoxProps;

export const PreviewSection = (props: PreviewSectionProps) => {
    const { headerLabel, headerBadge, children, templateColumns = "1fr 1fr" } = props;
    return (
        <Box boxSize="full">
            <SectionHeader label={headerLabel} badge={headerBadge} mb="3" />
            <Grid templateColumns={templateColumns} gridGap="3" gridRowGap="3" boxSize="full" mt="unset">
                {children}
            </Grid>
        </Box>
    );
};

export type PreviewSectionItemProps = {
    label: string;
    text: string | ReactNode | undefined;
    fullWidth?: boolean;
};

export const PreviewSectionItem = (props: PreviewSectionItemProps) => {
    const { label, text, fullWidth } = props;
    return (
        <GridItem gridColumn={fullWidth ? "1 / -1" : "unset"}>
            <TextWithLabel label={label} text={text} />
        </GridItem>
    );
};
