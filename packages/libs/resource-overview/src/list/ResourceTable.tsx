import { Center, EmptyState, Table, Tbody, Th, Thead, VStack } from "@volocopter/design-library-react";
import { match } from "ts-pattern";
import { TechnicalError } from "@voloiq/error-views";
import { useFeatureFlags } from "@voloiq/feature-flags";
import { useGlobalState } from "../global-state/useGlobalState";
import type { BaseResource } from "../state-machine/BaseResource";
import { ListHeader } from "./ListHeader";
import { ResourcePagination } from "./ResourcePagination";
import { ResourceTableRow, ResourceTableRowProps } from "./ResourceTableRow";
import { SkeletonLoader } from "./SkeletonLoader";
import { useResourceListTranslations } from "./translations/useResourceOverviewTranslation";

export type ResourceTableProps<Resource extends BaseResource> = {
    renderTableRow: ResourceTableRowProps<Resource>["renderTableRow"];
};

export const ResourceTable = <Resource extends BaseResource>(props: ResourceTableProps<Resource>) => {
    const { renderTableRow } = props;
    const [state, send] = useGlobalState();
    const { t } = useResourceListTranslations();

    const { isFeatureFlagEnabled } = useFeatureFlags();
    const withNewLayout = isFeatureFlagEnabled("iq-777-resource-management");
    const withBulkEdit = isFeatureFlagEnabled("vao-1907-bulk-edit");

    const {
        context: { getListAriaLabel = () => t("list.ariaLabel"), getTableColumns = () => [], overviewData },
    } = state;

    if (!renderTableRow) {
        throw new Error("Please provide a render function for the TableRow");
    }

    return match(state)
        .when(
            (state) => state.matches("list.error"),
            () => <TechnicalError onTryAgainClick={() => send("RELOAD_LIST")} />
        )
        .when(
            (state) => state.matches("list.loaded") && overviewData && overviewData.length === 0,
            () => <EmptyState title={t("emptyState.title")} description={t("emptyState.description")} />
        )
        .otherwise(() => (
            <VStack boxSize="full" alignItems="stretch">
                {state.matches("list.loading") || state.matches("list.initialLoading") ? (
                    <Center boxSize="full">
                        <SkeletonLoader />
                    </Center>
                ) : (
                    <>
                        {(withBulkEdit || withNewLayout) && <ListHeader />}
                        <Table aria-label={getListAriaLabel()}>
                            <Thead>
                                {getTableColumns().map((headerTitle: string) => (
                                    <Th key={headerTitle}>{headerTitle}</Th>
                                ))}
                            </Thead>
                            <Tbody>
                                {overviewData?.map((resource: Resource) => (
                                    <ResourceTableRow
                                        key={resource.id}
                                        renderTableRow={renderTableRow}
                                        resource={resource}
                                    />
                                ))}
                            </Tbody>
                        </Table>
                    </>
                )}
                <ResourcePagination />
            </VStack>
        ));
};
