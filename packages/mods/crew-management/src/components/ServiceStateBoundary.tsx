import React from "react";
import { match } from "ts-pattern";
import type { Error, ServiceState } from "@voloiq/service";
import { ErrorDisplay } from "./ErrorDisplay";
import { LoadingSpinner } from "./LoadingSpinner";

export type ServiceStateBoundaryProps = {
    state: ServiceState;
    error?: Error;
};

export const ServiceStateBoundary: FCC<ServiceStateBoundaryProps> = (props) => {
    const { state, error, children } = props;

    return match(state)
        .with("pending", () => <LoadingSpinner />)
        .with("error", () => <ErrorDisplay error={error} />)
        .otherwise(() => <>{children}</>);
};
