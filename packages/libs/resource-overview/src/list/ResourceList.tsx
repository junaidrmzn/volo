import { CardList, Center, EmptyState, VStack } from "@volocopter/design-library-react";
import { useEffect } from "react";
import { match } from "ts-pattern";
import { TechnicalError } from "@voloiq/error-views";
import { useFeatureFlags } from "@voloiq/feature-flags";
import { useGlobalState } from "../global-state/useGlobalState";
import type { BaseResource } from "../state-machine/BaseResource";
import { ListHeader } from "./ListHeader";
import type { ResourceListItemProps } from "./ResourceListItem";
import { ResourceListItem } from "./ResourceListItem";
import { ResourcePagination } from "./ResourcePagination";
import { SkeletonLoader } from "./SkeletonLoader";
import { useResourceListTranslations } from "./translations/useResourceOverviewTranslation";

export type ResourceListProps<Resource extends BaseResource> = {
    renderListItem: ResourceListItemProps<Resource>["renderListItem"];
};

const useSelectFirstListItem = (withNewLayout: boolean) => {
    const [state, send] = useGlobalState();

    useEffect(() => {
        const {
            context: { overviewData, selectedResourceId },
        } = state;

        if (
            withNewLayout &&
            state.can("SELECT") &&
            state.matches("list.loaded") &&
            overviewData.length > 0 &&
            selectedResourceId === undefined
        ) {
            send({ type: "SELECT", selectedResourceId: overviewData[0].id });
        }
    }, [withNewLayout, send, state]);
};

export const ResourceList = <Resource extends BaseResource>(props: ResourceListProps<Resource>) => {
    const { renderListItem } = props;
    const [state, send] = useGlobalState();
    const { t } = useResourceListTranslations();

    const { isFeatureFlagEnabled } = useFeatureFlags();
    const withNewLayout = isFeatureFlagEnabled("iq-777-resource-management");
    const withBulkEdit = isFeatureFlagEnabled("vao-1907-bulk-edit");

    const {
        context: { getListAriaLabel = () => t("list.ariaLabel"), overviewData },
    } = state;

    if (!renderListItem) {
        throw new Error("Please provide a render function for the ListItem");
    }

    useSelectFirstListItem(withNewLayout);

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
            <VStack alignItems="stretch">
                {state.matches("list.loading") || state.matches("list.initialLoading") ? (
                    <Center boxSize="full">
                        <SkeletonLoader />
                    </Center>
                ) : (
                    <>
                        {(withBulkEdit || withNewLayout) && <ListHeader />}
                        <CardList aria-label={getListAriaLabel()}>
                            {overviewData?.map((resource: Resource) => (
                                <ResourceListItem
                                    key={resource.id}
                                    renderListItem={renderListItem}
                                    resource={resource}
                                />
                            ))}
                        </CardList>
                    </>
                )}
                <ResourcePagination />
            </VStack>
        ));
};
