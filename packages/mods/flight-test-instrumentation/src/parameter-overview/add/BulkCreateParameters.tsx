import { Box } from "@volocopter/design-library-react";
import { CreateParametersProps } from ".";
import { CreateParameterBulkForm, ParameterFormSkeleton, useParameterFormSchema } from "../../libs/parameter-form";
import { ParameterBulkForm } from "../../libs/parameter-form/ParameterBulkForm";
import { useFtiAddTranslation } from "./translations/useFtiAddTranslation";
import { useBulkAddParameters } from "./useBulkAddParameters";

type UseCreateParametersProps = Omit<CreateParametersProps, "formRef"> & {};

export const BulkCreateParameters = (props: UseCreateParametersProps) => {
    const { onBulkAddParameters, isLoading, data, formRef, setIsSaveButtonDisabled } = useBulkAddParameters(props);

    const schema = useParameterFormSchema(data);
    const { t } = useFtiAddTranslation();

    return (
        <>
            {isLoading ? (
                <Box p={4} mt={4} background="bgContentLayer" borderRadius="sm">
                    <ParameterFormSkeleton withHeader withButtons />
                </Box>
            ) : (
                <ParameterBulkForm
                    entityName={t("form.addParameters")}
                    onAdd={(formValues) => onBulkAddParameters(formValues)}
                    onDelete={() => Promise.resolve()}
                    onEdit={() => Promise.resolve()}
                    schema={schema}
                    isLoading={isLoading}
                    formRef={formRef}
                    renderFormControlGroup={(FormControl) => (
                        <CreateParameterBulkForm FormControl={FormControl} data={data} schema={schema} />
                    )}
                    setIsSaveButtonDisabled={setIsSaveButtonDisabled}
                    headerTitle={t("header.ftiBulkParameterHeader")}
                />
            )}
        </>
    );
};
