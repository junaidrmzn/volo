import { Text } from "@volocopter/design-library-react";
import { ReactElement } from "react";
import { CommercialSchedulingModal } from "@voloiq/commercial-scheduling-components";
import { useOfferTranslation } from "../translations/useOfferTranslation";
import { CreateOfferForm } from "./CreateOfferForm";
import { UseCreateOfferFormOptions } from "./useCreateOfferForm";

type CreateOfferModalProps = {
    isOpen: boolean;
    offerId: string;
} & UseCreateOfferFormOptions;

export const CreateOfferModal = (props: CreateOfferModalProps): ReactElement | null => {
    const { isOpen, offerId, reloadList, closeModal } = props;
    const { t } = useOfferTranslation();

    return (
        <CommercialSchedulingModal
            size="5xl"
            heading={t("modal.add.heading")}
            subHeading={t("modal.edit.subheading")}
            isOpen={isOpen}
            onClose={closeModal}
        >
            <Text mb={2}>{t("modal.edit.desc")}</Text>
            <CreateOfferForm offerId={offerId} closeModal={closeModal} reloadList={reloadList} />
        </CommercialSchedulingModal>
    );
};
