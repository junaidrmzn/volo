import { Box, Text, VStack } from "@volocopter/design-library-react";
import { EditorTextDisplay } from "@volocopter/text-editor-react";
import type { AdditionalComment } from "@voloiq/flight-test-definition-api/v1";

export type AdditionalCommentsSectionContentProps = {
    additionalComments: AdditionalComment[];
};

export const AdditionalCommentsSectionContent = (props: AdditionalCommentsSectionContentProps) => {
    const { additionalComments } = props;

    return (
        <VStack spacing={3} alignItems="stretch">
            {additionalComments.map((additionalComment) => (
                <Box key={additionalComment.id} p={3} borderRadius="sm" backgroundColor="gray100Gray900">
                    <Text fontSize="sm" lineHeight={6} whiteSpace="pre-wrap">
                        <EditorTextDisplay document={additionalComment.comment} />
                    </Text>
                </Box>
            ))}
        </VStack>
    );
};
