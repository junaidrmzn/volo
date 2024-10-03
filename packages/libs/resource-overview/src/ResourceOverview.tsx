import { DateTimeInputLocaleProvider } from "@volocopter/date-time-input-react";
import type { ReactNode } from "react";
import type { MachineConfig } from "xstate";
import { defaultLocale, useDateTimeInputLocaleContext } from "@voloiq/date-time-input";
import { ResourceOverviewWithoutProviders } from "./ResourceOverviewWithoutProviders";
import { ActionBarTemplate } from "./action-bar/ActionBarTemplate";
import { AddTemplate } from "./add/AddTemplate";
import { BulkEditTemplate } from "./bulk-edit/BulkEditTemplate";
import { DetailsTemplate } from "./details/DetailsTemplate";
import { EditTemplate } from "./edit/EditTemplate";
import { GlobalStateProvider } from "./global-state/GlobalStateProvider";
import { ListActionButton, ListActionButtons } from "./list-action-buttons/ListActionButtons";
import { ListItemTemplate } from "./list/ListItemTemplate";
import { TableRowTemplate } from "./list/TableRowTemplate";
import { MultiPreviewTemplate } from "./multi-preview/MultiPreviewTemplate";
import { PreviewActionButton, PreviewActionButtons } from "./preview/PreviewActionButtons";
import { PreviewTemplate } from "./preview/PreviewTemplate";
import { SidePanelTemplate } from "./side-panel/SidePanelTemplate";
import { SplitPreviewTemplate } from "./split-preview/SplitPreviewTemplate";
import type { BaseResource } from "./state-machine/BaseResource";
import { useResourceOverview } from "./useResourceOverview";

export type ResourceOverviewProps = {
    children?: ReactNode;
    // TODO type the config
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    machineConfig: MachineConfig<any, any, any>;
};

export const ResourceOverviewTemplate = <Resource extends BaseResource>(props: ResourceOverviewProps) => {
    const { children, machineConfig } = props;

    const { stateMachine } = useResourceOverview(machineConfig);

    const { locale, clearIconLabel, clockIconLabel } = useDateTimeInputLocaleContext();

    return (
        <DateTimeInputLocaleProvider
            locales={{ current: locale ?? defaultLocale }}
            currentLanguage="current"
            clearIconLabel={clearIconLabel}
            clockIconLabel={clockIconLabel}
        >
            <GlobalStateProvider stateMachine={stateMachine}>
                <ResourceOverviewWithoutProviders<Resource>>{children}</ResourceOverviewWithoutProviders>
            </GlobalStateProvider>
        </DateTimeInputLocaleProvider>
    );
};

export const ResourceOverview = Object.assign(ResourceOverviewTemplate, {
    ListActionButton,
    ListActionButtons,
    ListItem: ListItemTemplate,
    TableRow: TableRowTemplate,
    Preview: PreviewTemplate,
    PreviewActionButton,
    PreviewActionButtons,
    Details: DetailsTemplate,
    Add: AddTemplate,
    Edit: EditTemplate,
    MultiPreview: MultiPreviewTemplate,
    ActionBar: ActionBarTemplate,
    SidePanel: SidePanelTemplate,
    BulkEdit: BulkEditTemplate,
    SplitPreview: SplitPreviewTemplate,
});
