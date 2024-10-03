import { HStack, Text, VStack } from "@volocopter/design-library-react";
import { ReactNode } from "react";
import { match } from "ts-pattern";
import { Content, Header, getCompoundComponentChildrenFactory } from "./sectionCardCompoundComponents";

export type SectionCardProps = {
    children: ReactNode;
    variant?: "compact" | "default";
    id?: string;
};

export const SectionCardTemplate = (props: SectionCardProps) => {
    const { children, variant = "default", id } = props;

    const { backgroundColor, spacing } = match(variant)
        .with("compact", () => ({ backgroundColor: "bgNavigationLayer2", spacing: 3 }))
        .with("default", () => ({ backgroundColor: "bgNavigationLayer1", spacing: 1.5 }))
        .exhaustive();
    const getCompoundComponentChildren = getCompoundComponentChildrenFactory(children);
    const header = getCompoundComponentChildren(Header);
    const content = getCompoundComponentChildren(Content);

    return (
        <VStack
            w="full"
            p={3}
            alignItems="flex-start"
            borderRadius="md"
            backgroundColor={backgroundColor}
            spacing={spacing}
            id={id}
        >
            {typeof header === "string" ? (
                <HStack w="full" spacing={0} alignItems="flex-start">
                    <Text lineHeight={6} fontWeight="light" fontSize="md">
                        {header}
                    </Text>
                </HStack>
            ) : (
                header
            )}
            {content}
        </VStack>
    );
};

export const SectionCard = Object.assign(SectionCardTemplate, {
    Header,
    Content,
});
