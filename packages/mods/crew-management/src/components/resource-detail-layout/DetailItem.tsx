import { Box, Checkbox, HStack, Text, VStack } from "@volocopter/design-library-react";
import React from "react";
import { match } from "ts-pattern";

export type DetailItemProps = {
    label: string;
    value?: string | number | string[] | boolean;
};

export const DetailItem: FCC<DetailItemProps> = (props) => {
    const { label, value } = props;

    const detailView = match(value)
        .when(
            () => Array.isArray(value),
            () => (
                <VStack align="flex-end" spacing={0}>
                    {Array.isArray(value) && value?.map((entry) => <Text key={entry}>{entry}</Text>)}
                </VStack>
            )
        )
        .when(
            () => typeof value === "boolean",
            () => (
                <Box>
                    <Checkbox paddingLeft={2} verticalAlign="bottom" isReadOnly isDisabled isChecked={Boolean(value)} />
                </Box>
            )
        )
        .otherwise(() => (
            <VStack align="flex-end" spacing={0} maxWidth="max-content">
                <Text textAlign="end">{value}</Text>
            </VStack>
        ));

    return (
        <HStack w="full" justifyContent="space-between" align="flex-start">
            <Text whiteSpace="nowrap">{label}:</Text>
            {detailView}
        </HStack>
    );
};
