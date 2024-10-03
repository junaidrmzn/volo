import { Box, Divider, HStack, VStack } from "@volocopter/design-library-react";
import { ReactNode } from "react";
import { useFeatureFlags } from "@voloiq/feature-flags";
import { ActionBarTemplateProps, getActionBarTemplateProps } from "./action-bar/ActionBarTemplate";
import { ResourceActionBar } from "./action-bar/ResourceActionBar";
import { ResourceFilterBar } from "./filter-bar/ResourceFilterBar";
import { ResourceFilterTags } from "./filter/ResourceFilterTags";
import { useGlobalState } from "./global-state/useGlobalState";
import { ListItemTemplateProps, getListTemplateProps } from "./list/ListItemTemplate";
import { ResourceList } from "./list/ResourceList";
import { ResourceTable } from "./list/ResourceTable";
import { TableRowTemplateProps, getTableRowTemplateProps } from "./list/TableRowTemplate";
import { ResourceQuickFilters } from "./quick-filter/ResourceQuickFilters";
import { ResourceSidePanel } from "./side-panel/ResourceSidePanel";
import { SidePanelTemplateProps, getSidePanelTemplateProps } from "./side-panel/SidePanelTemplate";
import { ResourceSplitPreview } from "./split-preview/ResourceSplitPreview";
import { SplitPreviewTemplateProps, getSplitPreviewTemplateProps } from "./split-preview/SplitPreviewTemplate";
import { BaseResource } from "./state-machine/BaseResource";

export type ListContentProps = {
    children: ReactNode;
    withOldFilter?: boolean;
};

export const ListContent = <Resource extends BaseResource>(props: ListContentProps) => {
    const { children, withOldFilter = false } = props;

    const [state] = useGlobalState();
    const {
        meta: {
            list: { useTable },
        },
    } = state;
    const { isFeatureFlagEnabled } = useFeatureFlags();
    const withNewFilter =
        (!!isFeatureFlagEnabled("resource-overview-new-filter") || !state.can("OPEN_FILTERS")) &&
        state.can("APPLY_FILTERS");

    return (
        <VStack height="full" alignItems="stretch" divider={<Divider w="inherit" mx={1.5} p="0" />}>
            <Box width="full" borderRadius="md" padding={2}>
                {withOldFilter && <ResourceFilterTags />}
                {state.matches("action_bar") && (
                    <ResourceActionBar
                        renderActions={getActionBarTemplateProps<ActionBarTemplateProps>(children).children}
                    />
                )}
                {withNewFilter && <ResourceFilterBar mb={4} />}
                {state.can("APPLY_QUICK_FILTER") && <ResourceQuickFilters />}
            </Box>
            <HStack
                height="full"
                alignItems="stretch"
                divider={<Divider orientation="vertical" h="auto" mx={1.5} p="0" />}
            >
                <Box
                    width={state.matches("split_preview") && !state.matches("side_panel") ? "50%" : "full"}
                    borderRadius="md"
                    padding={3}
                >
                    {useTable ? (
                        <ResourceTable
                            renderTableRow={
                                getTableRowTemplateProps<TableRowTemplateProps<Resource>>(children).children
                            }
                        />
                    ) : (
                        <ResourceList
                            renderListItem={getListTemplateProps<ListItemTemplateProps<Resource>>(children).children}
                        />
                    )}
                </Box>
                {state.matches("split_preview") && (
                    <Box width="full" padding="3" borderRadius="md">
                        <ResourceSplitPreview
                            renderSplitPreview={
                                getSplitPreviewTemplateProps<SplitPreviewTemplateProps<Resource>>(children).children
                            }
                        />
                    </Box>
                )}
                {state.matches("side_panel") && (
                    <Box width="50%" padding="3" borderRadius="md">
                        <ResourceSidePanel
                            renderSidePanel={getSidePanelTemplateProps<SidePanelTemplateProps>(children).children}
                        />
                    </Box>
                )}
            </HStack>
        </VStack>
    );
};
