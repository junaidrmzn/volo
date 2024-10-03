import { Card, Divider, Text, VStack } from "@volocopter/design-library-react";

export type BookingCardProps = {
    title: string;
};

export const BookingCard: FCC<BookingCardProps> = (props) => {
    const { title, children } = props;

    return (
        <Card width="100%">
            <VStack width="100%" align="flex-start">
                <Text fontWeight="bold">{title}</Text>
                <Divider />
                {children}
            </VStack>
        </Card>
    );
};
