import { ExpandableCard, HStack, Text, VStack } from "@volocopter/design-library-react";
import { EditorTextDisplay } from "@volocopter/text-editor-react";
import type { TestPointSequence } from "@voloiq/flight-test-definition-api/v1";
import { DetailsButton } from "@voloiq/flight-test-definition-components";
import { useNavigate } from "@voloiq/routing";
import { TextWithLabel } from "@voloiq/text-layouts";
import { useTestPointSequenceListTranslation } from "./translations/useTestPointSequenceListTranslation";

export type TestPointSequenceListItemProps = {
    cardIndex: number;
    testPointSequence: TestPointSequence;
};

export const TestPointSequenceListItem = (props: TestPointSequenceListItemProps) => {
    const { testPointSequence, cardIndex } = props;
    const { id, successCriteria, testPoint, type } = testPointSequence;
    const navigate = useNavigate();
    const { t } = useTestPointSequenceListTranslation();

    return (
        <ExpandableCard cardLabel={t("Test Points Sequence #{cardIndex}", { cardIndex })} variant="gray">
            <ExpandableCard.Title>
                <HStack spacing={1} w="full" h="full" justifyContent="flex-start" alignItems="center">
                    <Text fontWeight="bold" fontSize="xs">
                        {`${t("Test Points Sequence #{cardIndex}", { cardIndex })} ${type ? "-" : ""}`}
                    </Text>
                    <Text fontSize="xs">{type || ""}</Text>
                </HStack>
            </ExpandableCard.Title>
            <ExpandableCard.ActionButton>
                <DetailsButton onClick={() => navigate(`./test-point-sequence/${id}`)} />
            </ExpandableCard.ActionButton>
            <ExpandableCard.Content>
                <VStack spacing={3} alignItems="flex-start">
                    <TextWithLabel
                        label={t("Test Point")}
                        text={<EditorTextDisplay document={testPoint || "-"} />}
                        size="xs"
                    />
                    <TextWithLabel
                        label={t("Success Criteria")}
                        text={<EditorTextDisplay document={successCriteria || "-"} />}
                        size="xs"
                    />
                </VStack>
            </ExpandableCard.Content>
        </ExpandableCard>
    );
};
