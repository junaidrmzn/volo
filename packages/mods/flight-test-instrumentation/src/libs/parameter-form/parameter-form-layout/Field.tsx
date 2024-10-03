import type { ReactNode } from "react";

type FieldProps = {
    children: ReactNode;
};

export const Field = (props: FieldProps) => {
    const { children } = props;

    return <>{children}</>;
};
