import { useState } from "react";

export function useSetBulkFormLoading() {
    const [isBulkFormLoading, setIsBulkFormLoading] = useState(false);

    return { isBulkFormLoading, setIsBulkFormLoading };
}
