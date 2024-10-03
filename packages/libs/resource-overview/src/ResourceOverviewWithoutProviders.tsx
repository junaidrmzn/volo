import { Box, SideMenuLayout } from "@volocopter/design-library-react";
import type { ReactNode } from "react";
import { match } from "ts-pattern";
import type { State } from "xstate";
import { UnauthorizedPage } from "@voloiq/error-views";
import { useFeatureFlags } from "@voloiq/feature-flags";
import { SideMenuContent } from "./SideMenuContent";
import type { AddTemplateProps } from "./add/AddTemplate";
import { getAddTemplateProps } from "./add/AddTemplate";
import { ResourceAdd } from "./add/ResourceAdd";
import { BulkEditTemplateProps, getBulkEditTemplateProps } from "./bulk-edit/BulkEditTemplate";
import { ResourceBulkEdit } from "./bulk-edit/ResourceBulkEdit";
import { ConfirmDeletionModal } from "./delete/ConfirmDeletionModal";
import type { DetailsTemplateProps } from "./details/DetailsTemplate";
import { getDetailsTemplateProps } from "./details/DetailsTemplate";
import { ResourceDetails } from "./details/ResourceDetails";
import type { EditTemplateProps } from "./edit/EditTemplate";
import { getEditTemplateProps } from "./edit/EditTemplate";
import { ResourceEdit } from "./edit/ResourceEdit";
import { ResourceFilters } from "./filter/ResourceFilters";
import { useGlobalState } from "./global-state/useGlobalState";
import type { MultiPreviewTemplateProps } from "./multi-preview/MultiPreviewTemplate";
import { getMultiPreviewTemplateProps } from "./multi-preview/MultiPreviewTemplate";
import { ResourceMultiPreview } from "./multi-preview/ResourceMultiPreview";
import type { PreviewActionButtonsProps } from "./preview/PreviewActionButtons";
import { getPreviewActionButtonsProps } from "./preview/PreviewActionButtons";
import type { PreviewTemplateProps } from "./preview/PreviewTemplate";
import { getPreviewTemplateProps } from "./preview/PreviewTemplate";
import { ResourcePreview } from "./preview/ResourcePreview";
import { ResourceSort } from "./sort/ResourceSort";
import type { BaseResource } from "./state-machine/BaseResource";
import type { ResourceContext } from "./state-machine/ResourceContext";
import { useInitializeContext } from "./useInitializeContext";

const getOpenMenuKey = (state: State<ResourceContext>) =>
    match(state)
        .when(
            (state) => ["filter.open", "filter.error"].some(state.matches),
            () => "filter"
        )
        .when(
            (state) => ["sort.open", "sort.error"].some(state.matches),
            () => "sort"
        )
        .when(
            (state) => ["preview.loading", "preview.loaded", "preview.error"].some(state.matches),
            () => "preview"
        )
        .when(
            (state) => ["multiPreview.loading", "multiPreview.loaded", "multiPreview.error"].some(state.matches),
            () => "multiPreview"
        )
        .otherwise(() => undefined);

export type ResourceOverviewWithoutProvidersProps = {
    children?: ReactNode;
};

export const ResourceOverviewWithoutProviders = <Resource extends BaseResource>(
    props: ResourceOverviewWithoutProvidersProps
) => {
    const { children } = props;
    const [state] = useGlobalState();
    const {
        meta: {
            list: { canRead },
        },
        matches,
    } = state;

    const { isFeatureFlagEnabled } = useFeatureFlags();
    const withOldFilter =
        !isFeatureFlagEnabled("resource-overview-new-filter") &&
        (state.can("OPEN_FILTERS") || state.can("CLOSE_FILTERS"));
    useInitializeContext(withOldFilter);

    const withNewLayout = isFeatureFlagEnabled("iq-777-resource-management");
    const withBulkEdit = isFeatureFlagEnabled("vao-1907-bulk-edit");

    // TODO integrate with react-router
    return match(state)
        .when(
            () => !canRead,
            () => <UnauthorizedPage />
        )
        .when(
            () => ["details.loading", "details.loaded"].some(matches),
            () => (
                <ResourceDetails
                    renderDetails={getDetailsTemplateProps<DetailsTemplateProps<Resource>>(children).children}
                />
            )
        )
        .when(
            () => state.matches("add") && !state.matches("add.closed") && !withNewLayout,
            () => <ResourceAdd renderAdd={getAddTemplateProps<AddTemplateProps>(children).children} />
        )
        .when(
            () => state.matches("edit") && !state.matches("edit.closed") && !withNewLayout,
            () => <ResourceEdit renderEdit={getEditTemplateProps<EditTemplateProps<Resource>>(children).children} />
        )
        .otherwise(() => {
            const openMenuKey = getOpenMenuKey(state);

            return (
                <Box boxSize="full">
                    <SideMenuLayout openMenuKey={openMenuKey}>
                        <SideMenuLayout.Content>
                            <SideMenuContent withOldFilter={withOldFilter}>{children}</SideMenuContent>
                        </SideMenuLayout.Content>
                        <SideMenuLayout.Menu menuKey="preview">
                            {openMenuKey === "preview" && (
                                <ResourcePreview
                                    renderPreview={
                                        getPreviewTemplateProps<PreviewTemplateProps<Resource>>(children).children
                                    }
                                    renderActionButtons={
                                        getPreviewActionButtonsProps<PreviewActionButtonsProps<Resource>>(children)
                                            ?.children
                                    }
                                />
                            )}
                        </SideMenuLayout.Menu>
                        <SideMenuLayout.Menu menuKey="filter">
                            {openMenuKey === "filter" && <ResourceFilters<Resource> />}
                        </SideMenuLayout.Menu>
                        <SideMenuLayout.Menu menuKey="sort">
                            {openMenuKey === "sort" && <ResourceSort />}
                        </SideMenuLayout.Menu>
                        <SideMenuLayout.Menu menuKey="multiPreview">
                            {openMenuKey === "multiPreview" && (
                                <ResourceMultiPreview
                                    renderMultiPreview={
                                        getMultiPreviewTemplateProps<MultiPreviewTemplateProps>(children).children
                                    }
                                />
                            )}
                        </SideMenuLayout.Menu>
                    </SideMenuLayout>
                    {state.matches({ delete: "confirming" }) && <ConfirmDeletionModal />}
                    {withNewLayout && state.matches("edit") && !state.matches("edit.closed") && (
                        <ResourceEdit
                            renderEdit={getEditTemplateProps<EditTemplateProps<Resource>>(children).children}
                        />
                    )}
                    {withBulkEdit && state.matches("bulk_edit") && !state.matches("bulk_edit.closed") && (
                        <ResourceBulkEdit
                            renderBulkEdit={
                                getBulkEditTemplateProps<BulkEditTemplateProps<Resource>>(children).children
                            }
                        />
                    )}
                    {withNewLayout && state.matches("add") && !state.matches("add.closed") && (
                        <ResourceAdd renderAdd={getAddTemplateProps<AddTemplateProps>(children).children} />
                    )}
                </Box>
            );
        });
};
