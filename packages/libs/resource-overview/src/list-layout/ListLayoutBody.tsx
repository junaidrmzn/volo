import { ReactNode } from "react";

export type ListLayoutBodyProps = {
    children: ReactNode;
};

export const ListLayoutBody = (props: ListLayoutBodyProps) => {
    const { children } = props;

    return <>{children}</>;
};
