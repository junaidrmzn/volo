import { useMemo } from "react";
import type { AnyObjectSchema } from "@voloiq/form";
import { createFormControl } from "@voloiq/form";

// the FormControl needs to be memoized because otherwise React will treat it like a newly mounted component
// on every render which causes some weird side effects
export const useMemoizedFormControl = <Schema extends AnyObjectSchema>() => {
    const FormControl = useMemo(() => createFormControl<Schema>(), []);
    return { FormControl };
};
