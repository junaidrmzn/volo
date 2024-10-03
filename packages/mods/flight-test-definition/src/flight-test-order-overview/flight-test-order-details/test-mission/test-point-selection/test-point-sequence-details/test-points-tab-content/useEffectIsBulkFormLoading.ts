import { useEffect } from "react";

export function useEffectIsBulkFormLoading(
    isBulkFormLoading: boolean,
    setIsBulkFormLoading: (isBulkFormLoading: boolean) => void
) {
    useEffect(() => {
        setIsBulkFormLoading(isBulkFormLoading);
    }, [isBulkFormLoading, setIsBulkFormLoading]);
}
