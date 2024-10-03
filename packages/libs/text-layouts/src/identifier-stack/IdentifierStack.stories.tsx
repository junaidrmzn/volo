import type { Meta } from "@storybook/react";
import { HStack } from "@volocopter/design-library-react";
import { IdentifierStack } from "./IdentifierStack";

const meta: Meta = {
    title: "Text-Layouts/Identifier Stack",
    decorators: [(Story) => <Story />],
};
export default meta;

export const Basic = () => (
    <IdentifierStack
        mainIdentifier="Main identifier"
        secondaryIdentifier="Secondary identifier"
        thirdIdentifier="Third identifier"
    />
);

export const WithMissingText = () => (
    <HStack spacing={4}>
        <IdentifierStack
            mainIdentifier="Main identifier"
            secondaryIdentifier="Secondary identifier"
            thirdIdentifier="Third identifier"
        />
        <IdentifierStack mainIdentifier="Main identifier" secondaryIdentifier="Secondary identifier" />
        <IdentifierStack mainIdentifier="Main identifier" thirdIdentifier="Third identifier" />
    </HStack>
);
