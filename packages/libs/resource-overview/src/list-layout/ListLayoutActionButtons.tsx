import { ReactNode } from "react";

export type ListLayoutActionButtonsProps = {
    children: ReactNode;
};

export const ListLayoutActionButtons = (props: ListLayoutActionButtonsProps) => {
    const { children } = props;

    return <>{children}</>;
};
