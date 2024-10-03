import { Button, ButtonGroup, useDisclosure } from "@volocopter/design-library-react";
import { useIsAuthorizedTo } from "@voloiq/auth";
import { CreatePlanModal } from "../create/CreatePlanModal";
import { usePlanTranslation } from "../translations/usePlanTranslation";

type PlanActionBarProps = {
    reloadList: () => void;
};

export const PlanActionBar = (props: PlanActionBarProps) => {
    const { reloadList } = props;
    const canCreate = useIsAuthorizedTo(["create"], ["CommercialPlan"]);
    const { t } = usePlanTranslation();
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <ButtonGroup>
                {canCreate && (
                    <Button variant="primary" onClick={onOpen}>
                        {t("overview.Upload New Plan")}
                    </Button>
                )}
            </ButtonGroup>
            <CreatePlanModal isOpen={isOpen} onClose={onClose} reloadList={reloadList} />
        </>
    );
};
