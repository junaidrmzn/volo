import type { TextProps } from "@volocopter/design-library-react";
import { Box, Text, VStack } from "@volocopter/design-library-react";
import type { ReactElement, ReactNode } from "react";
import { Children, cloneElement, isValidElement } from "react";
import { match } from "ts-pattern";

export type OverviewGroupProps = {
    groupName?: string;
    children: ReactNode;
    level?: number;
};

export const OverviewGroup = (props: OverviewGroupProps) => {
    const { children, groupName, level = 1 } = props;

    const textProps: TextProps = match(level)
        .with(1, () => ({
            fontSize: "sm",
            fontWeight: "bold",
            borderTopWidth: 2,
            borderBottomWidth: 2,
        }))
        .otherwise(() => ({
            fontSize: "xs",
            fontWeight: "normal",
            borderBottomWidth: 1,
            paddingLeft: `${(5 * (level - 1) + 3) / 4}rem`,
        }));

    const childrenWithInferredLevel = Children.toArray(children)
        .filter<ReactElement>(isValidElement)
        .map((child) => {
            if (child.type === OverviewGroup) {
                return cloneElement(child, {
                    level: level + 1,
                });
            }
            return child;
        });

    return (
        <VStack boxSize="full" alignItems="stretch" spacing={0}>
            {groupName && (
                <Text lineHeight={6} borderColor="blue50Mono800" paddingY={1} paddingX={3} {...textProps}>
                    {groupName}
                </Text>
            )}
            <Box>{childrenWithInferredLevel}</Box>
        </VStack>
    );
};
