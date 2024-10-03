import type { ReactElement } from "react";
import type { BaseResource } from "../state-machine/BaseResource";
import { createCompoundComponent } from "../utils/createCompoundComponent";

export type DetailsTemplateProps<Resource extends BaseResource> = {
    children: (resource: Resource) => ReactElement | null;
};
export const { CompoundComponent: DetailsTemplate, getCompoundComponentProps: getDetailsTemplateProps } =
    createCompoundComponent();
