import { Button, ButtonGroup, HStack, useDisclosure } from "@volocopter/design-library-react";
import { OfferItem } from "@voloiq/commercial-scheduling-api/v1";
import { FormProvider } from "@voloiq/form";
import { useOfferTranslation } from "../translations/useOfferTranslation";
import { EditOfferConfirmModal } from "./EditOfferConfirmModal";
import { useEditOfferForm } from "./useEditOfferForm";

type EditOfferProps = {
    offerItem: OfferItem;
    isOfferDraft: boolean;
    closeModal: () => void;
    reloadList: () => void;
};

export const EditOfferForm = (props: EditOfferProps) => {
    const { offerItem, isOfferDraft, closeModal, reloadList } = props;
    const { offerRunwayValue, offerRunwayUnit } = offerItem;
    const initalValues = { offerRunwayValue, offerRunwayUnit: { value: offerRunwayUnit } };
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { t } = useOfferTranslation();

    const onCloseConfirmationModal = () => {
        closeModal();
        onClose();
    };

    const { offerItemSchema, FormControl, onEdit } = useEditOfferForm({
        offerItem,
        closeModal: onCloseConfirmationModal,
        reloadList,
    });

    const onClickSave = () => {
        if (!isOfferDraft) {
            onOpen();
        }
    };

    return (
        <FormProvider
            formType="edit"
            formId="editOfferForm"
            schema={offerItemSchema}
            initialValues={initalValues}
            onEdit={onEdit}
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
                    <Button variant="primary" type={isOfferDraft ? "submit" : "button"} onClick={onClickSave}>
                        {t("labels.edit")}
                    </Button>
                </ButtonGroup>
            </HStack>
            <EditOfferConfirmModal isOpen={isOpen} closeModal={onCloseConfirmationModal} />
        </FormProvider>
    );
};
