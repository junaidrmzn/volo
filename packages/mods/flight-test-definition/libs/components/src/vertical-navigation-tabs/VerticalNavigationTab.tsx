import { AlertStatusIcon, Tab, Text } from "@volocopter/design-library-react";
import { ReactNode } from "react";

export type VerticalNavigationTabProps = {
    children: ReactNode;
    id: string;
    parentId?: string;
    isDisabled?: boolean;
    hasError?: boolean;
};
export const VerticalNavigationTab = (props: VerticalNavigationTabProps) => {
    const { children, id, parentId, isDisabled, hasError } = props;
    return (
        <Tab id={id} isDisabled={isDisabled} ml={parentId ? 5 : 0}>
            <Text as="span" fontWeight={600} fontSize="sm">
                {hasError && <AlertStatusIcon variant="error" size={4} mr={3} />}
                {children}
            </Text>
        </Tab>
    );
};
