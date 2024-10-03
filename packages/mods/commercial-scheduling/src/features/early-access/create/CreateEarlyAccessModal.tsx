import { CommercialSchedulingModal } from "@voloiq/commercial-scheduling-components";
import { useEarlyAccessTranslation } from "../translations/useEarlyAccessTranslation";
import { CreateEarlyAccessForm } from "./CreateEarlyAccessForm";
import { UseCreateEarlyAccessFormProps } from "./useCreateEarlyAccessForm";

type CreateDiscountModalProps = {
    isOpen: boolean;
} & UseCreateEarlyAccessFormProps;

export const CreateEarlyAccessModal = (props: CreateDiscountModalProps) => {
    const { isOpen, closeModal, reloadList } = props;
    const { t } = useEarlyAccessTranslation();

    return (
        <CommercialSchedulingModal
            size="lg"
            heading={t("generic.upload")}
            subHeading={t("modal.create.subheading")}
            isOpen={isOpen}
            onClose={closeModal}
        >
            <CreateEarlyAccessForm closeModal={closeModal} reloadList={reloadList} />
        </CommercialSchedulingModal>
    );
};
