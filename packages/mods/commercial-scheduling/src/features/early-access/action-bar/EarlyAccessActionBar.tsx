import { Button, Icon, useDisclosure } from "@volocopter/design-library-react";
import { useIsAuthorizedTo } from "@voloiq/auth";
import { CreateEarlyAccessModal } from "../create/CreateEarlyAccessModal";
import { useEarlyAccessTranslation } from "../translations/useEarlyAccessTranslation";

type EarlyAccessActionBarProps = {
    reloadList: () => void;
};
export const EarlyAccessActionBar = (props: EarlyAccessActionBarProps) => {
    const { reloadList } = props;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { t } = useEarlyAccessTranslation();
    const canCreate = useIsAuthorizedTo(["create"], ["CommercialPromotion"]);

    return canCreate ? (
        <>
            <Button variant="primary" leftIcon={<Icon icon="plus" />} onClick={onOpen}>
                {t("overview.new")}
            </Button>
            <CreateEarlyAccessModal isOpen={isOpen} closeModal={onClose} reloadList={reloadList} />
        </>
    ) : null;
};
