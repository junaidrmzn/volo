import { BaseResource } from "../state-machine/BaseResource";
import { createCompoundComponent } from "../utils/createCompoundComponent";
import { RenderBulkEditHandler } from "./BulkEditModal";

export type BulkEditTemplateProps<Resource extends BaseResource> = {
    children: RenderBulkEditHandler<Resource>;
};

export const { CompoundComponent: BulkEditTemplate, getCompoundComponentProps: getBulkEditTemplateProps } =
    createCompoundComponent();
