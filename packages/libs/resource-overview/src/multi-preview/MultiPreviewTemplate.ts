import type { ReactElement } from "react";
import { createCompoundComponent } from "../utils/createCompoundComponent";

export type MultiPreviewTemplateProps = {
    children: () => ReactElement | null;
};
export const { CompoundComponent: MultiPreviewTemplate, getCompoundComponentProps: getMultiPreviewTemplateProps } =
    createCompoundComponent();
