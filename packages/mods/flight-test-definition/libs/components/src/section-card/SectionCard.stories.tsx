import type { Meta, StoryFn } from "@storybook/react";
import { Center, Text } from "@volocopter/design-library-react";
import type { SectionCardProps } from "./SectionCard";
import { SectionCard } from "./SectionCard";

const meta: Meta = {
    title: "Flight Test Definition/Components/Section Card",
    component: SectionCard,
    parameters: {
        actions: { argTypesRegex: "^on.*" },
    },
};
export default meta;

export const Basic: StoryFn<SectionCardProps> = () => (
    <SectionCard>
        <SectionCard.Header>
            <Text background="blue50Mono800" lineHeight={6}>
                Header
            </Text>
        </SectionCard.Header>
        <SectionCard.Content>
            <Center height={20} background="blue50Mono800">
                Body
            </Center>
        </SectionCard.Content>
    </SectionCard>
);

export const Compact: StoryFn<SectionCardProps> = () => (
    <SectionCard variant="compact">
        <SectionCard.Header>
            <Text background="blue50Mono800" lineHeight={6}>
                Header
            </Text>
        </SectionCard.Header>
        <SectionCard.Content>
            <Center height={20} background="blue50Mono800">
                Body
            </Center>
        </SectionCard.Content>
    </SectionCard>
);
