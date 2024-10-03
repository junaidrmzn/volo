import { Box, useColorModeValue } from "@volocopter/design-library-react";
import type { FormValues } from "@voloiq/form";
import { FormProvider, createFormControl } from "@voloiq/form";
import { SoftwareConfigTypeEnum } from "@voloiq/logbook-api/v6";
import type { RenderAddHandlerProps } from "@voloiq/resource-overview";
import { Card } from "@voloiq/text-layouts";
import { LoadingMessage } from "./LoadingMessage";
import { useAddSoftwareConfigurationPage } from "./useAddSoftwareConfigurationPage";
import { useAddSoftwareConfigurationSchema } from "./useAddSoftwareConfigurationSchema";

export const AddSoftwareConfigurationPage = (props: RenderAddHandlerProps) => {
    const { onSubmit, onAfterSubmit, onSubmitError, formRef } = props;
    const { fileUploadPercentage, state, create } = useAddSoftwareConfigurationPage();
    const backgroundColor = useColorModeValue("monochrome.100", "gray.700");
    const schema = useAddSoftwareConfigurationSchema();
    type Schema = typeof schema;
    const FormControl = createFormControl<Schema>();

    const handleCreate = (data: FormValues<Schema>) => {
        onSubmit();
        create({
            data: {
                configFile: data.softwareConfigurationFile[0],
            },
            params: {
                configType: data.configurationType.value,
                gitHash: data.gitHash,
            },
        })
            .then(() => onAfterSubmit())
            .catch(() => onSubmitError("GENERIC"));
    };

    const initialValues = {
        configurationType: { value: SoftwareConfigTypeEnum.FC },
    };

    return (
        <Card mt={8} backgroundColor={backgroundColor}>
            <Box display={state === "pending" ? "none" : "block"} w="full">
                <FormProvider
                    formRef={formRef}
                    schema={schema}
                    formType="create"
                    initialValues={initialValues}
                    onCreate={handleCreate}
                >
                    <FormControl fieldName="configurationType" />
                    <FormControl fieldName="gitHash" />
                    <FormControl fieldName="softwareConfigurationFile" />
                </FormProvider>
            </Box>
            {state === "pending" && <LoadingMessage fileUploadPercentage={fileUploadPercentage} />}
        </Card>
    );
};
