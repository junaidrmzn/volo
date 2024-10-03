import { createCompoundComponent } from "../utils/createCompoundComponent";
import type { RenderActionsHandler } from "./ResourceActionBar";

export type ActionBarTemplateProps = {
    children: RenderActionsHandler;
};
export const { CompoundComponent: ActionBarTemplate, getCompoundComponentProps: getActionBarTemplateProps } =
    createCompoundComponent();
