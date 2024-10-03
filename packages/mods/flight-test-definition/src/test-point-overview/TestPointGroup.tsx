import { VStack } from "@volocopter/design-library-react";
import type { TestPointGroup as TestPointGroupType } from "@voloiq/flight-test-definition-api/v1";
import { OverviewGroup } from "@voloiq/flight-test-definition-components";
import { SynchronizedScrollProvider, useAtaName } from "@voloiq/flight-test-definition-utils";
import { SynchronizedScrollTestPointCard } from "./SynchronizedScrollTestPointCard";
import { useTestPointOverviewTranslation } from "./translations/useTestPointOverviewTranslation";

export type TestPointGroupProps = {
    testPointGroup: TestPointGroupType;
    reloadList: () => void;
};

export const TestPointGroup = (props: TestPointGroupProps) => {
    const { testPointGroup, reloadList } = props;
    const { ata, definitions } = testPointGroup;
    const { mapAtaToSystemName } = useAtaName();
    const { t } = useTestPointOverviewTranslation();

    return (
        <OverviewGroup groupName={`${t("ATA")} ${ata} - ${mapAtaToSystemName(ata)}`}>
            {definitions.map((definition) => (
                <OverviewGroup groupName={definition.definitionId} key={definition.definitionId}>
                    {definition.procedures.map((procedure) => (
                        <OverviewGroup
                            groupName={`${procedure.procedureId} ${procedure.procedureTitle}`}
                            key={procedure.procedureId}
                        >
                            <VStack py={3} spacing={2} alignItems="stretch">
                                <SynchronizedScrollProvider>
                                    {procedure.testPoints.map((testPoint) => (
                                        <SynchronizedScrollTestPointCard
                                            key={testPoint.id}
                                            testPoint={testPoint}
                                            procedureTitle={procedure.procedureTitle}
                                            reloadList={reloadList}
                                        />
                                    ))}
                                </SynchronizedScrollProvider>
                            </VStack>
                        </OverviewGroup>
                    ))}
                </OverviewGroup>
            ))}
        </OverviewGroup>
    );
};
