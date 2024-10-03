import type { BaseResource } from "../state-machine/BaseResource";
import { createCompoundComponent } from "../utils/createCompoundComponent";
import type { ResourceListItemProps } from "./ResourceListItem";

export type ListItemTemplateProps<Resource extends BaseResource> = {
    children: ResourceListItemProps<Resource>["renderListItem"];
};

export const { CompoundComponent: ListItemTemplate, getCompoundComponentProps: getListTemplateProps } =
    createCompoundComponent();
