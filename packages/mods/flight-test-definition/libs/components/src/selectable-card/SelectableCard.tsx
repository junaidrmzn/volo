import { Box, Checkbox, HStack } from "@volocopter/design-library-react";
import type { ReactNode } from "react";

export type SelectableCardProps = {
    isSelected?: boolean;
    onSelect: (isSelected: boolean) => void;
    children: ReactNode;
    checkboxLabel: string;
};

export const SelectableCard = (props: SelectableCardProps) => {
    const { children, isSelected, onSelect, checkboxLabel } = props;

    return (
        <HStack backgroundColor="gray100Gray900" px={6} py={3} borderRadius="sm" spacing={3}>
            <Checkbox
                size="sm"
                aria-label={checkboxLabel}
                isChecked={isSelected}
                onChange={(event) => onSelect(event.target.checked)}
            />
            <Box flex={1}>{children}</Box>
        </HStack>
    );
};
