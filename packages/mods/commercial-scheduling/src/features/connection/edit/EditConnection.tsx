import { Box, HStack, Text, VStack } from "@volocopter/design-library-react";
import { Connection } from "@voloiq/commercial-scheduling-api/v1";
import { FormSection, LoadingPage } from "@voloiq/commercial-scheduling-components";
import { FormProvider } from "@voloiq/form";
import { RenderEditHandlerProps } from "@voloiq/resource-overview";
import { useConnectionTranslation } from "../translations/useConnectionTranslation";
import { useEditConnection } from "./useEditConnection";

export type EditConnectionProps = RenderEditHandlerProps<Connection>;

export const EditConnection = (props: EditConnectionProps) => {
    const { resource } = props;
    const connectionId = resource.id;

    const { t } = useConnectionTranslation();
    const {
        connection,
        FormControl,
        connectionSchema,
        connectionInitialValues,
        connectionGetState,
        onChangeSelectedAircraftType,
        onEdit,
    } = useEditConnection(connectionId);

    if (!connection) {
        return null;
    }

    return (
        <Box>
            {(connectionGetState === "error" || !connectionInitialValues) && (
                <Text textAlign="center" w="full">
                    {t("generic.loadingData error")}
                </Text>
            )}
            {connectionGetState === "pending" && <LoadingPage />}
            {connectionGetState === "success" && (
                <FormProvider
                    formId="connectionEditForm"
                    schema={connectionSchema}
                    formType="edit"
                    {...props}
                    initialValues={connectionInitialValues}
                    onEdit={onEdit}
                >
                    <VStack maxW={800} minW={400} spacing={6} paddingBottom={6}>
                        <FormSection label={t("details.general")} orientation="v">
                            <FormControl fieldName="name" isNotEditable />
                            <HStack alignItems="flex-start" spacing={6} width="full">
                                <FormControl fieldName="title" />
                                <FormControl fieldName="subtitle" />
                            </HStack>
                        </FormSection>
                        <FormSection label={t("details.flight")} orientation="v">
                            <FormControl fieldName="category" />
                            <FormControl fieldName="flightDuration" />
                            <FormControl
                                fieldName="aircraftType"
                                isNotEditable={!!connection?.aircraftTypeId}
                                onChange={(data) => onChangeSelectedAircraftType((data as { value: string }).value)}
                            />
                            <FormControl isNotEditable fieldName="region" />
                            <HStack alignItems="flex-start" spacing={6} width="full">
                                <FormControl isNotEditable fieldName="departureVertiport" />
                                <FormControl isNotEditable fieldName="arrivalVertiport" />
                            </HStack>
                        </FormSection>

                        <FormSection label={t("details.valid")}>
                            <FormControl fieldName="validFrom" />
                            <FormControl isNotEditable fieldName="validTo" />
                        </FormSection>
                    </VStack>
                </FormProvider>
            )}
        </Box>
    );
};
