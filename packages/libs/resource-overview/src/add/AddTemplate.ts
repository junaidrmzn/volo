import { createCompoundComponent } from "../utils/createCompoundComponent";
import type { RenderAddHandler } from "./ResourceAdd";

export type AddTemplateProps = {
    children: RenderAddHandler;
};
export const { CompoundComponent: AddTemplate, getCompoundComponentProps: getAddTemplateProps } =
    createCompoundComponent();
