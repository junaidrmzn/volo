export type UseGetRouteProps = {
    baseRoute: string;
};

export const useGetRoute = (props: UseGetRouteProps) => {
    const { baseRoute } = props;
    const route = `/instrumentation-${baseRoute}`;
    return { route };
};
