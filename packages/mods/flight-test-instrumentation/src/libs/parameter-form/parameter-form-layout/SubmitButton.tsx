import type { ReactNode } from "react";

type SubmitButtonProps = {
    children: ReactNode;
};

export const SubmitButton = (props: SubmitButtonProps) => {
    const { children } = props;
    return <>{children}</>;
};
