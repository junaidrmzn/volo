import type { ReactNode } from "react";
import { useGlobalState } from "../global-state/useGlobalState";
import type { BaseResource } from "../state-machine/BaseResource";

export type ResourceTableRowOptions = {
    reloadList: () => void;
};

export type ResourceTableRowProps<Resource extends BaseResource> = {
    renderTableRow: (resource: Resource, options: ResourceTableRowOptions) => ReactNode;
    resource: Resource;
};

export const ResourceTableRow = <Resource extends BaseResource>(props: ResourceTableRowProps<Resource>) => {
    const { renderTableRow, resource } = props;
    const [, send] = useGlobalState();

    return <>{renderTableRow(resource, { reloadList: () => send({ type: "RELOAD_LIST" }) })}</>;
};
