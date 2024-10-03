import { CommercialSchedulingModal } from "@voloiq/commercial-scheduling-components";
import { useDiscountTranslation } from "../translations/useDiscountTranslation";
import { CreateDiscountForm } from "./CreateDiscountForm";
import { UseCreateDiscountFormOptions } from "./useCreateDiscountForm";

type CreateDiscountModalProps = {
    isOpen: boolean;
} & UseCreateDiscountFormOptions;

export const CreateDiscountModal = (props: CreateDiscountModalProps) => {
    const { isOpen, reloadList, closeModal } = props;
    const { t } = useDiscountTranslation();

    return (
        <CommercialSchedulingModal
            heading={t("labels.upload")}
            subHeading={t("modal.subheading")}
            isOpen={isOpen}
            onClose={closeModal}
        >
            <CreateDiscountForm reloadList={reloadList} closeModal={closeModal} />
        </CommercialSchedulingModal>
    );
};
