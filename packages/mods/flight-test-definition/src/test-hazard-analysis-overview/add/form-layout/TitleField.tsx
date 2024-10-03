import type { ReactNode } from "react";

type TitleFieldProps = {
    children: ReactNode;
};

export const TitleField = (props: TitleFieldProps) => {
    const { children } = props;

    return <>{children}</>;
};
