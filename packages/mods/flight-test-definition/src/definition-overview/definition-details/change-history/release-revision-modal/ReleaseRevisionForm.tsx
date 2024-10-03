import { useQueryClient } from "@tanstack/react-query";
import { Button, HStack, VStack } from "@volocopter/design-library-react";
import React from "react";
import { useReleaseRevision } from "@voloiq/flight-test-definition-api/v1";
import { FormProvider, createFormControl } from "@voloiq/form";
import { useChangeHistoryTranslation } from "../translations/useChangeHistoryTranslation";
import { useReleaseRevisionFormSchema } from "./useReleaseRevisionFormSchema";

type ReleaseRevisionFormProps = {
    definitionId: string;
    refetchDefinition?: () => void;
    onClose: () => void;
    latestRevision?: string;
};

export const ReleaseRevisionForm = (props: ReleaseRevisionFormProps) => {
    const { definitionId, refetchDefinition, onClose, latestRevision = "A00" } = props;
    const schema = useReleaseRevisionFormSchema();
    const { sendRequest } = useReleaseRevision({ definitionId, refetchDefinition });
    const FormControl = createFormControl<typeof schema>();
    const queryClient = useQueryClient();

    const { t } = useChangeHistoryTranslation();

    const handleOnAfterSubmit = () => {
        queryClient.invalidateQueries(["revision"]);
        queryClient.invalidateQueries(["definition"]);
        onClose();
    };

    return (
        <FormProvider
            initialValues={{ revision: latestRevision, date: new Date() }}
            schema={schema}
            formType="create"
            onAfterSubmit={handleOnAfterSubmit}
            onCreate={async (data) => {
                sendRequest({
                    data: {
                        revision_description: data.revisionDescription,
                    },
                });
            }}
        >
            <VStack spacing={3}>
                <HStack width="full">
                    <FormControl isNotEditable fieldName="revision" />
                    <FormControl isNotEditable fieldName="date" />
                </HStack>
                <FormControl fieldName="revisionDescription" />
                <HStack width="full" justifyContent="flex-end">
                    <Button onClick={onClose}>{t("Cancel")}</Button>
                    <Button type="submit" variant="primary">
                        {t("Confirm")}
                    </Button>
                </HStack>
            </VStack>
        </FormProvider>
    );
};
