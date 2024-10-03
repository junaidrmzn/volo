import { match } from "ts-pattern";
import type { AnyObjectSchema } from "yup";
import { useForm } from "../form-context/useForm";

export type UseFormGroupProps = {
    isUneditable?: boolean;
};

export const useFormGroup = <Schema extends AnyObjectSchema>(props: UseFormGroupProps) => {
    const { isUneditable } = props;
    const { formType } = useForm<Schema>();

    const isDisabled = match(formType)
        .with("edit", () => isUneditable)
        .with("details", () => true)
        .otherwise(() => false);

    return {
        isDisabled,
    } as const;
};
