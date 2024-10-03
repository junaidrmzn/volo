import { Button, ButtonGroup, HStack } from "@volocopter/design-library-react";
import { ReactElement } from "react";
import { FormProvider } from "@voloiq/form";
import { useOfferTranslation } from "../translations/useOfferTranslation";
import { useCreateOfferForm } from "./useCreateOfferForm";

type CreateOfferProps = {
    offerId: string;
    closeModal: () => void;
    reloadList: () => void;
};

export const CreateOfferForm = (props: CreateOfferProps): ReactElement | null => {
    const { offerId, closeModal, reloadList } = props;
    const { t } = useOfferTranslation();

    const { offerItemSchema, FormControl, onCreate } = useCreateOfferForm({
        offerId,
        closeModal,
        reloadList,
    });

    return (
        <FormProvider
            formType="edit"
            formId="editOfferForm"
            schema={offerItemSchema}
            initialValues={{}}
            onEdit={onCreate}
        >
            <HStack>
                <FormControl fieldName="offerRunwayValue" />
                <FormControl fieldName="offerRunwayUnit" />
            </HStack>
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
