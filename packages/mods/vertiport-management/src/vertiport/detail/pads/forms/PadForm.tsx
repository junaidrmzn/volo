import { Button, Flex, Grid, Icon } from "@volocopter/design-library-react";
import type { FormProps } from "@voloiq/form";
import { FormProvider } from "@voloiq/form";
import type { Vertiport } from "@voloiq/vertiport-management-api/v1";
import { useVertiportTranslation } from "../../../../translations/useVertiportTranslation";
import { PadFormFields } from "./PadFormFields";
import { usePadForm } from "./usePadForm";
import type { PadFormSchema } from "./usePadFormSchema";

type PadFormProps = FormProps<PadFormSchema> & { vertiport: Vertiport };

export const PadForm = (props: PadFormProps) => {
    const { vertiport, initialValues } = props;
    const { t } = useVertiportTranslation();
    const { padsFormSchema } = usePadForm({ vertiport });
    return (
        <FormProvider {...props} schema={padsFormSchema}>
            <Grid templateColumns="repeat(2, 1fr)" gap={3}>
                <PadFormFields
                    vertiport={vertiport}
                    validFrom={initialValues?.validFrom}
                    validTo={initialValues?.validTo}
                />
            </Grid>
            <Flex justifyContent="flex-end">
                <Button type="submit" leftIcon={<Icon icon="check" size={4} />} size="lg" variant="primary">
                    {t("buttons.done")}
                </Button>
            </Flex>
        </FormProvider>
    );
};
