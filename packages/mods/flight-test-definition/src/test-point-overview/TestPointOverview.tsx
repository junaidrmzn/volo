import type { CardListItemProps } from "@voloiq/card-list-item";
import { useFeatureFlags } from "@voloiq/feature-flags";
import type { TestPointGroup as TestPointGroupType } from "@voloiq/flight-test-definition-api/v1";
import type { TestPointGroup as TestPointGroupTypeV2 } from "@voloiq/flight-test-definition-api/v2";
import type { ResourceListItemOptions } from "@voloiq/resource-overview";
import { ResourceOverview } from "@voloiq/resource-overview";
import { TestPointGroup } from "./TestPointGroup";
import { TestPointGroupV2 } from "./TestPointGroupV2";
import { useTestPointMachineConfig } from "./test-point-machine-config/useTestPointMachineConfig";

export const TestPointOverview = () => {
    const { testPointMachineConfig } = useTestPointMachineConfig();

    const { isFeatureFlagEnabled } = useFeatureFlags();
    return (
        <ResourceOverview machineConfig={testPointMachineConfig}>
            <ResourceOverview.ListItem>
                {isFeatureFlagEnabled("vte-1542")
                    ? (
                          testPointGroup: TestPointGroupTypeV2,
                          _: CardListItemProps,
                          handlers: ResourceListItemOptions
                      ) => <TestPointGroupV2 testPointGroup={testPointGroup} reloadList={handlers.reloadList} />
                    : (testPointGroup: TestPointGroupType, _: CardListItemProps, handlers: ResourceListItemOptions) => (
                          <TestPointGroup testPointGroup={testPointGroup} reloadList={handlers.reloadList} />
                      )}
            </ResourceOverview.ListItem>
        </ResourceOverview>
    );
};
