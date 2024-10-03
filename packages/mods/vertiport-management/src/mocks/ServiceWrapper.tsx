import React from "react";
import { ServiceProvider } from "@voloiq/service";

export const ServiceWrapper: FCC = (props) => {
    const { children } = props;
    return <ServiceProvider baseUrl={`${BACKEND_BASE_URL}`}>{children}</ServiceProvider>;
};
