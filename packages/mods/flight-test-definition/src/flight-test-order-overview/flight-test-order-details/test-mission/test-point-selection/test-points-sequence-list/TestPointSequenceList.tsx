import { VStack } from "@volocopter/design-library-react";
import type { TestPointSequence } from "@voloiq/flight-test-definition-api/v1";
import { ResourceListWrapper } from "@voloiq/flight-test-definition-components";
import { TestPointSequenceListItem } from "./TestPointSequenceListItem";
import { useTestPointSequenceListTranslation } from "./translations/useTestPointSequenceListTranslation";

export type TestPointSequenceListProps = {
    testPointSequences: TestPointSequence[];
};

export const TestPointSequenceList = (props: TestPointSequenceListProps) => {
    const { testPointSequences } = props;

    const { t } = useTestPointSequenceListTranslation();
    return (
        <VStack flex={1} w="full" alignItems="stretch">
            <ResourceListWrapper
                emptyMessage={t("No Test Points Sequence found. Please create a new sequence.")}
                renderItem={(testPointSequence, index) => (
                    <TestPointSequenceListItem
                        key={testPointSequence.id}
                        testPointSequence={testPointSequence}
                        cardIndex={index + 1}
                    />
                )}
                list={testPointSequences}
            />
        </VStack>
    );
};
