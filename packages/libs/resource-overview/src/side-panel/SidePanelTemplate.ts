import { createCompoundComponent } from "../utils/createCompoundComponent";
import type { RenderSidePanelHandler } from "./ResourceSidePanel";

export type SidePanelTemplateProps = {
    children: RenderSidePanelHandler;
};
export const { CompoundComponent: SidePanelTemplate, getCompoundComponentProps: getSidePanelTemplateProps } =
    createCompoundComponent();
