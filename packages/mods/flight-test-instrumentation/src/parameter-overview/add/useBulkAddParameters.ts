import { useRef } from "react";
import { match } from "ts-pattern";
import { useAuthentication } from "@voloiq/auth";
import { FormValues } from "@voloiq/form";
import type { AxiosError } from "@voloiq/service";
import { hasDuplicates } from "@voloiq/utils";
import { CreateParametersProps } from ".";
import { usePostParameters } from "../../libs/fti-api";
import { createInsertParameterFromBulkFormData, useParameterFormData } from "../../libs/parameter-form";
import { ParameterFormSchema } from "../../libs/parameter-form/useParameterFormSchema";

type UseCreateParametersProps = Omit<CreateParametersProps, "formRef"> & {};

export const useBulkAddParameters = (props: UseCreateParametersProps) => {
    const { setSaveCallback, onSubmit, onAfterSubmit, onSubmitError, setIsSaveButtonDisabled } = props;
    const { state: initialDataState, data } = useParameterFormData();
    const formRef = useRef<HTMLFormElement>(null);
    const { sendRequest: bulkAddParameters } = usePostParameters();

    const isLoading = initialDataState === "pending";

    const { email, name } = useAuthentication();

    const onBulkAddParameters = async (forms: FormValues<ParameterFormSchema>[]) => {
        onSubmit();

        if (hasDuplicates<FormValues<ParameterFormSchema>>(forms)) {
            onSubmitError("DUPLICATE_FORM");
        } else {
            try {
                await bulkAddParameters({
                    data: forms.map((parameter) =>
                        createInsertParameterFromBulkFormData({
                            ...parameter,
                            requesterEmail: email,
                            requesterName: name,
                        })
                    ),
                });
            } catch (error: unknown) {
                const anyError = error as AxiosError;
                if (anyError.isAxiosError) {
                    const axiosError = anyError;
                    const errorKey = match(axiosError.response?.data.error.status)
                        .with("ALREADY_EXISTS", () => "ALREADY_EXISTS" as const)
                        .otherwise(() => "GENERIC" as const);
                    onSubmitError(errorKey);
                }
            }
        }
        onAfterSubmit();
    };

    const handleBulkSubmit = () => {
        formRef.current?.requestSubmit();
    };
    setSaveCallback(handleBulkSubmit);

    return { onBulkAddParameters, isLoading, formRef, data, setIsSaveButtonDisabled };
};
