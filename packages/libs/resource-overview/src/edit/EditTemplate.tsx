import type { BaseResource } from "../state-machine/BaseResource";
import { createCompoundComponent } from "../utils/createCompoundComponent";
import type { RenderEditHandler } from "./ResourceEdit";

export type EditTemplateProps<Resource extends BaseResource> = {
    children: RenderEditHandler<Resource>;
};
export const { CompoundComponent: EditTemplate, getCompoundComponentProps: getEditTemplateProps } =
    createCompoundComponent();
