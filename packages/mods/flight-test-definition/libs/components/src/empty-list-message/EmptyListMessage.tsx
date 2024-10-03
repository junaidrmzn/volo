import { Center, Text } from "@volocopter/design-library-react";

export type EmptyListMessageProps = {
    message: string;
};

export const EmptyListMessage = (props: EmptyListMessageProps) => {
    const { message } = props;

    return (
        <Center w="full" h="full" minH="100px" p={3} backgroundColor="transparent" borderRadius="md">
            <Text lineHeight={6} fontSize="xs" color="fontOnBgMuted">
                {message}
            </Text>
        </Center>
    );
};
