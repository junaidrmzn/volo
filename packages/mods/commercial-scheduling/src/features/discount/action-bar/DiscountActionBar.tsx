import { Button, Icon, useDisclosure } from "@volocopter/design-library-react";
import { useIsAuthorizedTo } from "@voloiq/auth";
import { CreateDiscountModal } from "../create/CreateDiscountModal";
import { useDiscountTranslation } from "../translations/useDiscountTranslation";

type DiscountActionBarProps = {
    reloadList: () => void;
};

export const DiscountActionBar = (props: DiscountActionBarProps) => {
    const { reloadList } = props;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { t } = useDiscountTranslation();
    const canCreate = useIsAuthorizedTo(["create"], ["CommercialPromotion"]);

    return (
        <>
            {canCreate && (
                <Button variant="primary" leftIcon={<Icon aria-label="plus" icon="plus" />} onClick={onOpen}>
                    {t("overview.new")}
                </Button>
            )}
            <CreateDiscountModal isOpen={isOpen} reloadList={reloadList} closeModal={onClose} />
        </>
    );
};
