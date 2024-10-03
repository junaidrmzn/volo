import type { ReactNode } from "react";

type DescriptionFieldProps = {
    children: ReactNode;
};

export const DescriptionField = (props: DescriptionFieldProps) => {
    const { children } = props;

    return <>{children}</>;
};
