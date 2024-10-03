import { useContext } from "react";
import type { AnyObjectSchema } from "yup";
import type { ReactFormContext } from "./FormContext";
import { FormContext } from "./FormContext";

export const useForm = <Schema extends AnyObjectSchema>() => {
    // We need the type assertion here because a React context cannot be of a generic type
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    const formData = useContext(FormContext as ReactFormContext<Schema>);
    if (!formData) {
        throw new Error("useForm must be used within FormProvider");
    }
    return formData;
};
