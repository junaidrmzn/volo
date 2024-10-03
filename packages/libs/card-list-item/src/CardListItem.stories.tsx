import type { Meta } from "@storybook/react";
import { Box, CardList, Center, VStack } from "@volocopter/design-library-react";
import { CardListItem } from "./CardListItem";

const meta: Meta = {
    title: "Card List Item/Card List Item",
    decorators: [
        (Story) => (
            <CardList>
                <Story />
            </CardList>
        ),
    ],
};
export default meta;

export const Basic = () => (
    <CardListItem>
        <CardListItem.Identifier>
            <Center boxSize="full" bg="coral.500">
                Identifier
            </Center>
        </CardListItem.Identifier>
        <CardListItem.Status>
            <Center boxSize="full" bg="teal.500">
                Status
            </Center>
        </CardListItem.Status>
    </CardListItem>
);

export const WithAdditionalContent = () => (
    <VStack>
        {["100%", "500px"].map((width) => (
            <Box width={width} key={width}>
                <CardListItem>
                    <CardListItem.Identifier>
                        <Center boxSize="full" bg="coral.500">
                            Identifier
                        </Center>
                    </CardListItem.Identifier>
                    <CardListItem.AdditionalContent>
                        <Center boxSize="full" bg="pink.500">
                            Additional Content
                        </Center>
                    </CardListItem.AdditionalContent>
                    <CardListItem.Status>
                        <Center boxSize="full" bg="teal.500">
                            Status
                        </Center>
                    </CardListItem.Status>
                </CardListItem>
            </Box>
        ))}
    </VStack>
);
