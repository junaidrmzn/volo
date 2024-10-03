import { Box } from "@volocopter/design-library-react";
import { EditorTextDisplay } from "@volocopter/text-editor-react";
import { EmptyListMessage } from "@voloiq/flight-test-definition-components";
import { useSafetyReviewCommentsTranslation } from "./translations/useSafetyReviewCommentsTranslation";

export type AdditionalCommentsSectionContentProps = {
    additionalComments?: string;
};

export const SafetyReviewCommentsSectionContent = (props: AdditionalCommentsSectionContentProps) => {
    const { additionalComments } = props;
    const { t } = useSafetyReviewCommentsTranslation();

    return additionalComments && additionalComments?.length > 0 ? (
        <Box w="full" h="full" minH="100px" p={4} borderRadius="md" backgroundColor="decorative1Muted" fontSize="xs">
            <EditorTextDisplay document={additionalComments} />
        </Box>
    ) : (
        <EmptyListMessage message={t("No additional comments. Please add the related information.")} />
    );
};
