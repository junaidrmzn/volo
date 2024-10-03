import { Button, ButtonGroup, HStack, useDisclosure } from "@volocopter/design-library-react";
import { FormProvider } from "@voloiq/form";
import { usePriceTranslation } from "../translations/usePriceTranslation";
import { EditPriceConfirmModal } from "./EditPriceConfirmModal";
import { UseEditPriceFormOptions, useEditPriceForm } from "./useEditPriceForm";

type EditPriceFormProps = UseEditPriceFormOptions;

export const EditPriceForm = (props: EditPriceFormProps) => {
    const { price, closeModal } = props;
    const { t } = usePriceTranslation();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const onClickSave = () => {
        if (price.status === "AWAITING_APPROVAL" || price.status === "APPROVED") {
            onOpen();
        }
    };

    const onCloseConfirmationModal = () => {
        closeModal();
        onClose();
    };

    const { priceSchema, onEdit, initialValues, FormControl } = useEditPriceForm({
        ...props,
        closeModal: onCloseConfirmationModal,
    });

    return (
        <FormProvider
            formType="edit"
            formId="editPriceForm"
            schema={priceSchema}
            initialValues={initialValues}
            onEdit={onEdit}
        >
            <FormControl fieldName="currency" />
            <FormControl fieldName="price" />
            <HStack alignSelf="flex-end">
                <ButtonGroup isAttached>
                    <Button type="reset" onClick={closeModal}>
                        {t("labels.cancel")}
                    </Button>
                    <Button
                        variant="primary"
                        type={price.status === "DRAFT" ? "submit" : "button"}
                        onClick={onClickSave}
                    >
                        {t("labels.save")}
                    </Button>
                </ButtonGroup>
            </HStack>
            <EditPriceConfirmModal isOpen={isOpen} closeModal={onCloseConfirmationModal} />
        </FormProvider>
    );
};
