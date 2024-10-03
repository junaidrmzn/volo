import type { ReactElement } from "react";
import type { BaseResource } from "../state-machine/BaseResource";
import { createCompoundComponent } from "../utils/createCompoundComponent";

export type PreviewTemplateProps<Resource extends BaseResource> = {
    children: (resource: Resource) => ReactElement | null;
};
export const { CompoundComponent: PreviewTemplate, getCompoundComponentProps: getPreviewTemplateProps } =
    createCompoundComponent();
