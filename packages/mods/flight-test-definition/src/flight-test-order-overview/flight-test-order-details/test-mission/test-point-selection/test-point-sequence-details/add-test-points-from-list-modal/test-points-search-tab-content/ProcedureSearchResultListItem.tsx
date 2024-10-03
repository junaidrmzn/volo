import { ExpandableCard, HStack, Text, VStack } from "@volocopter/design-library-react";
import { ProcedureRead, TestPoint } from "@voloiq/flight-test-definition-api/v1";
import { TestPointSearchResults } from "./TestPointSearchResults";
import { useTestPointsSearchTabContentTranslation } from "./translations/useTestPointsSearchTabContentTranslation";

export type ProcedureSearchResultListItemProps = {
    flightTestDefinitionId: string;
    procedure: ProcedureRead;
    selectedTestPointIds: string[];
    onSelectTestPoint: (testPoint: TestPoint, isChecked: boolean) => void;
};

export const ProcedureSearchResultListItem = (props: ProcedureSearchResultListItemProps) => {
    const { flightTestDefinitionId, procedure, selectedTestPointIds, onSelectTestPoint } = props;

    const { t } = useTestPointsSearchTabContentTranslation();

    return (
        <ExpandableCard cardLabel={procedure.title} variant="gray">
            <ExpandableCard.Title>
                <HStack spacing={1} w="full" justifyContent="space-between" alignItems="flex-start">
                    <VStack spacing={0} justifyContent="flex-start" alignItems="flex-start">
                        <Text fontWeight="bold" fontSize="xs" lineHeight={2}>
                            {procedure.title}
                        </Text>
                        <Text fontSize="xs" lineHeight={1}>
                            {procedure.procedureId}
                        </Text>
                    </VStack>
                    <Text fontSize="xs" lineHeight={2}>{`${procedure.testPointCount} ${t("Test Points")}`}</Text>
                </HStack>
            </ExpandableCard.Title>
            <ExpandableCard.Content>
                <TestPointSearchResults
                    flightTestDefinitionId={flightTestDefinitionId}
                    procedureId={procedure.id}
                    selectedTestPointIds={selectedTestPointIds}
                    onSelectTestPoint={onSelectTestPoint}
                />
            </ExpandableCard.Content>
        </ExpandableCard>
    );
};
