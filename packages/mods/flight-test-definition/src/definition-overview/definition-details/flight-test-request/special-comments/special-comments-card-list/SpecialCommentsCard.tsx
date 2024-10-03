import { Flex, HStack, Text } from "@volocopter/design-library-react";
import { EditorTextDisplay } from "@volocopter/text-editor-react";
import type { SpecialComment } from "@voloiq/flight-test-definition-api/v1";

export type SpecialCommentCardProps = {
    specialComment: SpecialComment;
};

export const SpecialCommentCard = (props: SpecialCommentCardProps) => {
    const { specialComment } = props;
    return (
        <HStack w="full" background="gray100Gray900" p={3} alignItems="flex-start" spacing={3} borderRadius={9}>
            <Flex flex={3}>
                <Text fontSize="sm" whiteSpace="pre-wrap">
                    <EditorTextDisplay document={specialComment.comment} />
                </Text>
            </Flex>
        </HStack>
    );
};
