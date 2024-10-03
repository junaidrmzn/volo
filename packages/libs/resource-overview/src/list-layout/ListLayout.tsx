import { Grid, HStack, Text, VStack } from "@volocopter/design-library-react";
import { Children, ReactElement, ReactNode, isValidElement } from "react";
import { ListLayoutActionButtons } from "./ListLayoutActionButtons";
import { ListLayoutBody } from "./ListLayoutBody";

export type ListLayoutProps = {
    title: string;
    description?: string;
    children: ReactNode;
};

const ListLayoutTemplate = (props: ListLayoutProps) => {
    const { title, description, children } = props;

    const validChildren = Children.toArray(children).filter<ReactElement>(isValidElement);
    const actionButtons = validChildren.find((child) => child.type === ListLayoutActionButtons);
    const body = validChildren.find((child) => child.type === ListLayoutBody);

    return (
        <VStack alignItems="stretch">
            <Grid templateColumns="50% 50%">
                <VStack spacing={1} alignItems="flex-start">
                    <Text fontSize="sm" lineHeight={6} fontWeight="semibold">
                        {title}
                    </Text>
                    <Text fontSize="xs" lineHeight={4} fontWeight="normal" color="fontOnBgMuted">
                        {description}
                    </Text>
                </VStack>
                <HStack justifyContent="flex-end" alignItems="flex-start">
                    {actionButtons}
                </HStack>
            </Grid>
            {body}
        </VStack>
    );
};

export const ListLayout = Object.assign(ListLayoutTemplate, {
    ActionButtons: ListLayoutActionButtons,
    Body: ListLayoutBody,
});
