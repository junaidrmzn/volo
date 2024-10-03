import type { FormValues } from "@voloiq/form";
import type { RenderEditHandlerProps } from "@voloiq/resource-overview";
import { Parameter } from "../../libs/fti-api/apiModels";
import type { useParameterFormSchema } from "../../libs/parameter-form";

export type EditParametersProps = RenderEditHandlerProps<Parameter> & {
    onSubmit: (formValues: FormValues<ReturnType<typeof useParameterFormSchema>>) => void;
};
