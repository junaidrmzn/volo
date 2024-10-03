import type { ReactNode } from "react";
import type { CardListItemProps } from "@voloiq/card-list-item";
import { useGlobalState } from "../global-state/useGlobalState";
import type { BaseResource } from "../state-machine/BaseResource";

export type ResourceListItemOptions = {
    reloadList: () => void;
};

export type ResourceListItemProps<Resource extends BaseResource> = {
    renderListItem: (
        resource: Resource,
        cardListItemProps: CardListItemProps,
        options: ResourceListItemOptions
    ) => ReactNode;
    resource: Resource;
};
export const ResourceListItem = <Resource extends BaseResource>(props: ResourceListItemProps<Resource>) => {
    const { renderListItem, resource } = props;
    const [state, send] = useGlobalState();

    const {
        meta: {
            list: { getListItemName },
        },
    } = state;

    const onClick = () => {
        const isSplitPreview = state.matches("split_preview");
        const isSelectedResource = state.context.selectedResourceId === resource.id;

        if (isSplitPreview && !isSelectedResource) {
            send({ type: "SELECT", selectedResourceId: resource.id, resource });
        } else if (!isSplitPreview) {
            send(isSelectedResource ? "UNSELECT" : { type: "SELECT", selectedResourceId: resource.id });
        }
    };

    const cardListItemProps: CardListItemProps = state.can("SELECT")
        ? {
              isSelected: state.context.selectedResourceId === resource.id,
              ariaLabel: getListItemName(resource),
              onClick,
          }
        : {};

    return <>{renderListItem(resource, cardListItemProps, { reloadList: () => send({ type: "RELOAD_LIST" }) })}</>;
};
