import { Button, ButtonGroup, HStack, SimpleGrid, Text } from "@volocopter/design-library-react";
import { FormProvider } from "@voloiq/form";
import { useEarlyAccessTranslation } from "../translations/useEarlyAccessTranslation";
import { UseCreateEarlyAccessFormProps, useCreateEarlyAccessForm } from "./useCreateEarlyAccessForm";

type CreateEarlyAccessFormProps = UseCreateEarlyAccessFormProps;

export const CreateEarlyAccessForm = (props: CreateEarlyAccessFormProps) => {
    const { closeModal, reloadList } = props;
    const { t } = useEarlyAccessTranslation();
    const { FormControl, earlyAccessSchema, onCreate, errorMessage } = useCreateEarlyAccessForm({
        closeModal,
        reloadList,
    });

    return (
        <FormProvider formType="create" schema={earlyAccessSchema} onCreate={onCreate}>
            <FormControl fieldName="name" />
            <HStack alignItems="start">
                <FormControl fieldName="validFrom" />
                <FormControl fieldName="validTo" />
            </HStack>

            <FormControl fieldName="codes" />
            <FormControl fieldName="region" />
            <SimpleGrid columns={2} spacing={2}>
                <FormControl fieldName="value" />
                <HStack alignItems="end">
                    <FormControl showLabel={false} fieldName="offerRunwayUnit" />
                </HStack>
            </SimpleGrid>
            {errorMessage !== "" ? (
                <Text size="xs" color="semanticWarningBasic">
                    {errorMessage}
                </Text>
            ) : null}

            <HStack alignSelf="flex-end">
                <ButtonGroup isAttached>
                    <Button type="reset" onClick={closeModal}>
                        {t("generic.cancel")}
                    </Button>
                    <Button variant="primary" type="submit">
                        {t("generic.upload")}
                    </Button>
                </ButtonGroup>
            </HStack>
        </FormProvider>
    );
};
