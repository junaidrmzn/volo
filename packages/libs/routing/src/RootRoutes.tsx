import { useContext, useMemo } from "react";
import { UNSAFE_RouteContext as RouteContext, Routes, RoutesProps } from "react-router-dom";

// This is a pretty hacky workaround for a long-existing bug in react-router v6 found here: https://github.com/remix-run/react-router/discussions/9841
const useRootRoutes = () => {
    const context = useContext(RouteContext);

    const value = useMemo(
        () => ({
            ...context,
            matches: [],
        }),
        [context]
    );

    return value;
};
export const RootRoutes = (props: RoutesProps) => {
    const value = useRootRoutes();

    return (
        <RouteContext.Provider value={value}>
            <Routes {...props} />
        </RouteContext.Provider>
    );
};
