import { useState } from "react";
import { useDebounce } from "react-use";

export type UseDebounceInputOptions = {
    onAfterDebounce: (value: string) => void;
    debounceTime?: number;
};

export const useDebounceInput = (options: UseDebounceInputOptions) => {
    const { onAfterDebounce, debounceTime = 800 } = options;
    const [value, setValue] = useState<string>("");
    useDebounce(() => onAfterDebounce(value), debounceTime, [value]);

    return { setValue };
};
