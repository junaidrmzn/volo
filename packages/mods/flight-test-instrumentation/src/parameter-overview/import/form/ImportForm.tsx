import { Box } from "@volocopter/design-library-react";
import type { Aircraft } from "@voloiq-typescript-api/fti-types";
import { P, match } from "ts-pattern";
import type { TechnicalErrorProps } from "@voloiq/error-views";
import { TechnicalError } from "@voloiq/error-views";
import type { FormValues } from "@voloiq/form";
import { FormProvider, createFormControl } from "@voloiq/form";
import type { ServiceState } from "@voloiq/service";
import { ImportFormSkeleton } from "./ImportFormSkeleton";
import { useImportFormSchema } from "./useImportFormSchema";

type ImportFormProps = {
    aircraft: Aircraft[];
    formId: string;
    serviceState: ServiceState;
    onSubmit: (formValues: FormValues<ReturnType<typeof useImportFormSchema>>) => void;
} & Pick<TechnicalErrorProps, "onTryAgainClick">;

export const ImportForm = (props: ImportFormProps) => {
    const { aircraft, formId, serviceState, onSubmit, onTryAgainClick } = props;
    const schema = useImportFormSchema({ aircraft });
    type Schema = typeof schema;
    const FormControl = createFormControl<Schema>();

    return match(serviceState)
        .with(P.union("idle", "pending"), () => <ImportFormSkeleton />)
        .with("success", () => (
            <FormProvider schema={schema} formType="create" formId={formId} onCreate={onSubmit}>
                <Box w="full">
                    <FormControl fieldName="aircraft" />
                </Box>
                <FormControl fieldName="files" />
            </FormProvider>
        ))
        .with("error", () => <TechnicalError onTryAgainClick={onTryAgainClick} />)
        .exhaustive();
};
