import { TestPoint, useGetAllTestPointsQuery } from "@voloiq/flight-test-definition-api/v1";
import { ResourceListWrapper } from "@voloiq/flight-test-definition-components";
import { TestPointListItem } from "./TestPointListItem";
import { useTestPointsSearchTabContentTranslation } from "./translations/useTestPointsSearchTabContentTranslation";

export type TestPointSearchResultsProps = {
    flightTestDefinitionId: string;
    procedureId: string;
    selectedTestPointIds: string[];
    onSelectTestPoint: (testPoint: TestPoint, isChecked: boolean) => void;
};

export const TestPointSearchResults = (props: TestPointSearchResultsProps) => {
    const { flightTestDefinitionId, procedureId, selectedTestPointIds, onSelectTestPoint } = props;

    const { t } = useTestPointsSearchTabContentTranslation();
    const { testPoints } = useGetAllTestPointsQuery({
        definitionId: flightTestDefinitionId,
        procedureId,
    });

    return (
        <ResourceListWrapper
            list={testPoints}
            emptyMessage={t("No test points found")}
            renderItem={(testPoint) => (
                <TestPointListItem
                    key={testPoint.id}
                    testPoint={testPoint}
                    overriddenTestPointId={testPoint.testPointId.split("-").pop() ?? "-"}
                    onSelectTestPoint={onSelectTestPoint}
                    defaultChecked={selectedTestPointIds.includes(testPoint.id)}
                />
            )}
        />
    );
};
