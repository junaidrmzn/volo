import type { ReactElement, ReactNode } from "react";
import { Children, isValidElement } from "react";
import { ListActionButtons } from "./ListActionButtons";

type ExtractListActionButtonsProps = {
    children: ReactNode;
};

export const extractListActionButtons = (props: ExtractListActionButtonsProps) => {
    const { children } = props;

    const validChildren = Children.toArray(children).filter<ReactElement>(isValidElement);
    const listActionButtons = validChildren.find((child) => child.type === ListActionButtons);

    return listActionButtons;
};
