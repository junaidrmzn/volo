import type { ReactElement } from "react";
import type { BaseResource } from "../state-machine/BaseResource";
import { createCompoundComponent } from "../utils/createCompoundComponent";

export type SplitPreviewTemplateProps<Resource extends BaseResource> = {
    children: (resource: Resource) => ReactElement | null;
};
export const { CompoundComponent: SplitPreviewTemplate, getCompoundComponentProps: getSplitPreviewTemplateProps } =
    createCompoundComponent();
