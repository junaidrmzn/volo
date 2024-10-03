import { Box, Checkbox, HStack, VStack, useDisclosure } from "@volocopter/design-library-react";
import type { ReactNode } from "react";
import { ExpandableSelectableCardChevronIcon } from "./ExpandableSelectableCardChevronIcon";
import { ExpandableSelectableCardContent } from "./ExpandableSelectableCardContent";
import { Content, Title, getCompoundComponentChildrenFactory } from "./expandableSelectableCardCompoundComponents";

type IsSelectableProps = {
    isSelectable: true;
    selectState: "selected" | "unselected" | "indeterminate";
    onChange: (isSelected: boolean) => void;
    checkboxLabel: string;
};
type IsNotSelectableProps = {
    isSelectable?: never;
    selectState?: never;
    onChange?: never;
    checkboxLabel?: never;
};

export type ExpandableSelectableCardProps = {
    cardLabel: string;
    children: ReactNode;
    defaultIsOpen?: boolean;
} & (IsSelectableProps | IsNotSelectableProps);

export const ExpandableSelectableCardTemplate = (props: ExpandableSelectableCardProps) => {
    const { children, defaultIsOpen = false, isSelectable, cardLabel, onChange, selectState, checkboxLabel } = props;

    const getCompoundComponentChildren = getCompoundComponentChildrenFactory(children);
    const title = getCompoundComponentChildren(Title);
    const content = getCompoundComponentChildren(Content);

    const { isOpen, onToggle } = useDisclosure({ defaultIsOpen });

    return (
        <VStack backgroundColor="gray100Gray900" alignItems="stretch" px={3} py={2} borderRadius="sm" spacing={0}>
            <HStack spacing={0}>
                <HStack flex={1} spacing={2} as="button" onClick={onToggle} alignItems="center" aria-label={cardLabel}>
                    {isSelectable && (
                        <Checkbox
                            py={1}
                            size="sm"
                            aria-label={checkboxLabel}
                            isChecked={selectState === "selected"}
                            isIndeterminate={selectState === "indeterminate"}
                            onChange={(event) => onChange?.(event.target.checked)}
                        />
                    )}
                    <ExpandableSelectableCardChevronIcon isOpen={isOpen} />
                    <Box flex={1}>{title}</Box>
                </HStack>
            </HStack>
            <ExpandableSelectableCardContent isOpen={isOpen}>{content}</ExpandableSelectableCardContent>
        </VStack>
    );
};

export const ExpandableSelectableCard = Object.assign(ExpandableSelectableCardTemplate, {
    Title,
    Content,
});
