import { Button, ButtonGroup, HStack } from "@volocopter/design-library-react";
import { FormProvider } from "@voloiq/form";
import { usePriceTranslation } from "../translations/usePriceTranslation";
import { UseCreatePriceFormOptions, useCreatePriceForm } from "./useCreatePriceForm";

type CreatePriceFormProps = UseCreatePriceFormOptions;

export const CreatePriceForm = (props: CreatePriceFormProps) => {
    const { priceId, closeModal, refetchPrice } = props;
    const { t } = usePriceTranslation();
    const { priceSchema, onCreate, FormControl } = useCreatePriceForm({ priceId, closeModal, refetchPrice });

    return (
        <FormProvider formType="create" schema={priceSchema} onCreate={onCreate}>
            <FormControl fieldName="currency" />
            <FormControl fieldName="price" />
            <HStack alignSelf="flex-end">
                <ButtonGroup isAttached>
                    <Button type="reset" onClick={closeModal}>
                        {t("labels.cancel")}
                    </Button>
                    <Button variant="primary" type="submit">
                        {t("labels.add")}
                    </Button>
                </ButtonGroup>
            </HStack>
        </FormProvider>
    );
};
