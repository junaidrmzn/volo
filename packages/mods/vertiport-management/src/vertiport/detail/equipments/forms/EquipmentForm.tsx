import { Button, Flex, Grid, Icon } from "@volocopter/design-library-react";
import type { FormProps } from "@voloiq/form";
import { FormProvider } from "@voloiq/form";
import { useVertiportTranslation } from "../../../../translations/useVertiportTranslation";
import { EquipmentFormFields } from "./EquipmentFormFields";
import { useEquipmentForm } from "./useEquipmentForm";
import type { EquipmentFormSchema } from "./useEquipmentFormSchema";

type EquipmentFormProps = FormProps<EquipmentFormSchema>;

export const EquipmentForm = (props: EquipmentFormProps) => {
    const { initialValues } = props;
    const { t } = useVertiportTranslation();
    const { equipmentsFormSchema } = useEquipmentForm();
    return (
        <FormProvider {...props} schema={equipmentsFormSchema}>
            <Grid templateColumns="repeat(2, 1fr)" gap={3}>
                <EquipmentFormFields validFrom={initialValues?.validFrom} validTo={initialValues?.validTo} />
            </Grid>
            <Flex justifyContent="flex-end">
                <Button type="submit" leftIcon={<Icon icon="check" size={4} />} size="lg" variant="primary">
                    {t("buttons.done")}
                </Button>
            </Flex>
        </FormProvider>
    );
};
