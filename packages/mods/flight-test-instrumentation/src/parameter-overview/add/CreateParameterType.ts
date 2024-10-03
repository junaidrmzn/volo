import type { FormValues } from "@voloiq/form";
import type { RenderAddHandlerProps } from "@voloiq/resource-overview";
import type { useParameterFormSchema } from "../../libs/parameter-form";

export type CreateParametersProps = RenderAddHandlerProps & {
    onSubmit: (formValues: FormValues<ReturnType<typeof useParameterFormSchema>>) => void;
};
