import type { ReactNode } from "react";

type AircraftFieldProps = {
    children: ReactNode;
};

export const AircraftField = (props: AircraftFieldProps) => {
    const { children } = props;

    return <>{children}</>;
};
