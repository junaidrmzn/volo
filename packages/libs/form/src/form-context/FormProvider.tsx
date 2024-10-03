import { yupResolver } from "@hookform/resolvers/yup";
import type { StackProps } from "@volocopter/design-library-react";
import { Stack } from "@volocopter/design-library-react";
import type { MutableRefObject, PropsWithChildren } from "react";
import { useRef } from "react";
import type { Mode, SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { match } from "ts-pattern";
import type { AnyObjectSchema } from "yup";
import { getTypedEntries } from "@voloiq/utils";
import type { FormValues } from "../yup/utils";
import type { ErrorMessageMap, FormProps, TFormContext } from "./FormContext";
import { FormContext } from "./FormContext";
import { mergeReferences } from "./mergeReferences";

export type FormProviderProps<Schema extends AnyObjectSchema> = {
    schema: Schema;
    formId?: string;
    onAfterSubmit?: () => void | Promise<void>;
    onSubmitError?: (errorType: "GENERIC") => void | Promise<void>;
    formRef?: MutableRefObject<HTMLFormElement | null>;
    validationMode?: Mode;
} & Pick<StackProps, "direction"> &
    FormProps<Schema>;

export const FormProvider = <Schema extends AnyObjectSchema>(props: PropsWithChildren<FormProviderProps<Schema>>) => {
    const {
        children,
        schema,
        formId,
        formType,
        initialValues: defaultValues,
        onAfterSubmit,
        onSubmitError,
        formRef,
        direction = "column",
        validationMode = "onSubmit",
    } = props;
    const formData = useForm<FormValues<Schema>>({
        resolver: yupResolver(schema),
        defaultValues,
        mode: validationMode,
    });
    const { handleSubmit, reset: internalReset, setError } = formData;
    // eslint-disable-next-line use-encapsulation/prefer-custom-hooks
    const internalFormRef = useRef<HTMLFormElement | null>(null);

    const reset = () => {
        // use the native reset method so that file inputs are properly reset
        internalFormRef.current?.reset();
        // then, use react hook form reset
        internalReset();
    };

    const submitHandler: SubmitHandler<FormValues<Schema>> = async (data) => {
        const errorMessageMap = await match(props)
            .with(
                {
                    formType: "edit",
                },
                (editFormProps) => editFormProps.onEdit(data, reset)
            )
            .with(
                {
                    formType: "create",
                },
                (createFormProps) => createFormProps.onCreate(data, reset)
            )
            .with(
                {
                    formType: "details",
                },
                () => null
            )
            .exhaustive();

        if (errorMessageMap && Object.keys(errorMessageMap).length > 0) {
            // Because of the union with void and null TS doesn't know this is not nullish despite the above truthy check
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
            for (const [fieldName, message] of getTypedEntries(errorMessageMap as ErrorMessageMap<Schema>)) {
                setError(fieldName, { message });
            }
            onSubmitError?.("GENERIC");
        } else {
            onAfterSubmit?.();
        }
    };

    const formContext: TFormContext<Schema> = { schema, formType, ...formData };
    return (
        <FormContext.Provider value={formContext}>
            <form
                id={formId}
                ref={mergeReferences([formRef, internalFormRef])}
                onSubmit={handleSubmit(submitHandler)}
                noValidate
            >
                <Stack direction={direction} spacing={5}>
                    {children}
                </Stack>
            </form>
        </FormContext.Provider>
    );
};
