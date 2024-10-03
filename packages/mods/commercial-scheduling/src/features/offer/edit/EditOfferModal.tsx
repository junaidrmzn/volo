import { Text } from "@volocopter/design-library-react";
import { ReactElement } from "react";
import { CommercialSchedulingModal } from "@voloiq/commercial-scheduling-components";
import { useOfferTranslation } from "../translations/useOfferTranslation";
import { EditOfferForm } from "./EditOfferForm";
import { UseEditOfferFormOptions } from "./useEditOfferForm";

type EditOfferModalProps = {
    isOpen: boolean;
    isOfferDraft: boolean;
} & UseEditOfferFormOptions;

export const EditOfferModal = (props: EditOfferModalProps): ReactElement | null => {
    const { isOpen, offerItem, isOfferDraft, reloadList, closeModal } = props;
    const { t } = useOfferTranslation();

    return (
        <CommercialSchedulingModal
            size="5xl"
            heading={t("modal.edit.heading")}
            subHeading={t("modal.edit.subheading")}
            isOpen={isOpen}
            onClose={closeModal}
        >
            <Text mb={2}>{t("modal.edit.desc")}</Text>
            <EditOfferForm
                isOfferDraft={isOfferDraft}
                offerItem={offerItem}
                closeModal={closeModal}
                reloadList={reloadList}
            />
        </CommercialSchedulingModal>
    );
};
