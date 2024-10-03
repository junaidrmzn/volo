import { useLoadingDots } from "./useLoadingDots";

export type LoadingDotsProps = {
    loading?: boolean;
};

export const LoadingDots = (props: LoadingDotsProps) => {
    const { loading = true } = props;
    const { loadingDotsCount } = useLoadingDots(loading);

    return <>{".".repeat(loading ? loadingDotsCount : 0)}</>;
};
