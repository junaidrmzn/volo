import type { FlexProps, TextProps } from "@volocopter/design-library-react";
import { Flex, Spacer, Text } from "@volocopter/design-library-react";

export type SectionHeaderProps = {
    label: string;
    badge?: React.ReactNode;
    /**
     * line intend on the left side
     */
    indented?: boolean;
    fontSize?: TextProps["fontSize"];
} & FlexProps;

export const SectionHeader: FCC<SectionHeaderProps> = (props) => {
    const { badge, children, label, indented = false, fontSize = "sm", ...flexProps } = props;
    return (
        <Flex
            borderBottom="2px"
            borderBottomColor="blue50Mono800"
            pl={indented ? 4 : "unset"}
            boxSize="full"
            py={1.5}
            {...flexProps}
            gap="4"
        >
            <Text
                fontSize={fontSize}
                lineHeight={6}
                size="medium"
                fontWeight="bold"
                color="fontOnBgBasic"
                height="fit-content"
                alignSelf="end"
            >
                {label}
            </Text>
            {badge}
            <Spacer />
            {children}
        </Flex>
    );
};
