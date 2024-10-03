import { Button, ButtonGroup, HStack, Text, VStack } from "@volocopter/design-library-react";
import { FormProvider } from "@voloiq/form";
import { usePlanTranslation } from "../translations/usePlanTranslation";
import { UseCreatePlanFormOptions, useCreatePlanForm } from "./useCreatePlanForm";

type CreatePlanProps = {
    errorMessages: string[];
    closeModal: () => void;
    resetPlanProcessProgress: () => void;
    isLoading: boolean;
} & UseCreatePlanFormOptions;

export const CreatePlanForm = (props: CreatePlanProps) => {
    const { errorMessages, isLoading, closeModal, setProcessId, resetPlanProcessProgress } = props;
    const { t } = usePlanTranslation();
    const { planSchema, FormControl, onCreate } = useCreatePlanForm({ setProcessId });

    return (
        <FormProvider formType="create" schema={planSchema} onCreate={onCreate}>
            <FormControl fieldName="planName" />
            <FormControl fieldName="file" onChange={resetPlanProcessProgress} />
            {errorMessages ? (
                <VStack alignItems="flex-start" spacing={0}>
                    {errorMessages.map((errorMessage) => (
                        <Text key={errorMessage} size="xs" color="semanticWarningBasic">
                            {errorMessage}
                        </Text>
                    ))}
                </VStack>
            ) : null}

            <HStack alignSelf="flex-end">
                <ButtonGroup isAttached>
                    <Button type="reset" onClick={closeModal} isDisabled={isLoading}>
                        {t("generic.cancel")}
                    </Button>
                    <Button variant="primary" type="submit" isLoading={isLoading}>
                        {t("generic.upload")}
                    </Button>
                </ButtonGroup>
            </HStack>
        </FormProvider>
    );
};
