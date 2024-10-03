import type { BaseResource } from "../state-machine/BaseResource";
import { createCompoundComponent } from "../utils/createCompoundComponent";
import type { ResourceTableRowProps } from "./ResourceTableRow";

export type TableRowTemplateProps<Resource extends BaseResource> = {
    children: ResourceTableRowProps<Resource>["renderTableRow"];
};

export const { CompoundComponent: TableRowTemplate, getCompoundComponentProps: getTableRowTemplateProps } =
    createCompoundComponent();
