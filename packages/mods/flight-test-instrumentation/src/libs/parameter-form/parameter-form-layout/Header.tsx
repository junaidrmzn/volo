import type { ReactNode } from "react";

type HeaderProps = {
    children: ReactNode;
};

export const Header = (props: HeaderProps) => {
    const { children } = props;

    return <>{children}</>;
};
