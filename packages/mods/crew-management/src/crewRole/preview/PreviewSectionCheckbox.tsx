import { Box, Checkbox, GridItem, Stack, Text } from "@volocopter/design-library-react";
import React from "react";

export type PreviewSectionCheckboxProps = {
    label: string;
    isChecked: boolean;
};

export const PreviewSectionCheckbox = (props: PreviewSectionCheckboxProps) => {
    const { label, isChecked } = props;

    return (
        <GridItem gridColumn="unset">
            <Stack spacing="0">
                <Text size="small" lineHeight="double" fontWeight="bold" color="fontOnBgMuted">
                    {label}
                </Text>
                <Box>
                    <Checkbox paddingLeft={0} verticalAlign="bottom" isReadOnly isDisabled isChecked={isChecked} />
                </Box>
            </Stack>
        </GridItem>
    );
};
