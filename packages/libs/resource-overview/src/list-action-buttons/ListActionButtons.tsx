import { Button } from "@volocopter/design-library-react";
import type { ReactElement, ReactNode } from "react";
import { Children, isValidElement } from "react";

export type ListActionButtonProps = {
    children: ReactNode;
    onClick: () => void;
};

export const ListActionButton = (props: ListActionButtonProps) => {
    const { children, onClick } = props;

    return <Button onClick={onClick}>{children}</Button>;
};

export type ListActionButtonsProps = {
    children: ReactNode;
};

export const ListActionButtons = (props: ListActionButtonsProps) => {
    const { children } = props;

    const validChildren = Children.toArray(children).filter<ReactElement>(isValidElement);
    const listActionButtons = validChildren.filter((child) => child.type === ListActionButton);

    if (listActionButtons.length === 0) {
        throw new Error("Couldn't find a valid list action button as child of ListActionButtons.");
    }

    return <>{listActionButtons}</>;
};
